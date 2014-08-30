var $ = function(id){
        return document.getElementById(id);
    }

var index = {
    start : 1388505721,
    init : function(){
        this.animateTime();
        
    },
    animateTime : function(){
        var now,leftTime ,old = this.start;
        old *= 1000;
        //console.log(old);
        setInterval(function(){
            now = Date.parse(new Date());
            leftTime = now-old;
            leftTime = parseInt(leftTime/1000);
            var hour=Math.floor((leftTime/3600))+"";
            var minute=Math.floor((leftTime-hour*3600)/60)+"";
            var second=Math.floor(leftTime-hour*3600-minute*60)+"";
            $("timer").innerHTML = ""+hour+":"+minute+":"+second;
        },1000);
    },

}


var login = {

}
