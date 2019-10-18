import {HTTP} from '../common/utils/http'


class CarModel extends HTTP {
    getNewCar(data) {
        return this.request({
            url:`/commodities?recommend_type=${data.recommend_type}&page=${data.page}&size=${data.size}`
        })
    }
    getCarBrands(){
        return this.request({
            url:`/cars/carBrands`
        })
    }
    getVehicles(data){
        return this.request({
            url:`/cars/carVehicles?brand_id=${data.brand_id}`,
        })
    }
    getTerm(data){
        return this.request({
            url:`/cars/carTerms?product_id=${data.product_id}&displacement=${data.displacement}`,
        })
    }
    getDisplacements(data){
        return this.request({
            url:`/cars/carDisplacements?vehicle_id=${data.vehicle_id}`,
        })
    }
    getEquipmens(data){
        return this.request({
            url:`/cars/carEquipmens?product_id=${data.product_id}&displacement=${data.displacement}&term=${data.term}`,
        })
    }
    createCar(data)
    {
        return this.request({
            url:`/user/createCar`,
            method:'POST',
            data:data
        })
    }
    updateCar(data,options)
    {
        return this.request({
            url:`/user/updateCar/${options.car_id}`,
            method:'POST',
            data:data
        })
    }
    // 违章查询
    violationEnquiry(data){
        return this.request({
            url:`/cars/violationEnquiry`,
            data
        })
    }
}
export {
    CarModel
}
