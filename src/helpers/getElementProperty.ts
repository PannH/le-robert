import type { ElementHandle } from 'puppeteer';

export default async function getElementProperty(element: ElementHandle<Element>, propertyKey: keyof Element) {

   return await (await element.getProperty(propertyKey)).jsonValue();

}