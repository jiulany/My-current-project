import {HTTP} from '../common/utils/http'

class StopCarModel extends HTTP {
    getCarVip() {
        return this.request({
            url: '/parking/serviceList'
        })
    }
    commitOrder(data){
        return this.request({
            url: '/parking/confirmOrder',
            method:'POST',
            data
        })
    }
    commitPackageOrder(data)
    {
        return this.request({
            url: '/package/confirmOrder?id=' + data.id + '&car_type=' + data.car_type,
        })
    }
}
export {
    StopCarModel
}