
$(function(){
    var totalpage = 0;
    var page = 1;
   

    querySecondCategory();
    addbrand();
   

    //查询二级分类函数
    function querySecondCategory(){

        $.ajax({
            url:'/category/querySecondCategoryPaging',
            data:{page:page,pageSize:4},
            success:function(data){
                // console.log(data);
                //调用模板渲染到tbody上面
                var html = template('secondcategorytpl',data);
                $('tbody').html(html);
                //获取总页数
                totalpage = Math.ceil(data.total/data.size);
                initpage();
            }
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

    //分页插件的使用,可以不需要模板
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
                querySecondCategory();
            }
        })
    }

    //添加品牌函数
    function addbrand(){
        //点击添加品牌
        $('.add-brand').on('click',function(){
            $.ajax({
                url:'/category/queryTopCategory',
                success:function(data){
                    // console.log(data);
                    var html = '';
                    for(var i=0;i<data.rows.length;i++){
                    html += "<option value="+ data.rows[i].id+">"+data.rows[i].categoryName+"</option>";
                    };
                    $('.select-add').html(html);
                    
                }
            })
            
        })
        var file = null;
        //点击图片值改变事件
        $('.add-input').on('change',function(){
            // console.dir(this.files[0]);
            file = this.files[0];
            if(file.length<=0){
                return false;
            }
            //创建临时路径
            var url = URL.createObjectURL(file);
            //设置给预览图片
            $('.prev').attr('src',url);
            
        })
        //点击添加品牌
        $('.btn-add').on('click',function(){
            //获取品牌分类,id等
            var brandName =$('.brandName').val().trim();
            var categoryId = $('.select-add').val();
            if(file == null){
                return false;
            }
            //创建一个formData
            var formData = new FormData();
            formData.append('pic1',file);
            //点击添加图片
            $.ajax({
                url:'/category/addSecondCategoryPic',
                type:'post',
                data:formData,
                processData:false,
                contentType:false,
                cache:false,
                success:function(data){
                    // console.log(data);
                    if(data.picAddr){
                        //获取图片的真实路径
                        var brandLogo = data.picAddr;
                        //调用上传api
                        $.ajax({
                            url:'/category/addSecondCategory',
                            type:'post',
                            data:{
                                brandName:brandName,
                                categoryId:categoryId,
                                brandLogo:brandLogo,
                                hot:1
                            },
                            success:function(data){
                                console.log(data);
                                if(data.success){
                                    querySecondCategory();
                                }
                            }
                        })
                    }
                    
                }
            })
        })
    }
})