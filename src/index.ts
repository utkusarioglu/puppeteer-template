require('dotenv').config();
import CONFIG from './config';
import Screenshot from './screenshot';
import { delay } from './delay';
import Logger, { LogLevel } from './logger';
import { Time } from './time';
import PuppeteerBrowser from './browser';

(async () => {
  const time = new Time();
  const logger = new Logger(time, LogLevel.normal, 'Starting app');
  const browser = await new PuppeteerBrowser(logger).launch();
  const page = await browser.newPage();
  const screenshot = new Screenshot(page, logger, time);

  // Open page
  await page
    .goto(CONFIG.homeDir, {
      waitUntil: 'networkidle2',
    })
    .then(() => screenshot.take('page open'))
    .catch(() => {
      const msg = 'page open fail';
      logger.warn(msg);
      screenshot.take(msg);
    });

  // Login
  await page
    .click('#username')
    .then(() => page.keyboard.type(CONFIG.username))
    .catch(() => {
      const msg = 'Username input fail';
      logger.warn(msg);
      screenshot.take(msg);
    });
  await page
    .click('#password')
    .then(() => page.keyboard.type(CONFIG.password))
    .catch(() => {
      const msg = 'Password input fail';
      logger.warn(msg);
      screenshot.take(msg);
    });
  await page.keyboard.press('Enter');
  await page.waitForSelector('some div selector').catch(() => {
    const msg = 'login fail';
    logger.warn(msg);
    screenshot.take(msg);
  });

  // Do interest selection
  delay(3000);
  await page.click('some other div selector').catch(() => {
    const msg = 'Interest selection fail';
    logger.warn(msg);
    screenshot.take(msg);
  });

  // Do modal click
  delay(3000);
  await page
    .evaluate(() => {
      const modal = document.querySelector(
        '#cookie-ad-disclosure-modal'
      ) as HTMLElement;
      return modal.querySelector('button').click();
    })
    .catch(() => {
      const msg = 'Modal click fail';
      logger.warn(msg);
      screenshot.take(msg);
    });

  // Do final screenshot
  await screenshot.take('The end');
  // ...and so on
})();
