export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

export const buildUrl = (url, params) => {
  let urlWithParams = url;

  const finalParams = { ...params };

  if (finalParams.price_max > 2 && finalParams.price_min === '0') {
    finalParams.price_min = 1;
  }
  if (finalParams.price_max === '0' && finalParams.price_min >= 1) {
    finalParams.price_max = 10000000;
  }

  Object.entries(finalParams).forEach(([key, value], i) => {
    const sign = !i ? '?' : '&';
    urlWithParams += `${sign}${key}=${value}`;
  });

  return urlWithParams;
};

export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);
