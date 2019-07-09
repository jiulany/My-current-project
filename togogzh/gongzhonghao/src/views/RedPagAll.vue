<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12 class='red_pg'>
                <v-layout wrap class='red_pg_it' align-end>
                    <v-flex xs6 class='red_pg_tl'>新人专享红包</v-flex>
                    <v-flex xs6 class='red_pg_mony'><span>￥</span>2</v-flex>
                    <v-flex xs6 class='red_pg_utl'>有效期至2019.04.22</v-flex>
                    <v-flex xs6 class='red_pg_lmt'>无门槛</v-flex>
                    <v-flex xs12 style="border-bottom: 1px dashed #eaeaea;width: 100%;margin-top: 5px;position: relative;top: 10px"></v-flex>
                    <v-flex xs12></v-flex>
                    <v-flex xs7 class='red_pg_num'>限登录手机号为17324563496</v-flex>
                    <v-flex xs5 class='red_pg_clk'>
                        <div class='red_pg_clk_dv'>立即使用</div>
                    </v-flex>
                </v-layout>
            </v-flex>
           <v-flex xs12 class='red_pg'>
                <v-layout wrap class='red_pg_it' align-end>
                    <v-flex xs6 class='red_pg_tl'>新人专享红包</v-flex>
                    <v-flex xs6 class='red_pg_mony'><span>￥</span>2</v-flex>
                    <v-flex xs6 class='red_pg_utl'>有效期至2019.04.22</v-flex>
                    <v-flex xs6 class='red_pg_lmt'>无门槛</v-flex>
                    <v-flex xs12 style="border-bottom: 1px dashed #eaeaea;width: 100%;margin-top: 5px;position: relative;top: 10px"></v-flex>
                    <v-flex xs12></v-flex>
                    <v-flex xs7 class='red_pg_num'>限登录手机号为17324563496</v-flex>
                    <v-flex xs5 class='red_pg_clk'>
                        <div class='red_pg_clk_dv'>立即使用</div>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {

}
</script>
<style>
.red_pg {
    padding: 0 13px 18px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    margin-bottom: 20px
}

.red_pg_it {
    font-weight: 200 !important;
    font-size: 12px
}

.red_pg_it .flex:nth-child(even) {
    text-align: end
}

.red_pg_tl {
    font-weight: bold;
    font-size: 17px
}

.red_pg_mony {
    font-size: 32px;
    font-weight: bold;
    color: #f75c3e
}

.red_pg_mony span {
    font-size: 18px;
    margin-right: 5px
}

.red_pg_utl {
    color: #9c9c9c;
    font-weight: 400;
}

.red_pg_lmt {
    color: #9c9c9c;
    font-weight: 400;
}

.red_pg_num {
    color: #9c9c9c;
    font-weight: 400;
    margin-top: 8px
}

.red_pg_clk {
    margin-top: 13px;
}

.red_pg_clk_dv {
    border: 1px solid #f75c3e;
    background: #f75c3e;
    color: white;
    padding: 4px 15px;
    font-size: 12px;
    width: 90px;
    text-align: center;
    display: inline-block;
    position: relative;
    top: 6px;
}
</style>