require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require("fs");

function string_date(next_days = 0){
  let today = new Date();
  today.setDate(today.getDate() + next_days);

  const d = String(today.getDate());
  const m = String(today.getMonth());
  const yyyy = today.getFullYear();

  return (yyyy + '-' + m + '-' + d);
}

const automation = async (crossfit_class_local, crossfit_class_hour, days_in_advance_registration) => {
  const crossfit_class_date = string_date(days_in_advance_registration);

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
    const notification_xpath = '//*[contains(text(), "Remind me later")]';
    const notification = await page.$x(notification_xpath);
    if (notification.length != 0) {
      await notification[0].click();
    }
    await page.waitForSelector('div[class~=backdrop-in]', {hidden: true});

    // enter registe class page
    const registe_class_selector = "#feed_minhas_aulasxxx > div > div > div.card-footer > a:nth-child(1)";
    await page.waitForSelector(registe_class_selector, {visible: true});
    await page.click(registe_class_selector);

    // wait for the registe class page to load
    await page.waitForSelector('div[class~=router-transition-forward]');
    await page.waitForSelector('div[class~=router-transition-forward]', {hidden: true});

    // select the day to schedule
    const crossfit_class_selector = `div[data-date="${crossfit_class_date}"]`;
    await page.waitFor(crossfit_class_selector);
    await page.click(crossfit_class_selector);
    await page.waitFor(`${crossfit_class_selector}[class~="calendar-day-selected"]`);

    // register the class hour
    const register_button_xpath = `//*[contains(text(), '${crossfit_class_local}')]/../../div[3]/div[contains(text(), '${crossfit_class_hour}')]/../div[3]/button`;
    const register_button = await page.$x(register_button_xpath);
    if (register_button.length == 0) {
      // scroll down to see the missing button
      await page.evaluate(() => {
        let elem = document.querySelector("#feed_cal");
        elem.scrollTop = elem.scrollHeight;
      });
      throw `Register button for class at '${crossfit_class_hour}' not found`;
    }
    await register_button[0].click();

    // wait for confirmation
    await page.waitFor('button[class="col button button-small button-fill color-red"]', {visible: true});
    await browser.close();
  }
  catch (e) {
    const error_date = + new Date;
    const error_dir = process.env.ERROR_DIR
    // const error_html = await page.content();

    if (!fs.existsSync(error_dir)) fs.mkdirSync(error_dir);
    // fs.writeFileSync(`${error_dir}/${error_date}_error_dump.txt`, `${e} ${e.stack}`);
    // fs.writeFileSync(`${error_dir}/${error_date}_html_dump.html`, error_html);

    await page.screenshot({path: `${error_dir}/${error_date}_screenshot.png`});

    await browser.close();
    throw e
  }
}

exports.automation = automation;
