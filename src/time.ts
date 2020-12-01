/**
 * Supplies the rest of the repo with time segments that are relative to the
 * time that the runtime was initiated
 */
export class Time {
  private _startTime: number;

  /**
   * Initializes timer by recording the start time.
   */
  constructor() {
    this._startTime = new Date().getTime();
  }

  /**
   * Returns a 4 digit, stringified time in relative to start time
   */
  getSliced(): string {
    const now = new Date().getTime();
    const difference = (now - this._startTime).toString().slice(-7, -3); // seconds
    return '0'.repeat(4 - difference.length) + difference;
  }

  /**
   * Wrapper for date getTime function
   * @warning This is currently unused
   */
  getNow() {
    return new Date().getTime();
  }
}
