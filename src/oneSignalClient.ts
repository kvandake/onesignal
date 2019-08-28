import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IApp, IUpsertAppInput } from './dto/apps';
import { INotification } from './dto/notifications';
import { ICreateNotificationResult } from './dto/notifications';
// import * as humps from 'humps';

const BASE_URL = 'https://onesignal.com/api/v1';

export class OneSignalClient {

  // tslint:disable-next-line:variable-name
  private _httpClient!: AxiosInstance;

  constructor(
    private readonly apiKey: string,
  ) {

  }

  public get httpClient(): AxiosInstance {
    return this._httpClient || (this._httpClient = this.createHttpClient());
  }

  public async getApps(): Promise<IApp[]> {
    this.checkRequiredApiKey();
    return await this.httpClient.get<IApp[]>('/apps')
      .then(result => result.data);
  };

  public async getApp(appId: string): Promise<IApp> {
    this.checkRequiredApiKey();
    return await this.httpClient.get<IApp>(`/apps/${appId}`)
      .then(result => result.data);
  };

  public async createApp(input: IUpsertAppInput): Promise<IApp> {
    this.checkRequiredApiKey();
    return await this.httpClient.post<IApp>('/apps', input)
      .then(result => result.data);
  };

  public async updateApp(appId: string, input: IUpsertAppInput): Promise<IApp> {
    this.checkRequiredApiKey();
    return await this.httpClient.put<IApp>(`/apps/${appId}`, input)
      .then(result => result.data);
  };

  public async createNotification(input: INotification): Promise<ICreateNotificationResult> {
    this.checkRequiredApiKey();
    return await this.httpClient.post<ICreateNotificationResult>('/notifications', input)
      .then(result => result.data);
  };

  private checkRequiredApiKey() {
    if (!this.apiKey) {
      throw new Error('You must define "userAuthKey" on Client');
    }
  }

  private wrapApiKey(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Basic ${this.apiKey}`,
      },
    };
  }

  private createHttpClient(): AxiosInstance {
    const httpClient = axios.create({
      baseURL: BASE_URL,
    });
    httpClient.interceptors.request.use(config => {
      if (this.apiKey != null) {
        config.headers.Authorization = `Basic ${this.apiKey}`;
      }
      return config;
    }, err => Promise.reject(err));

    return httpClient;
  }

}
