export const EP = {
  mostViewed: 'https://api.wediscount.org/api/v1/GetMostViewedContentsAsync',
  mostRecent: 'https://api.wediscount.org/api/v1/GetMostRecentContentsAsync',
  productPreview: 'https://api.wediscount.org/api/v1/ContentsGetByContentIdForPreview',
  productView: (id: string | number) => `https://api.wediscount.org/api/v1/ContentView?id=${id}`,
  cities: 'https://api.wediscount.org/api/v1/CitiesGet',
  towns: 'https://api.wediscount.org/api/v1/TownsGet',
};
