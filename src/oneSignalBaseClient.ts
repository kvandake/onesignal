import { AxiosInstance } from 'axios';

export abstract class OneSignalBaseClient {
  protected BaseUrl = 'https://onesignal.com/api/v1';

  // tslint:disable-next-line:variable-name
  private _httpClient!: AxiosInstance;

  public get httpClient(): AxiosInstance {
    return this._httpClient || (this._httpClient = this.createHttpClientInternal());
  }

  protected abstract createHttpClient();

  private configureHttpClient(client: AxiosInstance) {
    client.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        const { config, response } = error;
        // Too many requests
        if (!!response && response.status === 429) {
          return new Promise((resolve, reject) => {
            setTimeout(() => resolve(client.request(config)), 1000);
          });
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  private createHttpClientInternal(): AxiosInstance {
    const httpClient = this.createHttpClient();
    this.configureHttpClient(httpClient);
    return httpClient;
  }
}
