<template>
    <view class="store">
        <map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" scale="10" :markers="markers"></map>
        <cover-view class="store_top">
            <cover-view class="store_top_items" @tap="_choice_store">
                选择门店
            </cover-view>
            <cover-view class="store_top_items" @tap="_lately">
                离我最近
            </cover-view>
            <cover-view class="store_top_items" @tap="_navigation">
                导航
            </cover-view>
        </cover-view>
    </view>
</template>

<script>
    export default {
        name: "store",
        data() {
            return {
                title: 'map',
                latitude: 30.674958,
                longitude: 104.064283,
                markers: [
                    {
                        iconPath: "/resources/others.png",
                        id: 0,
                        latitude: 30.689928,
                        longitude: 104.049478,
                        width: 50,
                        height: 50
                    },
                    {
                    id: 1,
                    latitude: 30.689928,
                    longitude: 104.049478,
                    iconPath: '../../../static/location.png',
                    width: 50,
                    height: 50

                }, {
                    id: 2,
                    latitude: 39.90,
                    longitude: 116.39,
                    iconPath: '../../../static/location.png',
                    width: 50,
                    height: 50
                }]
            }
        },
        components: {
        },
        methods:{
            _choice_store(){
                uni.navigateTo({
                    url:"/pagesB/choice_store/choice_store"
                })
            },
            _lately(){
                uni.navigateTo({
                    url:"/pagesB/lately/lately"
                })
            },
            _navigation(){
                uni.openLocation({
                    latitude: 25.0271210000,
                    longitude: 101.7632820000,
                    name: "宝安中心A地铁口",
                    address:'宝安中心A地铁口',
                    success: function() {
                        console.log('success');
                    }
                });
            }
        }
    }
</script>

<style scoped>
.store {
    width: 100%;
    height: 100%;
    position: relative;
}
.store_top{
 position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size:32rpx;
    text-align: center;
    justify-content: space-between;
}
.store_top_items{
    flex: 1;
    line-height: 100rpx;
    border-right: solid 1rpx #f5f5f5;
    height: 100rpx;
}
.store_top_items:last-child{
    border-right: none;
}
.active{
    background: #FBCC31;
}
</style>
