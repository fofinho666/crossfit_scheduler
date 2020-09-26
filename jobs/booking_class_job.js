require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require("fs");
const {loginAndSaveCookies} = require('./cookie_job');
const {loadCookies} = require('../services/cookie_sevices')

function genCrossfitClassDate(daysInAdvance) {
  let today = new Date();
  today.setDate(today.getDate() + daysInAdvance);

  const d = String(today.getDate());
  const m = String(today.getMonth());
  const yyyy = today.getFullYear();

  return (yyyy + '-' + m + '-' + d);
}

const run = async (mongoClient, crossfitClassLocal, crossfitClassHour, daysInAdvance) => {
  const base_url = process.env.REGIBOX_URL;
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const [page] = await browser.pages();
  // Configure the navigation timeout
  page.setDefaultNavigationTimeout(0);

  try {
    const cookies = await loadCookies(mongoClient);
    page.setCookie(...cookies);

    await page.goto(base_url);

    if (page.url() === `${base_url}/login.php`){
      await loginAndSaveCookies(page, mongoClient);
    }
    else{
      // wait for splash screen to go away
      await page.waitForTimeout(1500);
    }

    // check if there is a notification
    const notificationXpath = '//div[@class="but_back"]';
    const notification = await page.$x(notificationXpath);
    if (notification.length != 0) {
      await notification[0].click();
      await page.waitForTimeout(500);
    }

    // enter registe class page
    const registeClassSelector = "#feed_minhas_aulasxxx > div > div > div.card-footer > a:nth-child(1)";
    await page.waitForSelector(registeClassSelector, { visible: true });
    await page.click(registeClassSelector);

    // wait for the registe class page to load
    await page.waitForSelector('div[class~=router-transition-forward]');
    await page.waitForSelector('div[class~=router-transition-forward]', { hidden: true });

    // select the day to schedule
    const crossfitClassDate = genCrossfitClassDate(daysInAdvance);
    const crossfitClassDateSelector = `div[data-date="${crossfitClassDate}"]`;

    const crossfitClassSelector = `${crossfitClassDateSelector}[class~="calendar-day"]`;
    await page.waitForSelector(crossfitClassSelector);
    await page.click(crossfitClassSelector);

    const selectedCrossfitClassSelector = `${crossfitClassDateSelector}[class~="calendar-day-selected"]`;
    await page.waitForSelector(selectedCrossfitClassSelector);

    // register the class hour
    const registerButtonXpath = `//*[contains(text(), '${crossfitClassLocal}')]/../../div[3]/div[contains(text(), '${crossfitClassHour}')]/../div[3]/button`;
    const registerButton = await page.$x(registerButtonXpath);
    if (registerButton.length == 0) {
      // scroll down to see the missing button
      await page.evaluate(() => {
        let elem = document.querySelector("#feed_cal");
        elem.scrollTop = elem.scrollHeight;
      });
      throw `Register button for class at '${crossfitClassHour}' not found`;
    }
    await registerButton[0].click();

    // wait for confirmation
    await page.waitForSelector('button[class="col button button-small button-fill color-red"]', { visible: true });
    await browser.close();
  }
  catch (e) {
    const errorDate = new Date().toLocaleString().replace(', ', '_').replace(/[,:\/\s]/g, '_');
    const errorDir = process.env.ERROR_DIR

    if (!fs.existsSync(errorDir)) fs.mkdirSync(errorDir);

    await page.screenshot({ path: `${errorDir}/${errorDate}_screenshot.png` });

    await browser.close();
    throw e
  }
}

exports.run = run;
