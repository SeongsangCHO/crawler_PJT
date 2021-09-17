import axios from "axios";

const ENDPOINT = `http://localhost:8080`;

const headers = {
  "Content-Type": "application/json",
};

export const addCardURL = `${ENDPOINT}/link/addcard`;
export const getCardsURL = `${ENDPOINT}/link/cards`;
export const getProductsListURL = `${ENDPOINT}/link/products`;
export const getlinkCardListURL = `${ENDPOINT}/link/linkcardlist`;
export const getCategoriesURL = `${ENDPOINT}/link/categories`;
export const addCategoryURL = `${ENDPOINT}/link/categories`;
export const linkDataApiCallURL = `${ENDPOINT}/api/mylink`;
// export const crawlURL = `${ENDPOINT}/crawler`;
export const crawlURL = `${ENDPOINT}/crawl/run`;
export const getCrawListlURL = `${ENDPOINT}/crawl/list`;
export const reloadURL = `${ENDPOINT}/reload`;
export const logoutURL = `${ENDPOINT}/api/logout`;
export const deleteCardURL = `${ENDPOINT}/postdelete`;
export const registerURL = `${ENDPOINT}/user/register`;
export const loginURL = `${ENDPOINT}/user/login`;
export const doubleCheckURL = `${ENDPOINT}/user/doublecheck`;
const getAccessTokenHeder = (accessToken) => {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const requestGet = async ({ url, accessToken }) => {
  const accessTokenHeader = getAccessTokenHeder(accessToken);
  const res = await axios.get(url, {
    headers: {
      ...headers,
      ...accessTokenHeader,
    },
  });
  return res;
};

export const requestPost = async ({ url, body, accessToken }) => {
  const accessTokenHeader = getAccessTokenHeder(accessToken);
  const res = await axios.post(url, body, {
    headers: {
      ...headers,
      ...accessTokenHeader,
    },
  });
  return res;
};
