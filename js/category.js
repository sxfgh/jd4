window.addEventListener('load', function() {
    var jd = new JD();
    jd.categoryLeftSwiper();
    jd.categoryLeftClick();
    jd.categoryRightSwiper();
});

var JD = function() {

}

JD.prototype = {
    // 分类左侧的滑动效果
    categoryLeftSwiper: function() {
        //调用swiper的初始化方法
        var swiper = new Swiper('.category-left .swiper-container', {
            //垂直方向滑动
            direction: 'vertical',
            //支持多个子元素一起滑动
            slidesPerView: 'auto',
            // 一次性滑动多个子元素
            freeMode: true,
            //支持鼠标滚轮
            mousewheel: true
        });
    },
    //左侧分类的点击效果
    categoryLeftClick:function(){
        // 1. 给所有的li添加点击事件
        var slideUl = document.querySelector('.category-left .swiper-slide');       
        var lis = slideUl.children;
        // 如果所有的子元素的事件都是一样要做的事情也都一样就可以给他们的父元素添加 JS事件可以捕获
        // 虽然是给父元素添加的事件 最终捕获到的子元素
        slideUl.addEventListener('click', function(e){            
            //3. 给所有li删除active类名
            for (var i = 0; i < lis.length; i++) {
                lis[i].classList.remove('active');
                 // 2. 给所有的li添加一个索引
                 //index就是li的索引的属性
                lis[i].index = i;
            }
            //给当前点击的li添加active类名
            e.target.parentNode.classList.add('active');
            //4. 获取当前点击li的索引和高度
            var liHeight = e.target.parentNode.offsetHeight;
            var liIndex = e.target.parentNode.index;
            // 5. 计算当前要位移的距离 千万注意这个值后面使用的时候要带px单位
            var translateY = - liIndex * liHeight;
            //6. 计算最大位移的距离 父元素固定高度 -  子元素不固定的高度
            var maxTranslateY = document.querySelector('.category-left').offsetHeight - slideUl.offsetHeight;
            //7. 判断如果当前位移的距离小于了最大位移的距离 就设置为最大的位移距离
            if(translateY < maxTranslateY){
                translateY = maxTranslateY;
            }
            //8. 把位移距离设置到滑动的swiper-wrapper身上
            document.querySelector('.category-left .swiper-wrapper').style.transform = 'translate3d(0px, '+translateY+'px, 0px)';
            //9. 吸顶的时候添加过渡的效果
            document.querySelector('.category-left .swiper-wrapper').style.transition = 'all 0.3s';
        });
    },
    //分类右侧的滑动效果
    categoryRightSwiper: function() {
        //调用swiper的初始化方法
        var swiper = new Swiper('.category-right .swiper-container', {
            //垂直方向滑动
            direction: 'vertical',
            //支持多个子元素一起滑动
            slidesPerView: 'auto',
            // 一次性滑动多个子元素
            freeMode: true,
            //添加滚动条
	        scrollbar: {
	            el: '.swiper-scrollbar',
	        },
            //支持鼠标滚轮
            mousewheel: true
        });
    }
}
