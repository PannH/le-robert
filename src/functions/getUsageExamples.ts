import createPage from '../helpers/createPage';
import getElementProperty from '../helpers/getElementProperty';
import type UsageExample from '../interfaces/UsageExample';

export default async function getUsageExamples(wordQuery: string): Promise<UsageExample[]> {

   const pageURL = `https://dictionnaire.lerobert.com/definition/${encodeURIComponent(wordQuery)}`;

   const { browser, page } = await createPage(pageURL);

   const definitionsContainer = await page.$('#definitions');

   if (!definitionsContainer) {

      await browser.close();

      throw new Error(`No usage examples found for "${wordQuery}"`);

   }

   const usageExamples: UsageExample[] = [];

   for (const exampleContainer of await page.$$('.ex_example')) {

      const example = await getElementProperty<Element, string>(exampleContainer, 'textContent');

      const sourceElement = await exampleContainer.$('a.ex_author');

      const sourceName = await getElementProperty<HTMLAnchorElement, string>(sourceElement, 'textContent');
      const sourceURL = await getElementProperty<HTMLAnchorElement, string>(sourceElement, 'href');

      usageExamples.push({
         value: example.replace(sourceName, ''),
         source: {
            value: sourceName,
            url: sourceURL
         }
      });

   }

   await browser.close();

   return usageExamples;

}