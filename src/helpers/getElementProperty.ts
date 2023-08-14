import type { ElementHandle } from 'puppeteer';

export default async function getElementProperty<ElementType extends Element, ReturnType>(element: ElementHandle<ElementType>, propertyKey: keyof ElementType): Promise<ReturnType> {

   return await (await element.getProperty(propertyKey)).jsonValue() as ReturnType;

}