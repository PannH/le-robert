import createPage from '../helpers/createPage';
import getElementProperty from '../helpers/getElementProperty';
import Definition from '../interfaces/Definition';
import type DefinitionGroup from '../interfaces/DefinitionGroup';

export default async function getDefinitionGroups(wordQuery: string): Promise<DefinitionGroup[]> {

   const pageURL = `https://dictionnaire.lerobert.com/definition/${encodeURIComponent(wordQuery)}`;

   const { browser, page } = await createPage(pageURL);

   const definitionsContainer = await page.$('#definitions');

   if (!definitionsContainer) {

      await browser.close();

      throw new Error(`No definitions found for "${wordQuery}"`);

   }

   const definitionGroups: DefinitionGroup[] = [];
   
   for (const definitionBlock of await page.$$('#definitions > .b')) {

      const category = await getElementProperty(
         await definitionBlock.$('.d_cat'),
         'textContent'
      ) as string;

      const definitions: Definition[] = [];

      for (const definitionElement of await definitionBlock.$$('.d_dfn')) {

         const definition = await getElementProperty(definitionElement, 'textContent') as string;

         const { examples, context } = await definitionElement.evaluate((element) => {

            const { parentElement } = element;
            
            const examples: string[] = [];
            let context: string;

            for (let i = 0; i < parentElement.childElementCount; i++) {

               const childElement = parentElement.children[i];

               switch (childElement.className) {
   
                  case 'd_xpl':
                     examples.push(childElement.textContent);
                     break;

                  case 'd_mta':
                     context = childElement.textContent?.toLowerCase();
                     break;

               }

            }

            return {
               examples,
               context
            }

         });
      
         definitions.push({
            value: definition,
            examples,
            context
         });

      }

      definitionGroups.push({
         category,
         definitions
      });

   }

   return definitionGroups;

}