<template>
    <carInspection :carData="carData"></carInspection>
</template>

<script>
    import carInspection from '../../components/car_inspection/car_inspection'
    import { IndexModel } from '../../model/index'
    const  indexModel = new IndexModel();
    export default {
        name: "car_add",
        components:{
            carInspection
        },
        data() {
            return{
                id: '',
                carData:{}
            }
        },
        methods: {
            annualReviewConfirmOrder() {
                indexModel.annualReviewConfirmOrder(this.id).then( res => {
                    this.carData = res.data
                } );
            }
        },
        onLoad(options) {
            this.id = options.car_id;
            console.log(this.id);
            this.annualReviewConfirmOrder();
        }
    }
</script>

<style scoped>

</style>