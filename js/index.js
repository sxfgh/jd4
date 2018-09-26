window.addEventListener('load', function() {
    var jd = new JD();
    jd.searchGradient();
    jd.downTime();
    jd.slide();
});

// 创建一个JD构造函数 
var JD = function() {

};
// 把函数封装到对象里面是为了解决多个函数的时候全局变量污染
// 函数放到原型对象上是为了给很多带参数的函数 需要共同的参数的时候减少参数的传递  
// 只需要给构造函数传参 后面原型对象上的函数就能够获取到构造函数里面的参数
// prototype 在JS里面是可以继承 继承给所有使用构造函数创建出来的对象

// 给JD构造函数的原型对象添加方法  京东需要用到方法
JD.prototype = {
    // 每个方法实现了某个功能
    //顶部搜索框渐变功能
    searchGradient: function() {

        // 1. 给滚动条添加滚动事件
        window.addEventListener('scroll', scrollTopFun);
        // 页面加载或者刷新的时候也去调用计算透明度的代码
        scrollTopFun();

        function scrollTopFun() {
            // 2. 获取滚动条滚动的距离
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            // 3. 获取轮播图的高度
            var slideHeight = document.querySelector('#slide').offsetHeight;
            var opacity = 0;
            // 4. 判断当前滚动的距离是否小于轮播图的高度
            if (scrollTop < slideHeight) {
                // 5. 计算透明度 滚动距离/轮播图高度 * 1
                opacity = scrollTop / slideHeight * 1;
            } else {
                //6. 滚动的距离大于轮播图高度 默认为1
                opacity = 1;
            }
            // 7. 设置顶部搜索框的样式
            document.querySelector('#header').style.backgroundColor = 'rgba(222, 24, 27,' + opacity + ')';
        }
    },
    //实现倒计时功能
    downTime: function() {
        // new Date如果传参表示获取指定时间  年 月 日 时 分 秒    注意月0-11月 0-6
        //1. 获取今天中午12点的毫秒数 
        var futureTime = new Date(2018, 7, 30, 12, 0, 0).getTime();
        //2. 当前时间的毫秒数
        var nowTime = new Date().getTime();
        //3. 使用(未来时间-当前时间) /1000求得秒数
        var time = (futureTime - nowTime) / 1000;
        var spans = document.querySelectorAll('.seckill-time span');
        // 4. 定义一个定时器 每秒执行一次
        var timeId = setInterval(function() {
            // 5. 总时间每次--
            time--;
            if (time <= 0) {
                time = 0;
                //判断如果倒计时已经到了0或者以下就清除定时器
                clearInterval(timeId);
            }
            // 6. 计算总时间的时分秒
            var hour = Math.floor(time / 3600) % 24;
            var minute = Math.floor(time / 60) % 60;
            var second = time % 60;
            // 7. 获取页面所有的span设置到span时分秒的十位个位
            spans[0].innerHTML = Math.floor(hour / 10);
            spans[1].innerHTML = Math.floor(hour % 10);
            spans[3].innerHTML = Math.floor(minute / 10);
            spans[4].innerHTML = Math.floor(minute % 10);
            spans[6].innerHTML = Math.floor(second / 10);
            spans[7].innerHTML = Math.floor(second % 10);
        }, 1000);
    },
    //实现轮播图的功能
    slide: function() {
        //初始化轮播图
        var mySwiper = new Swiper('.swiper-container', {
            //自动轮播图的参数
            autoplay: {
                //自动轮播图的间隔时间
                delay: 1000,
                //在手指滑动后是否要再次开启自动轮播图
                disableOnInteraction: false,
            },
            //无缝轮播图参数
            loop: true,
            //初始化小圆点 注意页面需要有这个容器
            pagination: {
                el: '.swiper-pagination',
            },
            //添加轮播图效果
            // effect: 'cube',
            // grabCursor: true,
            // cubeEffect: {
            //     shadow: true,
            //     slideShadows: true,
            //     shadowOffset: 20,
            //     shadowScale: 1,
            // },

        });
    }
}
