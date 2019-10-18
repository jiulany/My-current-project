if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app');
require('../../node-modules/npm-scope-dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot');
require('../../components/tab-bar/tabBar');
require('../../components/uni-popup/uni-popup');
require('../../pages/index/index');
require('../../pages/my/my');
require('../../pages/balance/balance');
require('../../pages/recharge/recharge');
require('../../pages/balance_details/balance_details');
require('../../pages/integral/integral');
require('../../pages/integral_details/integral_details');
require('../../pages/integral_store/integral_store');
require('../../pages/integral_store_dt/integral_store_dt');
require('../../pages/my_yuyue/my_yuyue');
require('../../pages/my_yuyue_details/my_yuyue_details');
require('../../pages/invitation/invitation');
require('../../pages/violation/violation');
require('../../pages/my_car/my_car');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}