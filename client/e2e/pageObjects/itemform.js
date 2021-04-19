import { root } from './index';

const itemCodeTextSelector = '#itemCd'
const itemNameTextSelector = '#itemName'
const itemDescriptionTextSelector = '#itemDescription'
const itemCategoryOptionSelector = '#itemCategory'
const buttonSelector = '#submitButton'

export const getItemCodeTextSelector = async () => {
  const app = await root();
  return await app.$(itemCodeTextSelector);
}

export const getItemNameTextSelector = async () => {
  const app = await root();
  return await app.$(itemNameTextSelector);
}

export const getItemDescriptionTextSelector = async () => {
  const app = await root();
  return await app.$(itemDescriptionTextSelector);
}

export const getItemCategoryOptionSelector = async () => {
  const app = await root();
  return await app.$(itemCategoryOptionSelector);
}

export const getButtonSelector = async () => {
  const app = await root();
  return await app.$(buttonSelector);
} 

