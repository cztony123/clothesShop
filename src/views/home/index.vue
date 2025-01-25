<template>
    <div class="home-page">
        <!-- 轮播图 -->
        <div class="swiper">
            <!-- 图片 -->
            <div class="content" ref="content">
                <div class="item" v-for="(item, index) in listUrl" :key="index">
                    <img :src="require(`@/assets/image/${item}`)" />
                </div>
            </div>

            <!-- 指示器 -->
            <div class="indicator" id="indicator">
                <span class="active"></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <!-- <button @click="btn">按钮</button> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            listUrl: [               
                "3329659485.jpg",
                "4700004012.jpg",
                "3329659485.jpg",
                "4700004012.jpg",
            ],
            playTimer: null,
            index: 0,
        };
    },
    mounted(){
        this.startPlay()
    },
    methods: {
        //开始轮播
        startPlay(){
            clearInterval(this.playTimer)
            this.playTimer = setInterval(() => {
                this.handleSwiper()
            }, 2000)
            let abc = document.querySelectorAll('.indicator span')
            console.log(abc)
        },
        
        handleSwiper(){
            this.index ++
            console.log(this.$refs.content)
            this.$refs.content.style.transform = `translateX(-${this.index * 100}%)` //每张图片滚走的距离
            this.$refs.content.style.transition = '0.5s' //动画效果
            if (this.index == this.listUrl.length - 1) {
                this.index = 0
            }
            

            // doms.carouselList.style.transform = `translateX(-${index * 100}%)` //每张图片滚走的距离
			// doms.carouselList.style.transition = '0.5s' //动画效果

			// // 去掉圆点点选中效果
			// let active = document.querySelector('.indicator span.active')
			// active.classList.remove('active')
			// // 添加选中效果
			// doms.indicator[index].classList.add('active')
			// currentIndex = index
        }
    },
};
</script>

<style lang="scss" scoped>
.home-page {
    width: 100%;
    height: 100%;
}

// 轮播图
.swiper {
    position: relative;
    width: 100%;
    height: 20%;
    box-sizing: border-box;
    // overflow: hidden;
    .content{
        display: flex;
        width: 100%;
        height: 100%;
        .item{
            flex: 0 0 100%;
            img{
                width: 100%;
                height: 100%;
            } 
        }
    }

    // 指示器
    .indicator{
        position: absolute;
        display: flex;
        top: 90%;
        left: 50%;
        transform: translateX(-50%);
        span{
            margin: 0.1875rem;
            width: 0.4375rem;
            height: 0.4375rem;
            border: 1px solid #fff;
            border-radius: 50%;
        }
        .active{
            background: #fff;
        }
    }
}
</style>