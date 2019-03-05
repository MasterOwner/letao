$(function () {
    productlist();
    searchproduct();
    sortproduct();
    pullrefresh();

    var params;

    //获取商品列表函数
    function productlist() {
        params = queryUrl('search');
        //发送请求,获取数据,使用模板,渲染页面
        $.ajax({
            url: '/product/queryProduct',
            data: {
                proName: params,
                page: 1,
                pageSize: 4
            },
            success: function (obj) {
                console.log(obj.data);
                var html = template('productTpl', {
                    list: obj.data
                });
                $('.mui-card-content .mui-row').html(html);

            }
        })
    }
    //搜索页面搜索获取商品列表
    function searchproduct() {
        //点击搜索
        $('.btn-search').on('tap', function () {
            //获取搜索内容
            var search = $('.input-search').val().trim();
            // console.log(search);
            //判断搜索内容是否为空
            if (search == "") {
                //提示
                mui.toast('请输入搜索内容', {
                    duration: 'long',
                    type: 'div'
                });
                return false;
            }
            //判断原来是否有搜索内容
            var searchContent = localStorage.getItem('searchContent');
            //判断
            if (searchContent) {
                searchContent = JSON.parse(searchContent);
            } else {
                searchContent = [];
            }
            console.log(searchContent);

            //遍历删除重复的
            for (var i = 0; i < searchContent.length; i++) {
                //判断当前数组的中每个值的key是否和当前输入search一致
                if (searchContent[i].key == search) {
                    //删除重复的,索引和个数
                    searchContent.splice(i, 1);
                    i--;
                }
            };
            //删除之前的,添加新的
            searchContent.unshift({
                key: search,
                time: new Date().getTime()
            })
            //添加到本地
            localStorage.setItem('searchContent', JSON.stringify(searchContent));

            //清空搜索内容
            $('.input-search').val("");

            //跳转到商品页面
            location = 'product.html?search=' + search + '&time=' + new Date().getTime();

        })
    }
    //商品排序函数
    function sortproduct() {
        $('#main .mui-card-header a').on('tap', function () {

            $(this).addClass('active').siblings().removeClass('active');
            var sort = $(this).data('sort');
            if (sort == 2) {
                sort = 1;
                $(this).children('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                sort = 2;
                $(this).children('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
            //重新给自定义属性设置数值
            $(this).data('sort', sort);

            //传入排序类型和顺序请求数据渲染到页面
            //获取当前的排序类型
            var type = $(this).data('type');
            var obj = {
                proName: params,
                page: 1,
                pageSize: 4
            }
            //动态给对象添加属性
            obj[type] = sort;
            //请求数据
            $.ajax({
                url: '/product/queryProduct',
                data: obj,
                success: function (obj) {
                    console.log(obj.data);
                    var html = template('productTpl', {
                        list: obj.data
                    });
                    $('.mui-card-content .mui-row').html(html);

                }
            })
        })

    }
    //下拉刷新和上拉加载数据的函数
    function pullrefresh() {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    callback: pulldownRefresh
                },
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });

        //下拉刷新数据
        function pulldownRefresh() {
            setTimeout(function () {
                productlist();
                //结束转圈圈
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            }, 1000);
        }
        //上拉加载数据
        var page = 1;

        function pullupRefresh() {
            setTimeout(function () {
                $.ajax({
                    url: '/product/queryProduct',
                    data: {
                        page: ++page,
                        pageSize: 4
                    },
                    success: function (obj) {
                        if (obj.data.length > 0) {
                            var html = template('productTpl', {
                                list: obj.data
                            });
                            $('.mui-card-content .mui-row').append(html);
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                        } else {
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                        }

                    }

                }, 1000);
            })

        }

    }



    //获取url的参数
    // var params = location.search.substr(1);
    // var content = params.split('&');

    // for(var i=0;i<content.length;i++){
    //    var name = content[i].split('=')[0];
    //    var value = content[i].split('=')[1];
    //    if(name == 'search'){
    //        console.log(decodeURI(value));

    //    }
    // };
    function queryUrl(name) {
        var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
        var arr = location.search.match(reg);
        if (arr != null) {
            return decodeURI(arr[0].substring(arr[0].search("=") + 1));
        }
        return "";
    }

})