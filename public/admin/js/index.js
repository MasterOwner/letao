$(function(){

    var totalpage = 0;
    var page = 1;

    queryuser();
    updateuser();

   

    //查询用户函数
    function queryuser(){

        $.ajax({
            url:'/user/queryUser',
            data:{page:page,pageSize:4},
            success:function(data){
                // console.log(data);
                //调用模板渲染到tbody上面
                var html = template('usertpl',data);
                $('tbody').html(html);
                //获取总页数
                totalpage = Math.ceil(data.total/data.size);
                initpage();
            }
        })
    }

    //更新用户信息函数
    function updateuser(){
        //点击启用/禁用
        $('tbody').on('click','.btn-option',function(){
            //获取当前用户的isdelete的状态
            var isDelete = $(this).data('isdelete');
            var id = $(this).data('id');
            isDelete = isDelete == 1?0:1;
            $.ajax({
                url:'/user/updateUser',
                data:{isDelete:isDelete,id:id},
                type:'post',
                success:function(data){
                    // console.log(data);
                    if(data.success){
                        queryuser();
                    }
                    
                }
            })
        })
    }

    //分页功能函数
    // function initpage(){
    //     //获取总页数=总条数/每页大小,向上取整
    //     //生成模板渲染页面
    //    var pages = [];
    //    for(var i=1;i<=totalpage;i++){
    //        pages.push(i);
    //    };
    //    //渲染到模板上
    //    var html = template('pagestpl',{pages:pages,page:page});
    //    $('.pagination').html(html);

    //    //点击第几页跳转到相应的页面
    //    $('.pagination li').on('click',function(){
    //      //获取当前的页码
    //      page = $(this).data('page');
    //      queryuser();
    //    })
    // }

    //分页插件的使用
    function initpage(){
        $('.pagination').bootstrapPaginator({
            bootstrapMajorVersion: 3, //对应bootstrap版本
            currentPage: page, //当前页
            numberOfPages: 4, //显示的页数
            totalPages: totalpage, // 总页数
            shouldShowPage: true, //是否显示该按钮
            useBootstrapTooltip: true,
           
            onPageClicked: function (event, originalEvent, type, nowpage) {
                page = nowpage;
                queryuser();
            }
        })
    }

})