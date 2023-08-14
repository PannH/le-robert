import ppt, { type Page, type Browser } from 'puppeteer';

export default async function createPage(url: string): Promise<{ browser: Browser; page: Page; }> {

   const browser = await ppt.launch({
      headless: 'new'
   });

   const page = await browser.newPage();

   await page.goto(url);

   return {
      browser,
      page
   };

}