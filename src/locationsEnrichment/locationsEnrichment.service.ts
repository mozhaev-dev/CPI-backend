import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { LocationsEnrichmentTasks } from './locationsEnrichmentTasks.model';
import { CreateLocationEnrichmentTaskDto } from './dto/createLocationEnrichmentTask.dto';

export enum LocationsEnrichmentTaskStatus {
  sent = 0,
  done = 1,
}

@Injectable()
export class LocationsEnrichmentService {
  constructor(
    @InjectModel(LocationsEnrichmentTasks)
    private locationsEnrichmentTasksModel: typeof LocationsEnrichmentTasks,
  ) {}

  @Cron('40 * * * * *')
  async createLocationEnrichmentTasks() {
    console.log('\n [o_o]... Looking for locations to enrichment. \n');
    const locations = await this.getLocationsForEnrichment();

    if (locations.length === 0) {
      console.log('\n [o_o]... All locations have allready enriched! \n');
      return;
    }
    locations.forEach(async (location) => {
      const taskId = await this.fetchCreateTask(location.name);
      if (taskId) {
        const createLocationEnrichmentTaskData: CreateLocationEnrichmentTaskDto =
          {
            id: taskId,
            locationId: location.id,
            status: LocationsEnrichmentTaskStatus.sent,
          };
        this.locationsEnrichmentTasksModel.create(
          createLocationEnrichmentTaskData,
        );
        console.log(
          `\n [o_o]... Task for enrichment location: "${location.name}" has been created! \n`,
        );
      }
    });
  }

  @Cron('10 * * * * *')
  async processTasks() {
    console.log(`\n [o_o]... Checking locations enrichment tasks.`);
    const sentLocationEnrichmentTasks =
      await this.getSentLocationEnrichmentTasks();

    if (sentLocationEnrichmentTasks.length === 0) {
      console.log(`\n [o_o]... No locations enrichment tasks to do! \n`);
      return;
    }

    const transaction =
      await this.locationsEnrichmentTasksModel.sequelize.transaction();

    try {
      const sentLocationEnrichmentTasksResult = await Promise.all(
        sentLocationEnrichmentTasks.map(
          (task) =>
            new Promise<
              {
                locationId: number;
                placeId: string;
                lat: number;
                long: number;
                name: string;
              }[]
            >(async (resolve, reject) => {
              console.log(
                `\n [o_o]... Processing location: "${task.locationName}"! \n`,
              );

              const result: any[] = (
                await this.fetchGetTaskResult(task.taskId)
              ).map((item) => {
                return {
                  locationId:
                    item.title === task.locationName ? task.locationId : null,
                  placeId: item.place_id,
                  lat: item.latitude,
                  long: item.longitude,
                  name: item.title,
                };
              });

              this.updateTaskStatus(
                task.taskId,
                LocationsEnrichmentTaskStatus.done,
              );

              resolve(result);
            }),
        ),
      );

      await Promise.all(
        sentLocationEnrichmentTasksResult.reduce((acc, task) => {
          return [...acc, ...task.map((item) => this.enrichLocation(item))];
        }, []),
      );
      transaction.commit();
      console.log(`\n [o_o]... All enrichment tasks are done! \n`);
    } catch (e) {
      await transaction.rollback();
      console.log(`\n [o_o]... WTF? Something is wrong! \n`);
      throw e;
    }
  }

  enrichLocation(taskItem: {
    locationId: number;
    placeId: string;
    lat: number;
    long: number;
    name: string;
  }) {
    if (taskItem.locationId) {
      return this.locationsEnrichmentTasksModel.sequelize.query(
        `UPDATE locations SET long = :long, lat = :lat, "placeId" = :placeId WHERE id = :locationId `,
        {
          replacements: taskItem,
          type: QueryTypes.UPDATE,
        },
      );
    } else {
      return this.locationsEnrichmentTasksModel.sequelize.query(
        `
      INSERT INTO locations (name, "placeId", long, lat) 
      VALUES (:name, :placeId, :long, :lat)
    `,
        {
          replacements: taskItem,
          type: QueryTypes.UPDATE,
        },
      );
    }
  }

  updateTaskStatus(taskId: string, status: LocationsEnrichmentTaskStatus) {
    this.locationsEnrichmentTasksModel.sequelize.query(
      `
        UPDATE "locationsEnrichmentTasks"
        SET status = :status WHERE id = :taskId
      `,
      {
        replacements: { taskId, status },
        type: QueryTypes.UPDATE,
      },
    );
  }

  sendDataForSeoApiRequest(method: string, endpoint: string, data: any = {}) {
    return axios({
      method,
      url: process.env.DATA_FOR_SEO_API_URL + endpoint,
      auth: {
        username: process.env.DATA_FOR_SEO_API_LOGIN,
        password: process.env.DATA_FOR_SEO_API_PASSWORD,
      },
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  async fetchCreateTask(locationName: string): Promise<string> {
    const response = await this.sendDataForSeoApiRequest(
      'post',
      'google/maps/task_post',
      [
        {
          language_code: 'en',
          location_name: 'Helsinki,Helsinki,Uusimaa,Finland',
          keyword: encodeURI(locationName),
        },
      ],
    );

    return response['data']['tasks'][0]['id'];
  }

  async fetchGetTaskResult(taskId: string) {
    const response = await this.sendDataForSeoApiRequest(
      'get',
      'google/maps/task_get/advanced/' + taskId,
    );

    if (
      response['data']['tasks'] &&
      response['data']['tasks'].length > 0 &&
      response['data']['tasks'][0]['result'] &&
      response['data']['tasks'][0]['result'].length > 0
    ) {
      return response['data']['tasks'][0]['result'][0]['items'];
    }

    return [];
  }

  async getSentLocationEnrichmentTasks() {
    const result: {
      taskId: string;
      locationId: string;
      locationName: string;
    }[] = await this.locationsEnrichmentTasksModel.sequelize.query(
      `
          SELECT lt.id AS "taskId", "locationId", l.name AS "locationName"
          FROM "locationsEnrichmentTasks" AS lt 
          JOIN locations AS l 
          ON lt."locationId" = l.id
          WHERE status = ${LocationsEnrichmentTaskStatus.sent}
        `,
      {
        type: QueryTypes.SELECT,
      },
    );

    return result;
  }

  async getLocationsForEnrichment() {
    const result: { id: number; name: string }[] =
      await this.locationsEnrichmentTasksModel.sequelize.query(
        `
          SELECT l.id, l.name FROM locations AS l 
          LEFT JOIN "locationsEnrichmentTasks" AS lt 
          ON l.id = lt."locationId"
          WHERE lt.id IS NULL AND l."placeId" IS NULL
        `,
        {
          type: QueryTypes.SELECT,
        },
      );

    return result;
  }
}
