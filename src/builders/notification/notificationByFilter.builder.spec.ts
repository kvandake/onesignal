import { NotificationByFilterBuilder } from './notificationByFilter.builder';

describe('NotificationByFilterBuilder', () => {
  let builder: NotificationByFilterBuilder;

  beforeEach(() => {
    builder = new NotificationByFilterBuilder();
  });

  it('should valid variables', () => {
    // arrange
    const filters = [
      { 'field': 'tag', 'key': 'level', 'relation': '>', 'value': '10' },
      { 'field': 'amount_spent', 'relation': '>', 'value': '0' },
    ];

    // act
    builder.setFilters(filters);
    const result = builder
      .notification()
      .setContents({ test: 1 })
      .build();

    // assert
    expect(result.filters).toEqual(filters);
  });

  it('should check required variables', () => {
    // act & assert
    // without required variables
    builder
      .notification()
      .setContents({ test: 1 })
      .build();
  });
});
