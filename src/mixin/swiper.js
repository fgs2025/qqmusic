export const swiper = {
    data() {
        return {
            itemlist: [], //渲染的轮播图列表
            start_itemlist: [], //初始获取到的列表
            translateX: 100, //轮播图步长
            i: 0, //轮播图第几个
            nextBtn: true, //下一张按钮
            prevBtn: true, //上一张按钮
            swipeTtransform: true, //轮播图动画

        }
    },
    methods: {
        initSwiper() {
            //二维数组转换
            this.itemlist = [];
            for (let i = 0; i < this.start_itemlist.length / this.size; i++) {
                this.itemlist.push(
                    this.start_itemlist.slice(i * this.size, i * this.size + this.size)
                );
            }
            this.itemlist.push(this.itemlist[0]);
        },
        next() {
            //下一张点击方法
            if (this.nextBtn) {
                this.nextBtn = false;
                if (this.i >= this.length) {
                    this.swipeTtransform = false;
                    this.i = 0;
                    setTimeout(() => {
                        this.swipeTtransform = true;
                        this.i++;
                    });
                } else {
                    this.i++;
                }
                setTimeout(() => {
                    this.nextBtn = true;
                }, 500);
            }

        },
        prev() {
            //上一张点击方法
            if (this.prevBtn) {
                this.prevBtn = false;
                if (this.i == 0) {
                    this.swipeTtransform = false;
                    this.i = this.length;
                    setTimeout(() => {
                        this.swipeTtransform = true;
                        this.i--;
                    });
                } else {
                    this.i--;
                }
                setTimeout(() => {
                    this.prevBtn = true;
                }, 500);
            }
        },
        pagingClick(ind) {
            //指示点点击事件
            this.i = ind;
        },
    }
}