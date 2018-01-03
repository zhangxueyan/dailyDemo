  $(function(){
    var $nav = $(".nav-list");
    var $li = $nav.find("li");
    $li.mouseenter(function(){
      var $item = $(this);
      var $slideDown = $item.find(".slideDown")
      $slideDown.slideDown();
    }).mouseleave(function(){
      var $item = $(this);
      var $slideDown = $item.find(".slideDown")
      $slideDown.slideUp();
    })
    /*
    * 代码执行到这里后会调用setTitle()函数
    * setTitle()：设置title的值
    */
    function showSuspend(){
      var t = setTimeout(function(){
        $suspend.show()
      },10000)
    }
    var $close= $(".suspend-close") 
    $close.click(function(){
      var $item = $(this);
      $item.parent(".suspend").hide()
    })
    //banner轮播效果
    var mySwiper1 = new Swiper ('.swiper-container1', {
       loop: true,
       pagination: '.swiper-pagination',
       paginationClickable :true,
       autoplay:2500
    })
    $(".swiper-container1").mouseenter(function(){
      mySwiper1.stopAutoplay()
    }).mouseleave(function(){
      mySwiper1.startAutoplay()
    })
    // 倒计时效果
    var $month = $(".month");
    var $date = $(".date");
    var myDate = new Date();//月日年
    var date = myDate.getDate();//几号
    var day = myDate.getDay();//周几 如果是周7  date+7
      if(day == 0){
        myDate.setDate(date+3);   
      }else if(day == 1){
        myDate.setDate(date+2);
      }else if(day == 2){
        myDate.setDate(date+1);
      }else if(day == 3){
        myDate.setDate(date+2);
      }else if(day == 4){
        myDate.setDate(date+1);
      }else if(day == 5){
        myDate.setDate(date+2);
      }else if(day == 6){
        myDate.setDate(date+1);
      }
      $month.text(myDate.getMonth()+1);
      $date.text(myDate.getDate());
      //底部bot-fixed month
      var $botMonth = $(".bot-month");
      if(date>27){
        $botMonth.text(myDate.getMonth()+2);
      }
      else{
        $botMonth.text(myDate.getMonth()+1);
      }
      //s6 part
      $(".s6-li").mouseenter(function(){
        var $item = $(this);
        $item.addClass("activet")
        $item.removeClass("activeb")
      }).mouseleave(function(){
        var $item = $(this);
        $item.removeClass("activet")
        $item.addClass("activeb")
      })

  })


