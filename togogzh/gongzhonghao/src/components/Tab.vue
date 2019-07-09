<template>
    <div class="c_tab">
        <ul class="c_tab_ul">
            <li v-for="(item,i) in classes" @click='getGoods(item,i,$event)' :class="{ li_act: item.act }">{{item.name}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            classes: [],
            inx: null,
            valinx: {},
        }
    },
    created() {
        this.$api.getMarketClassify().then(res => {
            var as = res.data.data
            var bs = localStorage.getItem("getStoreCurPg")
            for (let i in as) {
                if (i == bs) {
                    as[i].act = true
                } else {
                    as[i].act = false
                }
            }
            this.inx = bs
            this.classes = as
            this.$emit("defautId", res.data.data[bs].id)
        })
    },
    methods: {
        getGoods(val, i, e) {
            localStorage.setItem("getStoreCurPg", i)
            if (this.inx == null) {
                this.$emit("getId", val.id)
                val.act = true
                this.$set(this.classes, i, val)
                this.inx = i
                this.valinx = val
            } else {
                let a = this.classes[this.inx]
                a.act = false
                this.$set(this.classes, this.inx, a)
                this.$emit("getId", val.id)
                val.act = true
                this.$set(this.classes, i, val)
                this.inx = i
                this.valinx = val
            }
        }
    }

}
</script>
<style>
.c_tab {
    width: 100%
}

.c_tab_ul {
    list-style: none;
    padding: 0;
    overflow-x: scroll;
    white-space: nowrap;
    background: #f2f2f2;
    box-shadow: 1px 1px 1px red
}

.c_tab_ul li {
    display: inline-block;
    padding: 10px 20px;
    width: 50%;
    text-align: center;
}

.c_tab_ul li:active {
    background: #eee
}

.c_tab_ul_line {
    height: 2px;
    width: 38%;
    background: black;
    margin-top: 2px;
    margin-right: auto;
    margin-left: auto;
}

.li_act {
    color: orange;
}
</style>