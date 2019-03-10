$(function () {

    login();

    //点击登录
    function login() {
        $('.btn-login').on('click', function () {
            var username = $('.username').val().trim();
            var password = $('.password').val().trim();
            if (username == "" || password == "") {
               alert('用户名或密码不能为空');
                return false;
            }
            $.ajax({
                url: '/employee/employeeLogin',
                type: 'post',
                data: {
                    username: username,
                    password: password
                },
                success: function (obj) {
                    console.log(obj);
                    if (obj.error) {
                       alert('用户名或密码错误')
                    } else {
                        location = 'index.html';

                    }

                }
            })
        })
    }

})