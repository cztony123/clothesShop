<template>
    <div class="login-page">
        <!-- 登录 -->
        <div class="content" v-if="orLogin">
            <!-- 头像 -->
            <div class="avatar">
                <img src="../../../public/favicon.png" alt="">
            </div>

            <!-- 账号 -->
            <div class="account"  v-if="orPhone">
                <svg-icon class="icon" icon-file-name="avatar-user-svgrepo-com" />
                <input v-model="form.userName" type="text" placeholder="账号" />
            </div>

            <!-- 手机 -->
            <div class="phone" v-else>
                <svg-icon class="icon" icon-file-name="phone2-o-svgrepo-com" />
                <input v-model="form.tel" type="text" placeholder="手机号">
            </div>

            <!-- 密码 -->
            <div class="password">
                <svg-icon class="icon" icon-file-name="padlock-lock-svgrepo-com" />
                <input v-model="form.password" :type="showPwd ? 'text' : 'password'" placeholder="密码">
                <!-- 显密 -->
                <span @click="handleEye">
                    <svg-icon v-if="showPwd" class="Eye" icon-file-name="eye-open-svgrepo-com" />
                    <svg-icon v-else class="Eye" icon-file-name="eye-closed-svgrepo-com" />
                </span>
            </div>

            <!-- 登录按钮 -->
            <div class="login">
                <!-- 忘记密码 -->
                <div class="forget-pwd">
                    <button @click="handlePwd">{{orPhone ? '手机号登录' : '账号登录'}}</button>
                    <button>忘记密码 ?</button>
                </div>
                <!-- 登录按钮 -->
                <button class="login-btn" @click="handleLogin">登录</button>
            </div>

            <!-- 注册和登录切换 -->
            <div class="register">
                <button @click="handleRegister">没有账户? 注册</button>
            </div>
        </div>

        <!-- 注册 -->
        <div class="content" v-else>
            <!-- 头像 -->
            <div class="avatar">
                <img src="../../../public/favicon.png" alt="">
            </div>

            <!-- 账号 -->
            <div class="account">
                <svg-icon class="icon" icon-file-name="avatar-user-svgrepo-com" />
                <input v-model="form.userName" type="text" placeholder="账号" />
            </div>

            <!-- 手机 -->
            <div class="phone">
                <svg-icon class="icon" icon-file-name="phone2-o-svgrepo-com" />
                <input v-model="form.tel" type="text" placeholder="手机号">
            </div>

            <!-- 密码 -->
            <div class="password">
                <svg-icon class="icon" icon-file-name="padlock-lock-svgrepo-com" />
                <input v-model="form.password" type="password" placeholder="密码">
                <!-- 显密 -->
                <span @click="handleEye">
                    <svg-icon v-if="showPwd" class="Eye" icon-file-name="eye-open-svgrepo-com" />
                    <svg-icon v-else class="Eye" icon-file-name="eye-closed-svgrepo-com" />
                </span>
            </div>

            <!-- 确认密码 -->
            <div class="password">
                <svg-icon class="icon" icon-file-name="padlock-lock-svgrepo-com" />
                <input v-model="okPwd" type="password" placeholder="确认密码">
                <!-- 显密 -->
                <span @click="handleEye">
                    <svg-icon v-if="showPwd" class="Eye" icon-file-name="eye-open-svgrepo-com" />
                    <svg-icon v-else class="Eye" icon-file-name="eye-closed-svgrepo-com" />
                </span>
            </div>

            <!-- 验证码 -->
            <div class="V-Code">
                <svg-icon class="icon" icon-file-name="shield-check-svgrepo-com" />
                <input type="text" placeholder="验证码"><button>获取验证码</button>
            </div>

            <!-- 按钮 -->
            <div class="login">
                <button class="login-btn" @click="handleLogin">注册</button>
            </div>

            <!-- 注册 -->
            <div class="register" v-if="!orLogin">
                <button @click="handleRegister">已有账户? 登录</button>
            </div>
        </div>

        <!-- 校验框 -->
        <div class="verify" ref="verify">
            {{text}}
        </div>
    </div>
</template>

<script>
import { loginApi, addUser } from "@/api/loginApi";
import {mapMutations} from 'vuex'
export default {
    data () {
        return {
            orLogin: true, //判断登录或注册(true:显示登录页, false:显示注册页)
            orPhone: true, //判断手机号或密码登录(true:显示账号登录页，false:显示手机号登录页)
            showPwd: false,
            form: {
                userName: null, //用户名
                tel: null, //手机号
                password: null, //密码
            },
            okPwd: null, //确认密码
            text: null
        }
    },
    updated(){
        // console.log(this.orLogin)
        // console.log(this.orPhone)
    },
    methods: {
        ...mapMutations(['login']),

        //登录和注册按钮
        handleLogin(){
            if(this.orLogin){
                loginApi(this.form).then(res =>{
                    if(res.code == 200){
                        this.form = this.$options.data().form  //重置form
                        this.okPwd = null
                        this.login(res.data)
                        localStorage.setItem('userInfo', JSON.stringify(res.data)); //本地 存储用户信息
                        this.$router.push('Home');
                    }
                })
            }else{
                //校验用户名
                if(!this.form.userName){
                    this.handleDialog()
                    this.text = '请输入账号'
                    return 
                }
                //校验手机号
                if(!this.form.tel){
                    this.handleDialog()
                    this.text = '请输入手机号'
                    return 
                }
                //校验密码
                if(!this.form.password){
                    this.handleDialog()
                    this.text = '请输入密码'
                    return 
                }
                //校验两次密码是否一致
                if(this.form.password != this.okPwd){
                    this.handleDialog()
                    this.text = '两次密码不一致'
                    return 
                }
                addUser(this.form).then(res =>{
                    if(res.code == 200){
                        this.handleDialog()
                        this.text = res.message
                        this.form = this.$options.data().form  //重置form
                        this.okPwd = null
                        this.orLogin = true
                    }
                })
            }
        },
        //注册和登录切换
        handleRegister(){
            this.orLogin = !this.orLogin
        },

        //账号和手机号登录切换
        handlePwd(){
            this.orPhone = !this.orPhone
        },

        //显密
        handleEye(){
            this.showPwd = !this.showPwd
        },

        //提示框函数
        handleDialog(){
            this.$refs.verify.style.opacity = 1
            this.$refs.verify.style.visibility = 'visible' // 可见
            setTimeout(() => {
                this.$refs.verify.style.opacity = 0; // 设置不透明度为1
                this.$refs.verify.style.visibility = 'hidden' // 不可见
            }, 1500);
        }
    }
}
</script>

<style scoped lang="scss">
//内容盒子
.content{
    width: 65%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

// 头像
.avatar{
    margin-bottom: 2.5rem;
    width: 100%;
    border-radius: 50%;
    text-align: center;
    img{
        width: 50%;
        aspect-ratio: 1 / 1; /* 宽高比为1:1 */
        border-radius: 50%;
        text-align: center;
    }
}

// 账号/密码/手机
.account, .password, .phone{
    position: relative;
    margin-bottom: 1.25rem;
    text-align: center;
    // 输入框
    input{
        width: 100%;
        height: 2.5rem;
        border: none;
        border-radius: 1.25rem;
        background: #9edad0;
        text-align: center;
        color: #fff;
    }
    // 选中输入框
    input:focus {
        outline: none;
        border-color: #007bff; /* 选中时的边框颜色 */
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* 选中时的阴影 */
    }
    // 输入框提示文案
    input::-webkit-input-placeholder {
        color: #fff;
        font-size: 1.125rem;
        padding-left: 2.5rem;
        text-align: left;
    }
    // 图标
    .icon{
        position: absolute;
        top: 50%;
        left: 0.9375rem;
        transform: translateY(-50%);
        font-size: 1.25rem;
    }
    //眼睛
    span{
        position: absolute;
        top: 50%;
        right: 0.9375rem;
        transform: translateY(-50%);
        font-size: 1.25rem;
    }
}

// 验证码
.V-Code{
    position: relative;
    display:flex;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    text-align: center;
    // 输入框
    input{
        width: 60%;
        height: 2.5rem;
        border: none;
        border-radius: 1.25rem;
        background: #9edad0;
        text-align: center;
        color: #fff;
    }
    button{
        width: 35%;
        height: 2.5rem;
        border: none;
        border-radius: 0.625rem;
        background: #9edad0;
        color: #696969;
        text-align: center;
    }
    // 选中输入框
    input:focus {
        outline: none;
        border-color: #007bff; /* 选中时的边框颜色 */
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* 选中时的阴影 */
    }
    // 输入框提示文案
    input::-webkit-input-placeholder {
        color: #fff;
        font-size: 1.125rem;
        padding-left: 2.5rem;
        text-align: left;
    }
    // 图标
    .icon{
        position: absolute;
        top: 50%;
        left: 0.9375rem;
        transform: translateY(-50%);
        font-size: 1.25rem;
    }
}

//登录
.login{
    margin-top: 2.5rem;
    text-align: center;
    //忘记密码
    .forget-pwd{
        display:flex;
        justify-content: space-between;
        padding: 0 0.9375rem;
        button{
            background: none;
            border: none;
            color: #e6e6e6;
        }
    }
    .login-btn{
        margin-top: 0.625rem;
        background: #9edad0;
        width: 100%;
        height: 2.5rem;
        border: none;
        border-radius: 1.25rem;
        font-size: 1.25rem;
        color: #fff;
    }
}

//注册和登录切换
.register{
    margin-top: 2.5rem;
    padding: 0 0.9375rem;
    text-align: center;
    button{
        background: none;
        border: none;
        color: #e6e6e6;
    }
}

// 校验弹出框
.verify{
    position: absolute;
    background: rgba(103, 104, 104, 0.7);
    width: 50%;
    height: 2.5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 2.5rem;
    text-align: center;
    border-radius: 1.25rem;
    color: #d1d1d1;
    visibility: hidden; /* 初始不可见 */
    opacity: 0; //设置成透明
    transition: all 800ms;
}
</style>