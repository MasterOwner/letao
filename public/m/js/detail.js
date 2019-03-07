$(function () {

    detail();
    cart();

    function detail() {
        //获取id
        var id = queryUrl('id');
        //请求数据
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id
            },
            success: function (obj) {
                //尺寸
                var arr = obj.size.split('-');
                var size = [];
                for (var i = +arr[0]; i <= arr[1] - 0; i++) {
                    size.push(i);
                };
                obj.size = size;
                console.log(obj);
                //调用模板
                var html = template('detailtpl', obj);
                $('#detaillist').html(html);
                //初始化轮播图
                initslider();
                //初始化数量
                mui('.mui-numbox').numbox();
                //区域滚动初始化
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
                //点击切换选中的尺寸
                $('#detail .btn-size button').on('tap', function () {
                    $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');

                })

            }
        })
    }

    //点击购物车函数
    function cart() {

        //点击购物车
        $('.btn-addcart').on('tap', function () {
            //获取产品的id,尺码和数量
            var productId = queryUrl('id');
            var size = $('.mui-btn.mui-btn-warning').data('size');
            var num = mui('.mui-numbox').numbox().getValue();
            //发送请求
            $.ajax({
                url:'/cart/addCart',
                type:'post',
                data:{productId:productId,size:size,num:num},
                success:function(obj){
                    if(obj.error){
                        location = 'login.html?returnurl='+location.href;
                    }else{
                        mui.confirm( '<h4>加入成功,是否去购物车查看</h4>', '<h3>温馨提示</h3>', ['yes','no'], function(e){
                            // console.log(e);
                            if(e.index == 1){
                                mui.toast('请继续添加商品',{ duration:'long', type:'div' });
                            }else{
                                location = 'cart.html';
                            }
                            
                        });
                    }
                    
                }
            })
            
            
            
        })
    }




    //初始化轮播图
    function initslider() {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    }

    //获取url参数
    function queryUrl(name) {
        var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
        var arr = location.search.match(reg);
        if (arr != null) {
            return decodeURI(arr[0].substring(arr[0].search("=") + 1));
        }
        return "";
    }



})