$(function(){
    
    queryUserMessage();

    exit();


    //获取用户名函数
    function queryUserMessage(){
        //发请求,获取的数据渲染
        $.ajax({
            url:'/user/queryUserMessage',
            success:function(obj){
                // console.log(obj);
                if(obj.error){
                    location = 'login.html?returnurl='+location.href;
                }else{
                    $('.username').html(obj.username);
                    $('.mobile').html(obj.mobile);
                }
            }
        })
    }

    //点击退出函数
    function exit(){
        $('.btn-exit').on('tap',function(){
            $.ajax({
                url:'/user/logout',
                success:function(obj){
                    // console.log(obj);
                    if(obj.success){
                        location ='login.html?returnurl='+location.href;
                    }
                }
            })
        })
    }


})