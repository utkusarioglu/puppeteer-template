import { Page } from 'puppeteer';
import { Time } from './time';
import CONFIG from './config';
import * as fs from 'fs';
import Logger, { LogLevel } from './logger';

export default class Screenshot {
  private _page: Page;
  private _time: Time;
  private _logger: Logger;

  /**
   * Initializes the screenshot taking operation
   * @param page Page object from puppeteer
   */
  constructor(page: Page, logger: Logger, time: Time) {
    this._page = page;
    this._time = time;
    this._logger = logger;
    this.initializeScreenshotsFolder();
  }

  /**
   * Creates a screenshots folder if it doesn't exist. Clears the folder
   * if one exists but is populated by items.
   */
  private initializeScreenshotsFolder() {
    const mkScreenshotsDir = () =>
      fs.mkdir(CONFIG.screenshotsPath, () =>
        this._logger.log('Screenshot path initialized', LogLevel.verbose)
      );
    fs.stat(CONFIG.screenshotsPath, (err, _) => {
      if (err) {
        mkScreenshotsDir();
      }

      fs.rmdir(CONFIG.screenshotsPath, { recursive: true }, mkScreenshotsDir);
    });
  }

  /**
   * Takes a screenshot and places it inside the screenshot folder
   * defined in the .env file
   * @param fileDescriptor - file descriptor that will be attached to the file name
   */
  public async take(fileDescriptor: string) {
    if (fileDescriptor.length < 5) {
      throw new Error('File descriptor has to be really descriptive');
    }
    const time = this._time.getSliced();
    const format = 'png';
    const filename = `${time} - ${fileDescriptor}.${format}`;
    await this._page.screenshot({
      path: `${CONFIG.screenshotsPath}/${filename}`,
    });
    this._logger.log(`Screenshot taken: "${filename}"`, LogLevel.verbose);
  }

  private setStartTime() {}
}
