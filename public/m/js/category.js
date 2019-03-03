$(function () {
    //左边分类
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/category/queryTopCategory',
        success: function (data) {
            console.log(data);
            var html = template('categoryLeft', {list: data.rows});

            $('#main .left ul').html(html);
        }

    })
    //默认自执行一次
    category(1);

    //左边添加li的点击事件,但是li是渲染的,所以要用事件委托
    $('#main .left ul').on('tap', 'li', function () {
     $(this).addClass('active').siblings().removeClass('active');
        //  console.log(this.dataset['id']);这种是h5属性,不能转类型,建设用下面
        // 这种是zepto里面可以转类型
       var id = $(this).data('id');
        //右边分类
        category(id);


    })
      //封装ajax函数
    function category(id){
        $.ajax({
            type: 'get',
            dataType: 'json',
            data:{id:id},
            url: '/category/querySecondCategory',
            success: function (data) {
                console.log(data);
                var html = template('categoryRight',data);
                $('#main .right .mui-row').html(html);
            }

        })
    }
    //初始化滚动插件
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


})