import { config } from './congfig'
const tips = {
    1:'抱歉出现一个错误',
    1005:'key无效'
}
// 封装接口请求

class HTTP {
    request({url,data = {}, method = 'GET'}) {
        let systemInfo = uni.getStorageSync('SystemInfo')
        // url = ((systemInfo == 'devtools' || systemInfo == 'ios' || systemInfo == 'android') ? config.api_base_url + url: config.h5_url+ url)
        url = (systemInfo != 'other'  ? config.api_base_url + url: config.h5_url+ url)
        uni.showLoading({
            title:"loading...",
            mask:true
        })
        const code = uni.getStorageSync('code')
        const skey = uni.getStorageSync('skey')
        
        return new Promise((resolve,reject) => {
            this._request(url, resolve, reject, data, method, code, skey)
        })
    }
    _request(path, resolve, reject, data = {}, method = 'GET', code, skey) {
        if (path.indexOf('?') != -1) {
            path += '&rand=' + Math.random()
        } else {
            path += '?rand=' + Math.random()
        }
        uni.request({
            url:path,
            method: method,
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-WX-SKEY': skey,
                'X-WX-CODE': code,
                'verson': config.version
            },
            success: (res) => {
                const code  = res.statusCode.toString()
                
                if (code.startsWith('2')) {
                    if (res.data.code < 400) {
                        resolve(res.data)
                    } else {
                        const title = res.data.message
                        uni.showToast({
                            title,
                            icon:'none'
                        })
                        setTimeout(()=>{
                            reject(res.data)
                            // resolve(res.data)
                        },2000)
                    }
                } else {
                    uni.showToast({
                        title: '系统错误',
                        icon:'none'
                    })
                    reject(res.data)
                    const error_code = res.data.error_code
                    this._show_error(error_code)
                }
                uni.hideLoading()
            },fail:(err) => {
                reject(err)
                console.log(err)
                this._show_error(1)
            }
        })
    }
    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        uni.showToast({
            title: tip?tip:tip[1],
            icon: 'none',
            duration: 2000
        })
    }
}
export { HTTP }