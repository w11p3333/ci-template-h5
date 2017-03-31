import createApi from './network'
/** ******************************** login apis **************************** */
export function fetchLogin ({ appkey }) {
  return createApi('account/main.php/json/account/getLoginInfo', {
    appkey
  })
}
