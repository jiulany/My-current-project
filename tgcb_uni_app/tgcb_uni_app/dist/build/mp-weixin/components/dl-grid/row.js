(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/dl-grid/row"],{"096d":function(t,n,e){},"0b20":function(t,n,e){"use strict";e.r(n);var r=e("e23e"),u=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(n,t,function(){return r[t]})}(i);n["default"]=u.a},"68a5":function(t,n,e){"use strict";var r=e("096d"),u=e.n(r);u.a},9294:function(t,n,e){"use strict";e.r(n);var r=e("fa52"),u=e("0b20");for(var i in u)"default"!==i&&function(t){e.d(n,t,function(){return u[t]})}(i);e("68a5");var a=e("2877"),o=Object(a["a"])(u["default"],r["a"],r["b"],!1,null,"6f5e8e35",null);n["default"]=o.exports},e23e:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"Row",props:{gutter:{type:[Number,String]},align:{type:String,validator:function(t){return["left","right","center"].includes(t)}}},computed:{rowStyle:function(){return"margin-left:"+-this.gutter/2+"upx;margin-right:"+-this.gutter/2+"upx;"},rowClass:function(){var t=this.align;return[t&&"align-".concat(t)].join(" ")}},mounted:function(){var t=this;this.$children[0].$children.forEach(function(n){n.gutter=t.gutter})}};n.default=r},fa52:function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return r}),e.d(n,"b",function(){return u})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/dl-grid/row-create-component',
    {
        'components/dl-grid/row-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9294"))
        })
    },
    [['components/dl-grid/row-create-component']]
]);                
