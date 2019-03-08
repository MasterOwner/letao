$(function () {

    querycart();
    deletecart();
    updatecart();
    


    //获取查询购物车函数
    function querycart() {
        $.ajax({
            url: '/cart/queryCart',
            success: function (obj) {
                // console.log(obj);
                //判断是否登录
                if (obj.error) {
                    location = 'login.html?returnurl=' + location.href;
                } else {
                    var html = template('carttpl', {list: obj});
                    $('.cart-list').html(html);
                    initscroll();
                    //渲染完计算总金额
                    getcount();
                    //复选框的值改变重新计算总金额
                    $('.mui-checkbox input').on('change',function(){
                        getcount();
                    })
                }
            }
        })
    }
    //点击删除按钮
    function deletecart(){
      $('.cart-list').on('tap','.cart-delete',function(){
        var li = this.parentNode.parentNode;
        var id = $(this).data('id');
        mui.confirm( '<h4>确定删除吗?</h4>', '<h3>温馨提示</h3>', ['yes','no'], function(e){
            if(e.index == 1){
                setTimeout(function() {
                    mui.swipeoutClose(li);
                }, 0);
            }else{
               $.ajax({
                   url:'/cart/deleteCart',
                   data:{id:id},
                   success:function(obj){
                    //    console.log(obj);
                       if(obj.success){
                        mui.toast('删除成功',{ duration:'long', type:'div' });
                        querycart();
                       }else{
                        location = 'login.html?returnurl=' + location.href;
                       }
                   }
               })
            }
        })
      })
    }

    //点击编辑按钮
    function updatecart(){
        $('.cart-list').on('tap','.cart-update',function(){
            //获取绑定的属性对象
            var product = $(this).data('product');
            // console.log(product);
            
            //转尺码为数组
            var arr = product.productSize.split('-');
            var productSize = [];
            for (var i = +arr[0]; i <= arr[1] - 0; i++) {
                productSize.push(i);
            };
            product.productSize = productSize;
            //编辑模板
            var html = template('updatetpl',product);
            //去除空格换行
            html = html.replace(/[\r\n]/g,'');
            //获取相应的id,size,num
            var li = this.parentNode.parentNode;
            //点击弹出确认框
            mui.confirm( html, '<h3>温馨提示</h3>', ['确定','取消'], function(e){
                if(e.index == 1){
                    setTimeout(function() {
                        mui.swipeoutClose(li);
                    }, 0);
                }else{
                    var size = $('.mui-btn.mui-btn-warning').data('size');
                    var num = mui('.mui-numbox').numbox().getValue();
                   $.ajax({
                       url:'/cart/updateCart',
                       type:'post',
                       data:{id:product.id,size:size,num:num},
                       success:function(obj){
                        //    console.log(obj);
                           if(obj.success){
                            mui.toast('编辑成功',{ duration:'long', type:'div' });
                            querycart();
                           }else{
                            location = 'login.html?returnurl=' + location.href;
                           }
                       }
                   })
                }
            });
            //初始化数字框
             mui('.mui-numbox').numbox();
             //点击切换选中的尺寸
             $('.mui-table-view button').on('tap', function () {
                 $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
             })
            
        })
    }



   //初始化购物车区域滚动
    function initscroll() {
        mui('.mui-scroll-wrapper').scroll({
            indicators: false, //是否显示滚动条
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }

  //获取总金额的函数
  function getcount(){
     var checkeds = $('.mui-checkbox input:checked');
     //遍历所有的选中的复选框
     var count = 0;
     checkeds.each(function(index,e){
        var price = $(this).data('price');
        var num = $(this).data('num');
        var single = price*num;
        count += single;
     })
     //保留2位小数
     count = count.toFixed(2);
     $('.order-total span').html(count);
    
  }
})