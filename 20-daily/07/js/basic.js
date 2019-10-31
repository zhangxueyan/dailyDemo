



$(function(){
  function gradeChange(){
    var sel = document.getElementById('changeStyle');
    var idx  = sel.selectedIndex;
    console.log(sel[idx])
  }

  
  var $login = $(".login");
  $("#changeStyle").change(function(){
     var selIdx = $("#changeStyle option:selected").index();
     var selVal = $("#changeStyle option:selected").text();
     console.log(selIdx)
     console.log(selVal)
     switch(selIdx) {
      case 0:
        $login.removeClass("active1 active2 active3")
        $login.addClass("active0")
        $(".layout-img").attr("src","images/layout_00.jpg");
       break;
      case 1:
        $login.removeClass("active0 active2 active3")
        $login.addClass("active1")
        $(".layout-img").attr("src","images/layout_01.jpg");
       break;
      case 2:
        $login.removeClass("active0 active1 active3")
        $login.addClass("active2")
        $(".layout-img").attr("src","images/layout_02.jpg");
       break;
      case 3:
        $login.removeClass("active0 active1 active2")
        $login.addClass("active3")
        $(".layout-img").attr("src","images/layout_03.jpg");
       break;
       default:
        $login.removeClass("active1 active2 active3")
        $login.addClass("active0")
        $(".layout-img").attr("src","images/layout_00.jpg");
     } 
  })


})


