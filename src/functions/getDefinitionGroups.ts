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

      const category = await getElementProperty<Element, string>(
         await definitionBlock.$('.d_cat'),
         'textContent'
      );

      const definitions: Definition[] = [];

      for (const definitionElement of await definitionBlock.$$('.d_dfn')) {

         const definition = await getElementProperty<Element, string>(definitionElement, 'textContent');

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

      if (definitions.length)
         definitionGroups.push({
            category,
            definitions
         });

   }

   await browser.close();

   return definitionGroups;

}