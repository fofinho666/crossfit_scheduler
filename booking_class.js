require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require("fs");

function stringDate(next_days = 0){
  let today = new Date();
  today.setDate(today.getDate() + next_days);

  const d = String(today.getDate());
  const m = String(today.getMonth());
  const yyyy = today.getFullYear();

  return (yyyy + '-' + m + '-' + d);
}

const automation = async (crossfitClassLocal, crossfitClassHour, daysInAdvanceRegistration) => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0);

  try {
    await page.goto(process.env.REGIBOX_URL);
    // search for the box
    await page.waitFor('input[type=search]');
    await page.type('input[type=search]', process.env.BOX_NAME);
    await page.waitFor(250);
    await page.click('li[class="item-content"]');

    // login
    await page.waitFor('div.page-current > div[class~="login-screen-content"]');
    await page.type('input[name=login]', process.env.LOGIN);
    await page.type('input[name=password]', process.env.PASSWORD);
    await page.click('input[value=LOGIN]');

    // check if there is a notification
    const notificationXpath = '//*[contains(text(), "Remind me later")]';
    const notification = await page.$x(notificationXpath);
    if (notification.length != 0) {
      await notification[0].click();
    }
    await page.waitForSelector('div[class~=backdrop-in]', {hidden: true});

    // enter registe class page
    const registeClassSelector = "#feed_minhas_aulasxxx > div > div > div.card-footer > a:nth-child(1)";
    await page.waitForSelector(registeClassSelector, {visible: true});
    await page.click(registeClassSelector);

    // wait for the registe class page to load
    await page.waitForSelector('div[class~=router-transition-forward]');
    await page.waitForSelector('div[class~=router-transition-forward]', {hidden: true});

    // select the day to schedule
    const crossfitClassDate = stringDate(daysInAdvanceRegistration);
    const crossfitClassSelector = `div[data-date="${crossfitClassDate}"]`;
    await page.waitFor(crossfitClassSelector);
    await page.click(crossfitClassSelector);
    await page.waitFor(`${crossfitClassSelector}[class~="calendar-day-selected"]`);

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
    await page.waitFor('button[class="col button button-small button-fill color-red"]', {visible: true});
    await browser.close();
  }
  catch (e) {
    const errorDate = stringDate();
    const errorDir = process.env.ERROR_DIR

    if (!fs.existsSync(errorDir)) fs.mkdirSync(errorDir);

    await page.screenshot({path: `${errorDir}/${errorDate}_screenshot.png`});

    await browser.close();
    throw e
  }
}

exports.automation = automation;
