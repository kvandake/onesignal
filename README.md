# OneSignal API Client
[![npm version](https://badge.fury.io/js/onesignal-api-client-core.svg)](https://badge.fury.io/js/onesignal-api-client-core)

## Features
- Written in Typescript.
- The code is covered by tests.
- The library uses [Axios](https://github.com/axios/axios).
- Two clients for different method calls: OneSignalAppClient, OneSignalUserClient. **OneSignalAppClient** is created for notifications, devices, tracks or sessions. **OneSignalUserClient** is created for apps.
- Support create a notification builder. You may target users in one of three ways using this builders: by **[NotificationBySegmentBuilder](https://github.com/kvandake/onesignal/blob/master/src/builders/notification/notificationBySegment.builder.ts)**, by **[NotificationByFilterBuilder](https://github.com/kvandake/onesignal/blob/master/src/builders/notification/notificationByFilter.builder.ts)**, or by **[NotificationByDeviceBuilder](https://github.com/kvandake/onesignal/blob/master/src/builders/notification/notificationByDevice.builder.ts)**.
- Support methods for different contents: **[Notification](https://github.com/kvandake/onesignal/blob/master/src/builders/notification/notification.builder.ts)** or **[Email](https://github.com/kvandake/onesignal/blob/master/src/builders/notification/email.builder.ts)**. Support methods is available in the builders.

## Getting Started

Npm
```sh
npm install onesignal-api-client-core
```

Yarn
```sh
yarn add onesignal-api-client-core
```

## Using

### Create notification
The Create Notification method is used when you want your server to programmatically send notifications or emails to a segment or individual users. You may target users in one of three ways using this method: by **Segment**, by **Filter**, or by **Device**. At least one targeting parameter must be specified.

#### Create notification through the Segment
[API Reference](https://documentation.onesignal.com/reference#section-send-to-segments)
Segments are the most common way developers send notifications via OneSignal. Sending to segments is easy: you simply specify which segments you want to send to, and, optionally, which ones you don't.
```typescript
import { OneSignalAppClient, NotificationBySegmentBuilder } from 'onesignal-api-client-core';

const client = new OneSignalAppClient('appId', 'restApiKey');

const input = new NotificationBySegmentBuilder()
    .setIncludedSegments(['Active Users', 'Inactive Users'])
    .notification() // .email()
    .setContents({ en: 'My Message' })
    .build();

const result = await client.createNotification(input);
```

#### Create notification through the Filter
[API Reference](https://documentation.onesignal.com/reference#section-send-to-users-based-on-filters)
Filters are a powerful way to target users, allowing you to use both data that OneSignal has about a user and any Tags your app may send OneSignal. Filters can be combined together to form advanced, highly precise user targeting. OneSignal customers use all sorts of filters to send notifications, including language, location, user activity, and more.
```typescript
import { OneSignalAppClient, NotificationByFilterBuilder } from 'onesignal-api-client-core';

const client = new OneSignalAppClient('appId', 'restApiKey');

const filters = [
    { 'field': 'tag', 'key': 'level', 'relation': '>', 'value': '10' },
    { 'field': 'amount_spent', 'relation': '>', 'value': '0' },
];
const input = new NotificationByFilterBuilder()
    .setFilters(filters)
    .notification() // .email()
    .setContents({ en: 'My Message' })
    .build();

const result = await client.createNotification(input);
```

#### Create notification through the Device
[API Reference](https://documentation.onesignal.com/reference#section-send-to-specific-devices)
You may also target specific devices with the create notification method. Targeting devices is typically used in two ways:
-  For notifications that target individual users, such as if they've received a message from someone.
- For apps that wish to manage their own segments, such as tracking a user's followers and sending notifications to them when that user posts.
```typescript
import { OneSignalAppClient, NotificationByDeviceBuilder } from 'onesignal-api-client-core';

const client = new OneSignalAppClient('appId', 'restApiKey');

const input = new NotificationByDeviceBuilder()
    .setIncludeExternalUserIds(['externalUserId1', 'externalUserId2'])
    .notification() // .email()
    .setContents({ en: 'My Message' })
    .build();

const result = await client.createNotification(input);
```

### Cancel notification
[API Reference](https://documentation.onesignal.com/reference#cancel-notification)
Stop a scheduled or currently outgoing notification.
```typescript
import { OneSignalAppClient, ICancelNotificationInput } from 'onesignal-api-client-core';

const client = new OneSignalAppClient('appId', 'restApiKey');

const input = { id: notification.id } as ICancelNotificationInput;
const result = await client.cancelNotification(input);
```

### Create, View or Update a Device
[API Reference](https://documentation.onesignal.com/reference#view-devices)
```typescript
import { OneSignalAppClient, ICreateDeviceInput, IViewDeviceInput, IUpdateDeviceInput, DeviceType } from 'onesignal-api-client-core';

const client = new OneSignalAppClient('appId', 'restApiKey');

const createInput = { device_type: DeviceType.ChromeWebPush } as ICreateDeviceInput;
const createResult = await client.createDevice(input);

const viewInput = { id: device.id } as IViewDeviceInput;
const viewResult = await client.viewDevice(viewInput);
const viewsResult = await client.viewDevices();

const updateInput = { id: device.id, device_type: DeviceType.Android } as IUpdateDeviceInput;
const updateResult = await client.updateDevice(input);
```

### Create, View or Update an OneSignal App
[API Reference](https://documentation.onesignal.com/reference#view-apps-apps)
```typescript
import { OneSignalUserClient, ICreateAppInput, IViewAppInput, IUpdateAppInput } from 'onesignal-api-client-core';

const client = new OneSignalUserClient('userAuthKey');

const createInput = { name } as ICreateAppInput;
const createResult = await client.createApp(input);

const viewInput = { id: app.id } as IViewAppInput;
const viewResult = await client.viewApp(viewInput);
const viewsResult = await client.viewApps();

const updateInput = { id: app.id, name: 'Updated name' } as IUpdateAppInput;
const updateResult = await client.updateApp(input);
```

### Track open
[API Reference](https://documentation.onesignal.com/reference#track-open)
```typescript
import { OneSignalAppClient, ITrackOpenInput } from 'onesignal-api-client-core';

const client = new OneSignalAppClient('appId', 'restApiKey');

const trackOpenInput = { notificationId: notification.id, opened: true } as ITrackOpenInput;
const trackOpenResult = await client.trackOpen(input);
```

### New Session
[API Reference](https://documentation.onesignal.com/reference#new-session)
```typescript
import { OneSignalAppClient, INewSessionInput } from 'onesignal-api-client-core';

const client = new OneSignalAppClient('appId', 'restApiKey');

const newSessionInput = { deviceId: device.id } as INewSessionInput;
const newSessionResult = await client.newSession(input);
```

## OneSignal server implementation methods
List of server api methods.
- [x] [Create notification](https://documentation.onesignal.com/reference#create-notification)
- [x] [Cancel notification](https://documentation.onesignal.com/reference#cancel-notification)
- [x] [View apps](https://documentation.onesignal.com/reference#view-apps-apps)
- [x] [View an app](https://documentation.onesignal.com/reference#view-an-app)
- [x] [Create an app](https://documentation.onesignal.com/reference#create-an-app)
- [x] [Update an app](https://documentation.onesignal.com/reference#update-an-app)
- [x] [View devices](https://documentation.onesignal.com/reference#view-devices)
- [x] [View device](https://documentation.onesignal.com/reference#view-device)
- [x] [Add a device](https://documentation.onesignal.com/reference#add-a-device)
- [x] [Edit device](https://documentation.onesignal.com/reference#edit-device)
- [x] [New session](https://documentation.onesignal.com/reference#new-session)
- [ ] [New purchase](https://documentation.onesignal.com/reference#new-purchase)
- [ ] [Increment session length](https://documentation.onesignal.com/reference#increment-session-length)
- [ ] [CSV export](https://documentation.onesignal.com/reference#csv-export)
- [x] [View notification](https://documentation.onesignal.com/reference#view-notification)
- [x] [View notifications](https://documentation.onesignal.com/reference#view-notifications)
- [x] [Track open](https://documentation.onesignal.com/reference#track-open)
- [ ] [Notification History](https://documentation.onesignal.com/reference#notification-history)
- [ ] [Create Segments](https://documentation.onesignal.com/reference#create-segments)
- [ ] [Delete Segments](https://documentation.onesignal.com/reference#delete-segments)

## Support

If any bugs are found in the API wrapper, please open an issue on GitHub, or a Pull Request if you want to fix it yourself!
Please be as explicit as possible and provide a minimum reproducing repository if at all possible, as it helps track down what went wrong.

## Documentation

All documentation for this wrapper comes from the [Server Rest API](https://documentation.onesignal.com/reference), 
if there are any typos, please let me know or open a PR to fix it.

## TODO
- Implements all methods

## Licence
MIT

