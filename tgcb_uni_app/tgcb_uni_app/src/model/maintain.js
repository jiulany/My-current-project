import {HTTP} from '../common/utils/http'


class MaintainModel extends HTTP {
    // 分类列表
    getData() {
        return this.request({
            url:`/commodityClassify?service_classify_id=3`
        })
    }
    // 匹配分类商品
    matching(data){
        return this.request({
            url:`/maintains/commodityList`,
            data
        })
    }
}
export {
    MaintainModel
}
