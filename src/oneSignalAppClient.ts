import axios from 'axios';
import {
  ICancelNotificationInput,
  ICancelNotificationResult,
  ICreateNotificationResult,
  INotification, ITrackOpenInput, ITrackOpenResult,
  IViewNotificationInput,
  IViewNotificationResult,
  IViewNotificationsInput,
  IViewNotificationsResult,
} from './dto/notifications';
import { OneSignalError } from './errors';
import {
  ICreateDeviceInput,
  ICreateDeviceResult,
  IUpdateDeviceInput,
  IUpdateDeviceResult,
  IViewDeviceInput,
  IViewDeviceResult,
  IViewDevicesResult,
} from './dto/devices';
import { OneSignalBaseClient } from './oneSignalBaseClient';
import { INewSessionInput, INewSessionResult } from './dto/session';

export class OneSignalAppClient extends OneSignalBaseClient {

  constructor(
    private readonly appId: string,
    private readonly restApiKey: string,
  ) {
    super();
  }

  //  The Create Notification method is used when you want your server to programmatically send notifications
  //  or emails to a segment or individual users. You may target users in one of three ways
  //  using this method: by Segment, by Filter, or by Device. At least one targeting parameter must be specified.
  //  https://documentation.onesignal.com/reference#create-notification
  public async createNotification(input: INotification): Promise<ICreateNotificationResult> {
    this.checkRestApiKey();
    const body = { ...input, app_id: this.appId };
    return await this.httpClient.post<ICreateNotificationResult>('/notifications', body)
      .then(result => result.data);
  };

  //  View the details of a single notification
  //  Requires your OneSignal App's REST API Key, available in Keys & IDs.
  //  https://documentation.onesignal.com/reference#view-notification
  public async viewNotification(input: IViewNotificationInput): Promise<IViewNotificationResult> {
    this.checkRestApiKey();
    return await this.httpClient.get<IViewNotificationResult>(
      `/notifications/${input.id}?app_id=${this.appId}`)
      .then(result => result.data);
  };

  //  View the details of multiple notifications
  //  Requires your OneSignal App's REST API Key, available in Keys & IDs.
  //  https://documentation.onesignal.com/reference#view-notifications
  public async viewNotifications(input: IViewNotificationsInput): Promise<IViewNotificationsResult> {
    this.checkRestApiKey();
    return await this.httpClient.get<IViewNotificationsResult>(
      `/notifications?app_id=${this.appId}&limit=${input.limit}&offset=${input.offset}&kind=${input.kind}`)
      .then(result => result.data);
  };

  //  Used to stop a scheduled or currently outgoing notification.
  //  https://documentation.onesignal.com/reference#cancel-notification
  public async cancelNotification(input: ICancelNotificationInput): Promise<ICancelNotificationResult> {
    this.checkRestApiKey();
    return await this.httpClient.delete<ICancelNotificationResult>(
      `/notifications/${input.id}?app_id=${this.appId}`)
      .then(result => result.data);
  };

  //  Register a new device to one of your OneSignal apps
  //  https://documentation.onesignal.com/reference#add-a-device
  public async createDevice(input: ICreateDeviceInput): Promise<ICreateDeviceResult> {
    this.checkRestApiKey();
    const body = { ...input, app_id: this.appId };
    return await this.httpClient.post<ICreateDeviceResult>(`/players`, body)
      .then(result => result.data);
  };

  //  Update an existing device in one of your OneSignal apps
  //  https://documentation.onesignal.com/reference#edit-device
  public async updateDevice(input: IUpdateDeviceInput): Promise<IUpdateDeviceResult> {
    this.checkRestApiKey();
    const { id, ...body } = input;
    return await this.httpClient.put<IUpdateDeviceResult>(`/players/${id}`, body)
      .then(result => result.data);
  };

  //  View the details of an existing device in one of your OneSignal apps
  //  https://documentation.onesignal.com/reference#view-device
  public async viewDevice(input: IViewDeviceInput): Promise<IViewDeviceResult> {
    this.checkRestApiKey();
    return await this.httpClient.get<IViewDeviceResult>(
      `/players/${input.id}?app_id=${this.appId}`)
      .then(result => result.data);
  };

  //  View the details of multiple devices in one of your OneSignal apps
  //  https://documentation.onesignal.com/reference#view-devices
  public async viewDevices(): Promise<IViewDevicesResult> {
    this.checkRestApiKey();
    return await this.httpClient.get<IViewDevicesResult>(
      `/players?app_id=${this.appId}`)
      .then(result => result.data);
  };

  //  This method should be called when a device opens your app after they are already registered.
  //  This method will automatically increment the player's session_count,
  //  and should also be used to update any fields that may have changed (such as language or timezone).
  //  https://documentation.onesignal.com/reference#new-session
  public async newSession(input: INewSessionInput): Promise<INewSessionResult> {
    this.checkRestApiKey();
    return await this.httpClient.post<INewSessionResult>(
      `/players/${input.deviceId}/on_session`)
      .then(result => result.data);
  };

  //  Track when users open a notification
  //  https://documentation.onesignal.com/reference#track-open
  public async trackOpen(input: ITrackOpenInput): Promise<ITrackOpenResult> {
    this.checkRestApiKey();
    const {notificationId, ...rest} = input;
    const body = { ...rest, app_id: this.appId };
    return await this.httpClient.put<ITrackOpenResult>(`/notifications/${notificationId}`, body)
      .then(result => result.data);
  };

  protected createHttpClient() {
    const httpClient = axios.create({ baseURL: this.BaseUrl });
    this.configureHttpClient(httpClient);
    httpClient.interceptors.request.use(config => {
      config.headers.Authorization = `Basic ${this.restApiKey}`;
      return config;
    }, err => Promise.reject(err));

    return httpClient;
  }

  private checkRestApiKey() {
    if (!this.restApiKey) {
      throw new OneSignalError('You must define "restApiKey" on OneSignalClient');
    }
  }
}
