import axios from "axios"
import qs from 'qs';
import Cookies from 'js-cookie'
const url_dev = "https://propertyapi.tuogouchebao.com/"//192.168.31.157:8001 property.tuogouchebao.com/ http://192.168.31.213:8001/
const url_pro = "https://propertyapi.tuogouchebao.com/" 
export const baseURL = process.env.NODE_ENV === "development" ? url_dev : url_pro
var _axios = axios.create({ //axios默认配置
    baseURL: baseURL,
    timeout: 10000,
});
// _axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export default function http(url, conf) {
    _axios.defaults.headers.common['authorization'] = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        if (conf.method.toLowerCase() === "get") {
            let a = conf.data
            a.community_id = Cookies.get('community_id')
            a.property_id = Cookies.get('property_id')
            _axios.get(url, {
                params: a
            }
            ).then(function (response) {
                if (response.data.code === 200) {
                    resolve(response.data)
                } else if (response.data.code === 402) {
                    Cookies.set('user_id',"", { expires: 30 });
                    // Cookies.set('community_id', res.data[0].id, { expires: 30 });
                    Cookies.set('name',"", { expires: 30 });
                    Cookies.set('username', "", { expires: 30 });
                    Cookies.set('property_id', "", { expires: 30 });
                    Cookies.set('login', 'false', { expires: 30 });
                    resolve(response.data)
                }  else {
                    reject(response.data)
                }
            }).catch(function (error) {
                reject(error)
            })
        }
        if (conf.method.toLowerCase() === "post") {
            let a = conf.data
            a.community_id = Cookies.get('community_id')
            a.property_id = Cookies.get('property_id')
            let b = conf
            b.data = a
            if (conf.headers) {
                _axios.post(url, a).then(function (response) {
                    if (response.data.code === 200) {
                        resolve(response.data)
                    } else if (response.data.code === 402) {
                        Cookies.set('user_id',"", { expires: 30 });
                        // Cookies.set('community_id', res.data[0].id, { expires: 30 });
                        Cookies.set('name',"", { expires: 30 });
                        Cookies.set('username', "", { expires: 30 });
                        Cookies.set('property_id', "", { expires: 30 });
                        Cookies.set('login', 'false', { expires: 30 });
                        resolve(response.data)
                    }else {
                        reject(response.data)
                    }
                }).catch(function (error) {
                    reject(error)
                })
            } else {
                _axios.post(url, qs.stringify(a), {
                    ...a
                }
                ).then(function (response) {
                    if (response.data.code === 200) {
                        resolve(response.data)
                    } else if (response.data.code === 402) {
                        Cookies.set('user_id',"", { expires: 30 });
                        // Cookies.set('community_id', res.data[0].id, { expires: 30 });
                        Cookies.set('name',"", { expires: 30 });
                        Cookies.set('username', "", { expires: 30 });
                        Cookies.set('property_id', "", { expires: 30 });
                        Cookies.set('login', 'false', { expires: 30 });
                        resolve(response.data)
                    } else {
                        reject(response.data)
                    }
                }).catch(function (error) {
                    reject(error)
                })
            }

        }
    })

}