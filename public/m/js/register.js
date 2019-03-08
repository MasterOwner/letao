$(function(){

    register();
    getvcode();

    //声明一个全局变量记录验证码
    var vCode;

    //点击注册函数
    function register(){
        $('.btn-register').on('tap',function(){
            //获取input里面的内容,遍历查看非空
            var inputs = $('.mui-input-row input');
            //假设全部输入
            var ischecked = true;
            inputs.each(function(){
                if(this.value.trim() ==""){
                    mui.toast(this.placeholder,{ duration:'long', type:'div' });
                    ischecked = false;
                    return false;
                }
            });
            if(ischecked){
                //判断输入是否合法,然后发送请求
                var mobile = $('.mobile').val().trim();
                if(!(/^1[3456789]\d{9}$/.test(mobile))){
                    mui.toast('手机号格式有误',{ duration:'long', type:'div' });
                }
                var username = $('.username').val().trim();
                if(!/^[a-zA-Z0-9_-]{6,16}$/.test(username)){
                    mui.toast('用户名输入有误',{ duration:'long', type:'div' });
                }
                var password1 = $('.password1').val().trim();
                var password2 = $('.password2').val().trim();
                if(password1 != password2){
                    mui.toast('两次密码输入不一致',{ duration:'long', type:'div' });
                }
                var vcode = $('.vcode').val().trim();
                if(vCode != vcode){
                    mui.toast('验证码输入有误',{ duration:'long', type:'div' });
                }
                //发送请求
                $.ajax({
                    url:'/user/register',
                    type:'post',
                    data:{mobile:mobile,username:username,password:password1,vCode:vCode},
                    success:function(obj){
                        console.log(obj);
                        if(obj.error){
                            mui.toast(obj.message,{ duration:'long', type:'div' });  
                        }else{
                            location = 'login.html?returnurl=user.html';
                        }
                    }
                })
            }

        })
    }

    //获取验证码的函数
    function getvcode(){
        $('.btn-vcode').on('tap',function(){
            $.ajax({
                url:'/user/vCode',
                success:function(obj){
                    console.log(obj);
                    
                    vCode = obj.vCode;
                }
            })
        })
        
    }



})