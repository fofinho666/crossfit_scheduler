require("dotenv").config()
const puppeteer = require("puppeteer")
const {saveCookies} = require("../services/cookie_sevices")


const loginAndSaveCookies = async (page) => {
    // search for the box
    await page.waitForSelector("input[type=search]")
    await page.type("input[type=search]", process.env.BOX_NAME)
    await page.waitForTimeout(250)
    await page.click("li[class=\"item-content\"]")

    // login
    await page.waitForSelector("div.page-current > div[class~=\"login-screen-content\"]")
    await page.type("input[name=login]", process.env.REGIBOX_LOGIN)
    await page.type("input[name=password]", process.env.REGIBOX_PASSWORD)
    await page.click("input[value=LOGIN]")

    // wait for splash screen to go away
    await page.waitForTimeout(1500)

    const cookies = await page.cookies()
    return await saveCookies(cookies)
}

const run = async () => {
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
    const [page] = await browser.pages()
    await page.setViewport({ width: 1280, height: 720})
    page.setDefaultNavigationTimeout(0)

    await page.goto(process.env.REGIBOX_URL)
    await loginAndSaveCookies(page)
    await browser.close()
}

exports.run = run
exports.loginAndSaveCookies = loginAndSaveCookies
