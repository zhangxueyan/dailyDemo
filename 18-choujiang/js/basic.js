//沙箱模式  防止污染外部变量
; (function (window) {
    //定义一个对象 假如这个对象已存在与window下,那么我们就可以直接使用
    var Cloud = window.Cloud || {};
    console.log(Cloud)
    //在这个对象上定义属性,而这个属性是一个对象
    Cloud.PageString = {
        StringCut: function (value,maxLength,sign) {
            if (value.length <= maxLength){
                return value;
            }
            else{
                return value.substr(0, maxLength) + sign;
            }
        },
        StringSplit: function (value,sign) {
            return value.split(sign);
        }      
    };
    //使外部只有Cloud可以被访问
    window.Cloud = Cloud;
})(window);