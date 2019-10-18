<script>
import {base_url} from './api/http'
	export default {
		onLaunch: function() {
			let _this=this
    uni.getProvider({
      service: "oauth",
      success: function(res) {
        uni.login({
          provider: res.provider[0],
          success: function(loginRes) {
            console.log(loginRes)
             uni.request({ url: `${base_url}api/login`,
             header: {
             'X-WX-Code': loginRes.code //自定义请求头信息
             },
             method:"post",
             success: (res) => {
		         uni.setStorageSync("skey", res.data.data.skey);
             }
            })
          }
        });
      }
    });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.span1 {
  width: 4.166667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span2 {
  width: 8.333333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span3 {
  width: 12.5%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span4 {
  width: 16.666667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span5 {
  width: 20.833333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span6 {
  width: 25%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span7 {
  width: 29.166667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span8 {
  width: 33.333333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span9 {
  width: 37.5%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span10 {
  width: 41.666667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span11 {
  width: 45.833333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span12 {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span13 {
  width: 54.166667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span14 {
  width: 58.333333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span15 {
  width: 62.5%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span16 {
  width: 66.666667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span17 {
  width: 70.833333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span18 {
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span19 {
  width: 79.166667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span20 {
  width: 83.333333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span21 {
  width: 87.5%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span22 {
  width: 91.666667%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span23 {
  width: 95.833333%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.span24 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
</style>
