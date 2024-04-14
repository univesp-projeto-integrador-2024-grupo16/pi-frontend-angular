const BASE_URL = "http://192.168.5.190"
const PORT_URL = "8000"
const API_VERSION = "1"
const API_URL = BASE_URL+":"+PORT_URL+"/api/v"+API_VERSION

export const environment = {
  production: false,
  API_LOGIN: BASE_URL+":"+PORT_URL + '/api/auth/',
  API_BASE: API_URL+'/'
};
