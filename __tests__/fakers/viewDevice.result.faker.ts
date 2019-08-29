export const viewDeviceResultFaker = {
  create,
};

function create() {
  return {
    identifier: '1',
    session_count: 1,
    language: 'en',
    timezone: -28800,
    game_version: '1.0',
    device_os: '7.0.4',
    device_type: 0,
    device_model: 'iPhone',
    ad_id: null,
    tags: {
      a: '1',
      foo: 'bar',
    },
    last_active: 1395096859,
    amount_spent: 0,
    created_at: 1395096859,
    invalid_identifier: false,
    badge_count: 0,
    external_user_id: null,
  };
}
