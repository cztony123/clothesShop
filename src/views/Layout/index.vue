<template>
    <div class="home-page">
        <el-button type="primary" @click="getList">主要按钮</el-button>
    </div>
</template>

<script>
import { addUser } from '../../api/loginApi'
export default {
    data () {
        return {
            
        }
    },
    created(){
        // this.getList()
    },
    methods: {

        getList(){
            let params = {
                userName: '張三',
                password: '123456',
                tel: '18845678888'
            }
            addUser(params).then(res =>{
                console.log(res)
            })
        }
    }
}
</script>

<style scoped lang="scss">
    
</style>