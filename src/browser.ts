import puppeteer from 'puppeteer-extra';
import Puppeteer from 'puppeteer';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import Logger, { LogLevel } from './logger';

/**
 * Wrapper for Puppeteer browser that implements all the customizations
 * intended in this template
 */
export default class PuppeteerBrowser {
  private _puppeteerBrowser: Puppeteer.Browser;
  private _logger: Logger;

  /**
   * Instance of customized puppeteer
   */
  constructor(logger: Logger) {
    this._logger = logger;
    puppeteer.use(AdblockerPlugin()).use(StealthPlugin());
  }

  /**
   * Launches puppeteer with custom settings, logs the event
   */
  public async launch(): Promise<this> {
    this._puppeteerBrowser = await puppeteer
      .launch({
        ignoreHTTPSErrors: true,
        slowMo: 0,
        args: [
          '--window-size=1920,1080',
          '--remote-debugging-port=9222',
          '--remote-debugging-address=0.0.0.0',
          '--disable-gpu',
          '--disable-features=IsolateOrigins,site-per-process',
          '--blink-settings=imagesEnabled=true',
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      })
      .catch((browser) => {
        this._logger.warn('Browser launch failed');
        return browser;
      });
    this._logger.log('Browser launched', LogLevel.normal);
    return this;
  }

  /**
   * Wrapper for newPage method. It also logs its action
   */
  public async newPage() {
    this._logger.log('New page created');
    return this._puppeteerBrowser.newPage();
  }
}
