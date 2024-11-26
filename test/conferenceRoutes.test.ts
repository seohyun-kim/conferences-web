import { DateTime } from 'luxon';
import { convertToTimezone } from '../src/routes/conferenceRoutes';

describe('convertToTimezone', () => {
  it('should convert PST to UTC correctly', () => {
    const datetime = '2024-12-03T14:59:00'; // PST
    const timezone = 'America/Los_Angeles'; // PST
    const expectedUTC = '2024-12-03T22:59:00.000Z'; // UTC

    const result = convertToTimezone(datetime, timezone);
    expect(result).toBe(expectedUTC);
  });

  it('should convert AOE to UTC correctly', () => {
    const datetime = '2024-12-01T23:59:00'; // AOE
    const timezone = 'Etc/GMT+12'; // AOE
    const expectedUTC = '2024-12-02T11:59:00.000Z'; // UTC

    const result = convertToTimezone(datetime, timezone);
    expect(result).toBe(expectedUTC);
  });

  it('should convert UTC to UTC correctly', () => {
    const datetime = '2024-12-03T22:59:00Z'; // Already UTC
    const timezone = 'UTC';
    const expectedUTC = '2024-12-03T22:59:00.000Z'; // UTC

    const result = convertToTimezone(datetime, timezone);
    expect(result).toBe(expectedUTC);
  });

  it('should throw an error for invalid input', () => {
    const invalidDatetime = 'invalid-date';
    const timezone = 'America/Los_Angeles';

    expect(() => convertToTimezone(invalidDatetime, timezone)).toThrowError(
      'Invalid datetime or timezone: invalid-date, America/Los_Angeles'
    );
  });
});
