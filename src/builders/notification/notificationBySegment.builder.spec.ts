import { OneSignalError } from '../../errors';
import { NotificationBySegmentBuilder } from './notificationBySegment.builder';

describe('NotificationBySegmentBuilder', () => {
  let builder: NotificationBySegmentBuilder;

  beforeEach(() => {
    builder = new NotificationBySegmentBuilder('test');
  });

  it('should valid variables', () => {
    // arrange
    const includedSegments = ['segment1', 'segment2'];
    const excludedSegments = ['segment11', 'segment22'];

    // act
    builder.setIncludedSegments(includedSegments);
    builder.setExcludedSegments(excludedSegments);
    const result = builder.notification().setContents({ test: 1 }).build();

    // assert
    expect(result.included_segments).toEqual(includedSegments);
    expect(result.excluded_segments).toEqual(excludedSegments);
  });

  it('should check required variables', () => {
    // act & assert
    expect(() => builder.notification().setContents({ test: 1 }).build()).toThrowError(OneSignalError);
  });
});
