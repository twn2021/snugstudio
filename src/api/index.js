import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

// 시
function getSearchAddr1() {
  return instance.get('/address/city');
}
// 구, 동
function getSearchAddr2(params) {
  return instance.get('/address/children/' + params);
}
// 공간구조(조회)
function getHouseSize() {
  return instance.get('/code/getCodeList?commonCodeType=HOUSE_STRUCTURE');
}

//월세, 평수, 공간구조(저장)
function postLocationRequest(params) {
  console.log('params', params);
  return instance.post('/location/request', params, {
    headers: { 'Content-Type': 'application/json;carset=utf-8' },
  });
}

export { getSearchAddr1, getSearchAddr2, getHouseSize, postLocationRequest };
