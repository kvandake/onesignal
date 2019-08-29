export const viewNotificationFaker = {
  create,
};

function create() {
  return {
    id: '1',
    successful: 15,
    failed: 1,
    converted: 3,
    remaining: 0,
    queued_at: 1415914655,
    send_after: 1415914655,
    completed_at: 1415914656,
    url: 'https://yourWebsiteToOpen.com',
    data: {
      foo: 'bar',
      your: 'custom metadata',
    },
    canceled: false,
    headings: {
      en: 'English and default language heading',
      es: 'Spanish language heading',
    },
    contents: {
      en: 'English language content',
      es: 'Hola',
    },
    platform_delivery_stats: {
      ios: {
        success: 5,
        failed: 1,
        errored: 0,
      },
      android: {
        success: 10,
        failed: 0,
        errored: 0,
      },
    },
  };
}
