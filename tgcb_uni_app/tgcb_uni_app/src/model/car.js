import {HTTP} from '../common/utils/http'


class CarModel extends HTTP {
    getNewCar(data) {
        return this.request({
            url:`/commodities?recommend_type=${data.recommend_type}&page=${data.page}&size=${data.size}`
        })
    }
}
export {
    CarModel
}
