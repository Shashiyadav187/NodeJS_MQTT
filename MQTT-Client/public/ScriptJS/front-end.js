
var colorText = ["red","purple","crimson","deeppink","orangered","yellow"];


$(document).ready(function(){
    
    $("#txtDataFromServer").val("");
    $(".main-menu").css("height",$(".body").height());
    
    $(".menu-item").mouseenter(function(){
        $(".menu-text").animate({
            "left":"0"
        },150);
    
        var c_index = Math.floor(Math.random() *(colorText.length-1) );
        $(this).find("span").css("color",colorText[c_index]);         
    });

    $(".menu-item").mouseleave(function(){
        $(".menu-text").animate({
            "left":"-120px"
        },150);
        $(this).find("span").css("color","white");
    });

    $(".menu-resp").click(function(){
        if($(".main-menu").css("left") == "-150px"){
            $(".main-menu").animate({
                "left" : "0"
            },300);
        }
        else
        {
            $(".main-menu").animate({
                "left" : "-150px"
            },300);
        }
    });
});