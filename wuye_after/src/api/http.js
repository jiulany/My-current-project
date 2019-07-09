import axios from "axios"
const url_dev = "/api"
const url_pro = ""
const baseURL = process.env.NODE_ENV === "development" ? url_dev : url_pro
var _axios = axios.create({ //axios默认配置
    baseURL: baseURL,
    timeout: 5000,
});
_axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export default function http(url, conf) {
    if (conf.method.toLowerCase() == "get") {
        _axios.get(url, {
            params: conf.data
        }
        )
    }
    if (conf.method.toLowerCase() == "post") {
        _axios.post(url, {
            data: conf.data
        }
        )
    }
}