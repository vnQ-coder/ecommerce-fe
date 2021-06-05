const getDefaultFetchHeaders = () => ({
  Accept: '*/*',
  'Accept-Language': localStorage.getItem('saglik_locale'),
});

const api = (url, method, headers = {}, reqBody = null) => {
  const defaultFetchHeaders = getDefaultFetchHeaders();
  const params = {
    headers: { ...defaultFetchHeaders, ...headers },
    method,
    body: reqBody,
    // mode: 'cors',
    credentials: 'include',
  };
  let responseHeaders;
  let responseStatus;
  return fetch(url, params)
    .then((res) => {
      responseHeaders = res.headers;
      responseStatus = res.status;
      const type = res.headers.get('content-type');
      if (type.includes('application/json')) {
        return res.json();
      }
      return res.text();
    })
    .then((body) => ({ headers: responseHeaders, body, status: responseStatus }));
};

export const get = (url, headers) => api(url, 'GET', headers);
export const post = (url, headers, body) => api(url, 'POST', headers, JSON.stringify(body));
export const postFile = (url, headers, body) => api(url, 'POST', headers, body);
export const putFile = (url, headers, body) => api(url, 'PUT', headers, body);
export const put = (url, headers, body) => api(url, 'PUT', headers, JSON.stringify(body));
export const del = (url, headers, body) => api(url, 'DELETE', headers, JSON.stringify(body));
