<template>
  <el-row class="content">
    <el-row>
      <el-col :span="12">
        <div class="title-bg">
          <span>营地简介</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title-mr">
            <span>
                <router-link to="/camp?it_1=>营地介绍">MORE</router-link>
            </span>
        </div>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span='24' class="camp-img">
            <img src="../assets/images/camp_img.png" alt="">
        </el-col>
         <el-col :span='24' class="camp-sumry">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;湘江战役红色教育学院湘江战役红色教育学院湘江战役红色教育学院湘江战役红色教育学院湘江战役红色教育学院湘江战役红色教育学院</p>
        </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {};
</script>
<style>
.content {
  padding: 20px 20px;
  padding-bottom: 0
}
.title-bg {
  background: url("../assets/images/title_bg.png");
  background-size: 100% 100%;
  width: 123px;
  height: 26px;
  color: white;
  text-align: start;
  line-height:26px
}
.title-bg span{
    margin-left: 16px
}
.title-mr{
    line-height:34px
}
.title-mr span{
    float: right;
}
.camp-img img{
    height: 200px;
    width: 100%
}
.camp-sumry{
    text-align: start
}
.camp-sumry p{
    font-size: 12px;
}
</style>
