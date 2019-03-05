$(function () {

    //调用函数
    addSearch()
    querySearch()
    deleteSearch()
    clearSearch()







    //添加记录函数
    function addSearch() {
        //思路
        //1:点击搜索事件(以后的zepto中事件都用tap)
        //2:获取搜索的内容
        //3:判断搜索内容是否为空,提示输入,以及去掉前后空格
        //4:记录到本地存储中
        //5:因为要连续存储,所以先放在一个数组中
        //6:获取之前的数组添加数据
        //7:如果之前的数组里存在重复的内容就删除旧的,添加新的
        //8:加完再保存在本地存贮中(转json数据)

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
            querySearch();
            //清空搜索内容
            $('.input-search').val("");

            //跳转到商品页面
            location = 'product.html?search='+search+'&time='+new Date().getTime();

        })
    }

    //查询记录函数
    function querySearch() {
        //获取查询的数据
        var searchContent = localStorage.getItem('searchContent');
        //判断
        if (searchContent) {
            searchContent = JSON.parse(searchContent);
        } else {
            searchContent = [];
        }
        //创建模板
        //调用模板渲染到ul里面
        var html = template('searchContenttpl', {
            list: searchContent
        });
        $('.mui-card-content ul').html(html);

    }

    //删除记录函数
    function deleteSearch() {

        $('.searchdelete ul').on('tap','span',function () {
            var idx = $(this).data('index');
            console.log(idx);
            var searchContent = JSON.parse(localStorage.getItem('searchContent'));
            searchContent.splice(idx,1);
            localStorage.setItem('searchContent',JSON.stringify(searchContent));
            querySearch();

        })
    }
    //清空记录函数
    function clearSearch() {
        $('.btn-clear').on('tap',function(){
            localStorage.removeItem('searchContent');
            querySearch();
        })

    }


    //历史搜索初始化滚动插件
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


})