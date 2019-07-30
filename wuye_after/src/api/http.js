import axios from "axios"
import qs from 'qs';
const url_dev = "http://192.168.31.177/"//http://192.168.31.9  http://192.168.31.177
const url_pro = ""
export const baseURL = process.env.NODE_ENV === "development" ? url_dev : url_pro
var _axios = axios.create({ //axios默认配置
    baseURL: baseURL,
    timeout: 5000,
});
// _axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export default function http(url, conf) {
    return new Promise((resolve, reject) => {
        if (conf.method.toLowerCase() === "get") {
            _axios.get(url,{
                params: conf.data
            }
            ).then(function (response) {
                if(response.data.code===200){
                    resolve(response.data)
                }else{
                    reject(response.data)
                }
            }).catch(function (error) {
                    reject(error)
                })
        }
        if (conf.method.toLowerCase() === "post") {
            if(conf.headers){
                conf.data.get('status')
                _axios.post(url,conf.data).then(function (response) {
                    if(response.data.code===200){
                        resolve(response.data)
                    }else{
                        reject(response.data)
                    }
                }).catch(function (error) {
                        reject(error)
                    })
            }else{
                _axios.post(url,qs.stringify(conf.data),{
                    ...conf
                }
                ).then(function (response) {
                    if(response.data.code===200){
                        resolve(response.data)
                    }else{
                        reject(response.data)
                    }
                }).catch(function (error) {
                        reject(error)
                    })
            }
            
        }
    })

}