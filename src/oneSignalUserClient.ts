import { OneSignalBaseClient } from './oneSignalBaseClient';
import axios from 'axios';
import { OneSignalError } from './errors';
import { IAppResult, ICreateAppInput, IUpdateAppInput, IViewAppInput } from './dto/apps';

export class OneSignalUserClient extends OneSignalBaseClient {
  constructor(private readonly userAuthKey: string) {
    super();
  }

  //  View the details of all of your current OneSignal apps
  //  https://documentation.onesignal.com/reference#view-apps-apps
  public async viewApps(): Promise<IAppResult[]> {
    this.checkUserAuthKey();
    return await this.httpClient.get<IAppResult[]>('/apps').then(result => result.data);
  }

  //  View the details of a single OneSignal app
  //  https://documentation.onesignal.com/reference#view-an-app
  public async viewApp(input: IViewAppInput): Promise<IAppResult> {
    this.checkUserAuthKey();
    return await this.httpClient.get<IAppResult>(`/apps/${input.id}`).then(result => result.data);
  }

  //  Creates a new OneSignal app
  //  https://documentation.onesignal.com/reference#create-an-app
  public async createApp(input: ICreateAppInput): Promise<IAppResult> {
    this.checkUserAuthKey();
    return await this.httpClient.post<IAppResult>('/apps', input).then(result => result.data);
  }

  //  This method can be used to update the name or configuration settings of one of your existing apps.
  //  https://documentation.onesignal.com/reference#update-an-app
  public async updateApp(input: IUpdateAppInput): Promise<IAppResult> {
    const { id, ...body } = input;
    this.checkUserAuthKey();
    return await this.httpClient.put<IAppResult>(`/apps/${id}`, body).then(result => result.data);
  }

  protected createHttpClient() {
    const httpClient = axios.create({ baseURL: this.BaseUrl });
    this.configureHttpClient(httpClient);
    httpClient.interceptors.request.use(
      config => {
        config.headers.Authorization = `Basic ${this.userAuthKey}`;
        return config;
      },
      err => Promise.reject(err),
    );

    return httpClient;
  }

  private checkUserAuthKey() {
    if (!this.userAuthKey) {
      throw new OneSignalError('You must define "userAuthKey" on OneSignalUserClient');
    }
  }
}
