require('dotenv').config();
const puppeteer = require('puppeteer');
const {saveCookies} = require('../services/cookie_sevices')


const loginAndSaveCookies = async (page, mongoClient) => {
  // search for the box
  await page.waitForSelector('input[type=search]');
  await page.type('input[type=search]', process.env.BOX_NAME);
  await page.waitForTimeout(250);
  await page.click('li[class="item-content"]');

  // login
  await page.waitForSelector('div.page-current > div[class~="login-screen-content"]');
  await page.type('input[name=login]', process.env.LOGIN);
  await page.type('input[name=password]', process.env.PASSWORD);
  await page.click('input[value=LOGIN]');

  // wait for splash screen to go away
  await page.waitForTimeout(1500);

  const cookies = await page.cookies();
  return await saveCookies(mongoClient, cookies);
}

const run = async (mongoClient) => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const [page] = await browser.pages();
  page.setDefaultNavigationTimeout(0);

  await page.goto(process.env.REGIBOX_URL);
  await loginAndSaveCookies(page, mongoClient);
  await browser.close();
}

exports.run = run;
exports.loginAndSaveCookies = loginAndSaveCookies;
