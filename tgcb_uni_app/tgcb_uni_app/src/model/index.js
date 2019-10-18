import {HTTP} from '../common/utils/http'

class IndexModel extends HTTP{
    getIndex(){
        return this.request({
            url: '/index'
        })
    }
    getCosmetology(data){
        return this.request({
            url:`/services?page=${data.page}&size=${data.size}&service_classify_id=${data.service_classify_id}&recommend_type=${data.recommend_type}&sku_count=one`
        })
    }
    getShopList(data){
        return this.request({
            // url:`/shops?longitude=${data.longitude}&latitude=${data.latitude}`
            url:`/shops`,
            data
        })
    }
    
    getShopArea(data)
    {
        return this.request({
            url:`/shopByArea`,
            data
        })
    }
    // 提交现金收车
    subCollectCash(data){
        return this.request({
            url:'/recovery/create',
            method: 'POST',
            data
        })
    }
    // 延保部件
    getDelayList(data) {
        return this.request({
            url: `/guarantees/commodityList`,
            method:'GET',
            data
        })
    }
    // 提交延保
    delayApply(data)
    {
        return this.request({
            url:`/guarantees/createOrder`,
            method:'POST',
            data
        })
    }
    // 提交记录
    subRecord(data) {
        return this.request({
            url: `/recovery/list?page=${data.page}&size=${data.size}`,
        });
    }
    // 催单
    reminder(data) {
        return this.request({
            url: `/recovery/reminder`,
            method : 'POST',
            data
        });
    }
    // 年检确认订单
    annualReviewConfirmOrder(id) {
        return this.request({
            url:`/annualReview/confirmOrder?car_id=${id}`,
        })
    }
    // 年检结算
    annualReviewCreate(data){
        return this.request({
            url:'/annualReview/create',
            method: 'POST',
            data
        })
    }
    // 保养手册
    maintenanceManual(data){
        return this.request({
            url:`/maintains/manual`,
            data
        })
    }
    // 保险类型列表
    getInsuranceList(){
        return this.request({
            url:`/insurances/typeList`,
            
        })
    }
    // 新增保险
    createInsurance(data)
    {
        return this.request({
            url:`/insurances/create`,
            method:"POST",
            data
        })
    }
    // 用户的保险列表
    userInsuranceList(data)
    {
        return this.request({
            url:`/insurances/list?page=${data.page}&size=${data.size}`,
        })
    }
    // banners
    getBanner(data)
    {
        return this.request({
            url:`/banners`,
            data
        })
    }
    // 车友福利(套餐)
    getPackageList(data)
    {
        return this.request({
            url:`/package/list`,
            data
        })
    }
    // 应急停车
    parking(data)
    {
        return this.request({
            url:`/parking`,
            method:'POST',
            data
        })
    }
}
export {IndexModel}