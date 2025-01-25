<template>
    <div class="layout-page">
        <!-- 头部 -->
        <div class="header-page">
            <div class="logo">衣聚</div>
            <div class="query">
                <input type="text" placeholder="找到你想要的商品">
                <svg-icon class="magnifier" icon-file-name="magnifier-svgrepo-com" />
            </div>
            <div class="icon">
                <svg-icon class="scan" icon-file-name="scan-barcode-svgrepo-com" />
                <svg-icon class="scan" icon-file-name="bell-svgrepo-com" />
            </div>
        </div>

        <!-- 主体 -->
        <div class="main-page">
            <router-view></router-view>
        </div>

        <!-- 导航栏 -->
        <div class="navbar-page">
            <router-link v-for="(item, index) in navItems" :key="index" :to="item.path" class="nav-item" :class="{ active: isActive(item.path) }">
                <svg-icon class="icon" :icon-file-name="item.icon" />
                <span>{{ item.label }}</span>
            </router-link>
        </div>

    </div>
</template>

<script>
import AppMain from "@/components/AppMain/index.vue"
export default {
    components: {
        AppMain,
    },
    data() {
        return {
            navItems: [
                { label: '首页', path: '/Home', icon: 'home-4-svgrepo-com' },
                { label: '分类', path: '/Classify', icon: 'menu-svgrepo-com' },
                { label: '购物车', path: '/Cart', icon: 'cart-svgrepo-com' },
                { label: '我的', path: '/My', icon: 'user2-svgrepo-com' },
            ],
        }
    },
    created() {
        // switch(this.$route.path){
        //     case '/search':
        //         this.active = 1;
        //         break;
        //     case '/setting':
        //         this.active = 2;
        //         break;
        //     case '/user':
        //         this.active = 3;
        //         break;
        //     case '/editUser':
        //         this.active = 3;
        //         break;
        //     default:
        // }
    },
    methods: {
        isActive(path) {
            return this.$route.path === path;
        },
    },
};
</script>

<style scoped lang="scss">
.layout-page {
    width: 100%;
    height: 100vh;
}

// 头部盒子
.header-page {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 3.75rem;
    border-bottom: 2px solid #ccc;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

// logo
.logo {
    font-size: 1.875rem;
    color: #eb8a8a;
    text-shadow: 3px 3px 4px #252525; /* 添加阴影 */
}

//查询
.query {
    position: relative;
    //输入框
    input {
        width: 100%;
        height: 1.875rem;
        border: 2px solid rgba(0, 123, 255, 0.25);
        border-radius: 1.25rem;
        background: none;
        color: #fff;
    }
    // 选中输入框
    input:focus {
        outline: none;
    }
    // 输入框提示文案
    input::-webkit-input-placeholder {
        color: #fff;
        font-size: 0.875rem;
        padding-left: 0.625rem;
    }

    //放大镜图标
    .magnifier {
        position: absolute;
        top: 50%;
        right: 0.5rem;
        transform: translateY(-50%);
    }
}

// 图标
.icon {
    display: flex;
    align-items: center;
    .scan {
        padding: 0.375rem;
        font-size: 1.375rem;
    }
}

// 主体
.main-page{
    color: #fff;
    height: calc(100vh - 7.8125rem);
    overflow-y: auto;
}

// 底部导航
.navbar-page {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 3.75rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #ccc;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    // 每一项
    .nav-item {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: #333;
        text-decoration: none;
        .icon{
            font-size: 1.5625rem;
            stroke: "red"
        }
        
    }
    //激活状态颜色
    .nav-item.active {
        color: #fff; /* 激活状态颜色 */
    }
}

</style>