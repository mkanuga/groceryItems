import { root } from './index';

const alertSelector = 'p[role="alert"]';
const buttonSelector = '#editButton';
const deleteButtonSelector = '#deleteButton';

export const getAlertText = async () => {
  const app = await root();
  return await app.$eval(alertSelector, el => el.innerText);
}


export const getEditButton = async () => {
  const app = await root();
  return await app.$(buttonSelector);
}


export const getDeleteButton = async () => {
  const app = await root();
  return await app.$(deleteButtonSelector);
}


