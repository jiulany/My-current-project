import {HTTP} from '../common/utils/http'

class IndexModel extends HTTP{
    getIndex(){
        return this.request({
            url: '/index'
        })
    }
    getCosmetology(data){
        return this.request({
            url:`/services?page=${data.page}&size=${data.size}&service_classify_id=${data.service_classify_id}&sku_count=one`
        })
    }

}
export {IndexModel}