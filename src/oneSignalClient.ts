import axios, { AxiosInstance } from 'axios';
import { IApp, ICreateAppInput, IUpdateAppInput, IViewAppInput } from './dto/apps';
import {
  ICancelNotificationInput,
  ICancelNotificationResult,
  ICreateNotificationResult,
  INotification,
  IViewNotificationInput,
  IViewNotificationResult,
  IViewNotificationsResult,
} from './dto/notifications';
import { IViewNotificationsInput } from './dto/notifications/viewNotifications.input';
import { OneSignalError } from './errors';

const BASE_URL = 'https://onesignal.com/api/v1';

export class OneSignalClient {

  // tslint:disable-next-line:variable-name
  private _restApiClient!: AxiosInstance;
  // tslint:disable-next-line:variable-name
  private _userAuthClient!: AxiosInstance;

  constructor(
    private readonly restApiKey: string,
    private readonly userAuthKey: string = '',
  ) {

  }

  public get restApiClient(): AxiosInstance {
    return this._restApiClient || (this._restApiClient = this.createRestApiClient());
  }

  public get userAuthClient(): AxiosInstance {
    return this._userAuthClient || (this._userAuthClient = this.createUserAuthClient());
  }


  //  View the details of all of your current OneSignal apps
  public async viewApps(): Promise<IApp[]> {
    this.checkUserAuthKey();
    return await this.userAuthClient.get<IApp[]>('/apps')
      .then(result => result.data);
  };

  //  View the details of a single OneSignal app
  public async viewApp(input: IViewAppInput): Promise<IApp> {
    this.checkUserAuthKey();
    return await this.userAuthClient.get<IApp>(`/apps/${input.appId}`)
      .then(result => result.data);
  };

  //  Creates a new OneSignal app
  public async createApp(input: ICreateAppInput): Promise<IApp> {
    this.checkUserAuthKey();
    return await this.userAuthClient.post<IApp>('/apps', input)
      .then(result => result.data);
  };

  //  This method can be used to update the name or configuration settings of one of your existing apps.
  public async updateApp(input: IUpdateAppInput): Promise<IApp> {
    const { id, ...body } = input;
    this.checkUserAuthKey();
    return await this.userAuthClient.put<IApp>(`/apps/${id}`, body)
      .then(result => result.data);
  };

  //  The Create Notification method is used when you want your server to programmatically send notifications
  //  or emails to a segment or individual users. You may target users in one of three ways
  //  using this method: by Segment, by Filter, or by Device. At least one targeting parameter must be specified.
  public async createNotification(input: INotification): Promise<ICreateNotificationResult> {
    this.checkRestApiKey();
    return await this.restApiClient.post<ICreateNotificationResult>('/notifications', input)
      .then(result => result.data);
  };

  //  View the details of a single notification
  //  Requires your OneSignal App's REST API Key, available in Keys & IDs.
  public async viewNotification(input: IViewNotificationInput): Promise<IViewNotificationResult> {
    this.checkRestApiKey();
    const { app_id, ...body } = input;
    return await this.restApiClient.get<IViewNotificationResult>(`/notifications/${body.id}?app_id=${app_id}`, {
      headers: {
        Authorization: `Basic ${this.restApiKey}`,
      },
    })
      .then(result => result.data);
  };

  //  View the details of multiple notifications
  //  Requires your OneSignal App's REST API Key, available in Keys & IDs.
  public async viewNotifications(input: IViewNotificationsInput): Promise<IViewNotificationsResult> {
    this.checkRestApiKey();
    return await this.restApiClient.get<IViewNotificationsResult>(
      `/notifications?app_id=${input.app_id}&limit=${input.limit}&offset=${input.offset}&kind=${input.kind}`)
      .then(result => result.data);
  };

  //  Used to stop a scheduled or currently outgoing notification.
  public async cancelNotification(input: ICancelNotificationInput): Promise<ICancelNotificationResult> {
    this.checkRestApiKey();
    return await this.restApiClient.delete<ICancelNotificationResult>(`/notifications/${input.id}?app_id=${input.app_id}`)
      .then(result => result.data);
  };

  private checkRestApiKey() {
    if (!this.restApiKey) {
      throw new OneSignalError('You must define "restApiKey" on OneSignalClient');
    }
  }

  private checkUserAuthKey() {
    if (!this.userAuthKey) {
      throw new OneSignalError('You must define "userAuthKey" on OneSignalClient');
    }
  }

  private createRestApiClient(): AxiosInstance {
    const httpClient = axios.create({ baseURL: BASE_URL });
    this.configureHttpClient(httpClient);
    httpClient.interceptors.request.use(config => {
      config.headers.Authorization = `Basic ${this.restApiKey}`;
      return config;
    }, err => Promise.reject(err));

    return httpClient;
  }

  private createUserAuthClient(): AxiosInstance {
    const httpClient = axios.create({ baseURL: BASE_URL });
    this.configureHttpClient(httpClient);
    httpClient.interceptors.request.use(config => {
      config.headers.Authorization = `Basic ${this.userAuthKey}`;
      return config;
    }, err => Promise.reject(err));

    return httpClient;
  }

  private configureHttpClient(client: AxiosInstance) {
    client.interceptors.response.use(response => {
      return response;
    }, error => {
      const { config, response: { status } } = error;
      // To many requests
      if (status === 429) {
        return this.sleepRequest(client, config, 1000);
      } else {
        return Promise.reject(error);
      }
    });
  }

  private sleepRequest(client: AxiosInstance, config, milliseconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(client.request(config)), milliseconds);
    });
  };

}
