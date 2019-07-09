<template>
  <el-header height="60px">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="logo">
          <img class="logo_pic" :src="'http://yxydht.nonghugo.com'+logo" alt>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="header_txt">
          <h4>红色研学旅行网站</h4>
          <h6>Red Research Travel Website</h6>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="header_menu">
          <img @click.stop="extMenu" src="../assets/images/menu.png" alt>
        </div>
        <div ref="menu" id="menu" style="display:none">
          <el-col :span="24" class="menu">
            <el-col :span="24" @click.native.stop="toIndex">网站首页</el-col>
            <el-col :span="24" @click.native.stop="toCamp">营地简介</el-col>
            <el-col :span="24" class="menu_2" @click.native.stop="newItem">新闻政策</el-col>
            <el-col :span="24" class="menu_2" @click.native.stop="classItem">课程内容</el-col>
            <el-col :span="24" class="menu_2" @click.native.stop="curriculumItem">关于培训</el-col>
            <el-col :span="24" @click.native.stop="toCurriculum">课程教学</el-col>
            <el-col :span="24" @click.native.stop="toContact">联系我们</el-col>
          </el-col>
          <el-col :span="24" class="menu_item_2" ref="menu_item_2" id="menu_item_2">
            <el-col
              :span="24"
              v-for="item in menu_item"
              :key="item.titile"
              @click.native.stop="toTarget(item.add)"
            >{{item.title}}</el-col>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      menu_item: [],
      logo:'',
    };
  },
  created() {
    this.$http.post(process.env.API_HOST+'/index/Classify_List/getWebsiteContent').then(function(response){
      this.logo= response.data.Data.websitelogo
    })
  },
  methods: {
    extMenu() {
      if (this.$refs.menu.style.display == "block") {
        this.$refs.menu.style.display = "none";
        this.$refs.menu_item_2.$el.style.display = "none";
      } else {
        this.$refs.menu.style.display = "block";
      }
    },
    newItem() {
      this.menu_item = [
        { add: "/new_center?it_1=>新闻政策&it_2=>新闻中心", title: "新闻中心" },
        { add: "/policy_center?it_1=>新闻政策&it_2=>政策文件", title: "政策文件" }
      ];
      this.$refs.menu_item_2.$el.style.top = "92.5px";
      this.$refs.menu_item_2.$el.style.display = "block";
    },
    classItem() {
      this.menu_item = [
        { add: "/class?it_1=>课程内容&it_2=>课程大纲", title: "课程大纲" },
        { add: "/line?it_1=>课程内容&it_2=>研学路线", title: "研学路线" }
      ];
      this.$refs.menu_item_2.$el.style.top = "115px";
      this.$refs.menu_item_2.$el.style.display = "block";
    },
    curriculumItem() {
      this.menu_item = [
        { add: "/train?it_1=>关于培训&it_2=>培训动态", title: "培训动态" },
        { add: "/stu?it_1=>关于培训&it_2=>学员风采", title: "学员风采" }
      ];
      this.$refs.menu_item_2.$el.style.top = "137px";
      this.$refs.menu_item_2.$el.style.display = "block";
    },
    toTarget(add) {
      this.$refs.menu.style.display = "none";
      this.$refs.menu_item_2.$el.style.display = "none";
      this.$router.push(add);
    },
    toCurriculum() {
      this.$router.push({ path: "/curriculum", query: { it_1: ">课程教学" } });
      this.$refs.menu.style.display = "none";
      this.$refs.menu_item_2.$el.style.display = "none";
    },
    toCamp() {
      this.$router.push({ path: "/camp", query: { it_1: ">营地介绍" } });
      this.$refs.menu.style.display = "none";
      this.$refs.menu_item_2.$el.style.display = "none";
    },
    toContact() {
      this.$router.push({ path: "/contact", query: { it_1: ">联系我们" } });
      this.$refs.menu.style.display = "none";
      this.$refs.menu_item_2.$el.style.display = "none";
    },
    toIndex() {
      this.$router.push({ path: "/", query: {} });
      this.$refs.menu.style.display = "none";
      this.$refs.menu_item_2.$el.style.display = "none";
    }
  }
};
</script>

<style scoped>
.el-header {
  padding: 0 0;
}
.el-row {
  height: 100%;
  padding-top: 5px;
}
.el-col {
  height: 100%;
}
.logo {
  height: 100%;
  padding-left: 20px;
  padding-top: 5px;
  text-align: start;
}
.logo_pic {
  height: 80%;
  width: 57px;
}
.header_txt {
  height: 100%;
  padding-top: 5px;
  padding-left: 20px;
  text-align: start;
}
.header_txt h4,
.header_txt h6 {
  text-align: start;
  font-family: "黑体";
}
.header_menu {
  padding-top: 10px;
  text-align: end;
  padding-right: 20px;
  position: relative;
}
.header_menu img {
  height: 25px;
  border: 1px solid white;
}
.header_menu img:active {
  border: 1px solid #edf11d;
}
.menu {
  position: absolute;
  width: 95px;
  background: #6b6b6b;
  z-index: 100;
  right: 10px;
  top: 48px;
  height: auto;
  padding: 0 !important;
  border: 1px solid #4a4a4a;
}
.menu .el-col {
  height: 22px;
  border-bottom: 1px solid white;
  color: white;
  font-size: 12px;
  line-height: 20px;
  position: relative;
}
.menu .el-col:active {
  background: #888888;
}
.menu_2::after {
  content: ">";
  font-size: 16px;
  position: absolute;
  left: 79px;
}
.menu .el-col:last-child {
  border-bottom: 1px solid #6b6b6b;
}
.menu::after {
  content: "";
  height: 0;
  width: 0;
  border-width: 0px 6px 7px;
  border-color: transparent transparent #6b6b6b; /*透明 透明  灰*/
  position: absolute;
  left: 57px;
  top: -6px;
  border-style: solid;
}
.menu_item_2 {
  position: absolute;
  width: 95px;
  background: #6b6b6b;
  z-index: 100;
  right: 105px;
  top: 48px;
  height: auto;
  padding: 0 !important;
  border: 1px solid #4a4a4a;
  display: none;
}
.menu_item_2 .el-col {
  height: 22px;
  border-bottom: 1px solid white;
  color: white;
  font-size: 12px;
  line-height: 20px;
  position: relative;
}
.menu_item_2 .el-col:last-child {
  border-bottom: 1px solid #6b6b6b;
}
</style>
