import { root } from './index';


const buttonSelector = '#searchCategoryButton'
const searchCategorySelector = '#searchCategory'


export const getSearchButtonSelector = async () => {
  const app = await root();
  return await app.$(buttonSelector);
} 


export const getSearchItemCategoryOptionSelector = async () => {
  const app = await root();
  return await app.$(searchCategorySelector);
}
