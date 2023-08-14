import createPage from '../helpers/createPage';
import getElementProperty from '../helpers/getElementProperty';
import type Pronunciation from '../interfaces/Pronunciation';

export default async function getPronunciation(wordQuery: string): Promise<Pronunciation> {

   const pageURL = `https://dictionnaire.lerobert.com/definition/${encodeURIComponent(wordQuery)}`;

   const { browser, page } = await createPage(pageURL);

   const definitionsContainer = await page.$('#definitions');

   if (!definitionsContainer) {

      await browser.close();

      throw new Error(`No pronunciation found for "${wordQuery}"`);

   }

   const audioSourceURL = await getElementProperty<HTMLSourceElement, string>(
      await page.$('audio > source'),
      'src'
   );

   await browser.close();

   return {
      audioURL: audioSourceURL
   }

}