(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uLink"],{"27d6":function(t,e,n){"use strict";n.r(e);var a=n("80f9"),u=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=u.a},"80f9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"u-link",props:{href:{type:String,default:""},text:{type:String,default:""},inWhiteList:{type:Boolean,default:!1}},methods:{openURL:function(){this.inWhiteList?t.navigateTo({url:"/pages/component/web-view/web-view?url="+this.href}):(t.setClipboardData({data:this.href}),t.showModal({content:"本网址无法直接在小程序内打开。已自动复制网址，请在手机浏览器里粘贴该网址",showCancel:!1}))}}};e.default=n}).call(this,n("543d")["default"])},8694:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return u})},fad7:function(t,e,n){"use strict";n.r(e);var a=n("8694"),u=n("27d6");for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);var o=n("2877"),r=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uLink-create-component',
    {
        'components/uLink-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fad7"))
        })
    },
    [['components/uLink-create-component']]
]);                
