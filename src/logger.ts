import type { Time } from './time';

export const enum LogLevel {
  verbose = 0,
  normal = 1,
  critical = 2,
}
type LogLevelMember = LogLevel;

export default class Logger {
  private _time: Time;
  private _logLevel: LogLevelMember;

  /**
   * Instance of logger handles logging operations to console and or db and
   * other places if it's implemented
   * @param time the time class that is responsible for time keeping
   */
  constructor(time: Time, logLevel: LogLevelMember, startupMessage: string) {
    this._time = time;
    this._logLevel = logLevel;
    this.logStartupMessage(startupMessage);
  }

  /**
   * Displays a startup message for the app
   * @param startupMessage - The string to be displayed on startup
   */
  private logStartupMessage(startupMessage) {
    this.doLog(startupMessage);
    return this;
  }

  /**
   * Logs the given string to console (or to some db if that's implemented)
   * @param log - the string that is going to be logged
   * @param logLevel - the importance of the log
   */
  public log(log: string, logLevel: LogLevelMember = LogLevel.normal) {
    if (logLevel >= this._logLevel) {
      this.doLog(`${this._time.getSliced()}: ${log}`);
    }
  }

  /**
   * Wrapper for console warn that applies the timestamp
   * @param warnString - console.warn string
   */
  public warn(warnString: string) {
    console.warn(`${this._time.getSliced()}: ${warnString}`);
  }

  /**
   * Logs the given string to the screen. At this point this is only a wrapper
   * for console log but this method would come much more handier if chalked
   * or a similar method was implemented
   * @param string - String to be logged to the screen
   */
  private doLog(string) {
    console.log(string);
  }
}
