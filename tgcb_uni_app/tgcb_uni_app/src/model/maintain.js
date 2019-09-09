import {HTTP} from '../common/utils/http'


class MaintainModel extends HTTP {
    getData() {
        return this.request({
            url:`/commodityClassify?service_classify_id=3`
        })
    }
}
export {
    MaintainModel
}
