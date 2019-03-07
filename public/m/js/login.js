$(function () {

    login();



    //点击登录函数
    function login() {

        $('.btn-login').on('tap', function () {
            var username = $('.username').val().trim();
            var password = $('.password').val().trim();
            if (username == "" || password == "") {
                mui.toast('请输入用户名或密码', {
                    duration: 'long',
                    type: 'div'
                });
                return false;
            }
            $.ajax({
                url: '/user/login',
                type: 'post',
                data: {
                    username: username,
                    password: password
                },
                success: function (obj) {
                    console.log(obj);
                    if (obj.error) {
                        mui.toast(obj.message, {
                            duration: 'long',
                            type: 'div'
                        });
                    } else {
                        location = queryUrl('returnurl');
                        
                    }

                }
            })

        })
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