/**
 * Created by liuyunxiao on 16/5/23.
 */

var move ={

    //自动获取元素属性或属性值封装函数
    //参数1：元素；
    // 参数2：属性；
    // 参数3：属性值；
    css : function(obj,attr,val){
        if( arguments.length>=3){	//当传的参数的长度大于等于3的时候
            if(attr=='opacity'){	//如果属性是opacity时
                //则opacity等于val除以100；
                obj.style.opacity=val/100;
                //filter等于val
                obj.style.filter='alpha(opacity='+val+')';
            }else{
                obj.style[attr]=val+'px';//如果属性不是opacity时，则当前属性等于val加上'px'
            };
        }else{//当传的参数的长度小于3的时候,直接获取iVal等于当前获取的属性
            var iVal=obj.currentStyle?parseFloat(obj.currentStle[attr]):parseFloat(getComputedStyle(obj)[attr]);
            if(attr=='opacity'){//当属性是opacity时
                iVal*=100;//则iVal等于iVal乘以100；
            };
            return iVal;//然后返回得出的iVal
        };
    },


    //封装运动函数
    //参数1：对象；
    // 参数2：属性；
    // 参数3：速度；
    // 参数4：目标点；
    // 参数5：执行时间；
    // 参数6：回调函数；
    startMove : function(obj,attr,iSpeed,iTarget,ms,callBack){
        var iNow=tools.css(obj,attr);//声明iNow等于获取当前对象的属性值
        //如果当前的属性值大于目标值时，速度iSpeed是负值，否则就是正值
        iSpeed= iNow>iTarget ? -Math.abs(iSpeed):Math.abs(iSpeed);//Math.abs取绝对值
        clearInterval(obj.oTimer);//当每次执行下面的定时器前首先清除之前定时器
        obj.oTimer=setInterval(function(){
            var iNow=tools.css(obj,attr);//在定时器里重新声明iNow不断获取当前对象的属性值
            if(Math.abs(iTarget-iNow)<Math.abs(iSpeed)){//当目标值减当前属性值小于速度值iSpeed时
                clearInterval(obj.oTimer);	//则清除定时器
                obj.oTimer=0;//同时把定时器重置为0，以便其它的定时器执行
                //obj.style[attr]=iTarget+'px';
                tools.css(obj,attr,iTarget);	//然后当前对象属性值就等于目标值
                callBack&&callBack();	//然后当有回调函数时就执行回调函数
            }else{//如果目标值减当前属性值不小于速度值iSpeed时，
                iNow += iSpeed	//则当前属性值等于当前属性值加速度值iSpeed
                //obj.style[attr]=iNow+'px';
                tools.css(obj,attr,iNow);//然后当前属性值等于加上速度值iSpeed后的iNow
            };
        },ms)
    },


    //封装抖函数
    //参数1：对象；
    // 参数2：属性；
    // 参数3：抖动数；
    // 参数4：抖动时间；
    // 参数5：回调函数
    shake : function(obj,attr,n,ms,callBack){
        if(obj.oTimer){//如果有定时器执行的时候
            return;//就返回不再执行了
        };
        var arr = [];//声明一个空数组
        var iNow = tools.css(obj,attr);//声明iNow等于自动获取当前的元素属性值
        for( var i=n; i>=0; i-=2){
            arr.push(iNow+i,iNow-i+1);//for循环添加不同数字到数组里
        };
        arr.push(iNow);//for循环完后给数组最后添加最初自动获取的元素属性值iNow
        i = 0;//循环完后，i等于0
        clearInterval(obj.oTimer);//在自动抖动之前先清除一遍定时器
        obj.oTimer=setInterval(function(){
            if(i>arr.length-1){//如果i大于数组的长度减1时
                clearInterval(obj.oTimer);//则清除定时器
                obj.oTimer=0;//而且将定时器重置为0；
                callBack && callBack();//并且当有回调函数时，就执行回调函数；
            }else{//如果i小于数组的长度减1时
                tools.css(obj,attr,arr[i]);//则元素的属性值是数组里的i个
                i++;	//而i则是一直加一的
            };
        },ms);
    },

    //封装indexof方法兼容版
    inDexOf : function(arr,attr,serchIndex){//参数1：数组；参数2：要找的值；参数3：要开始找的索引值；
        if(arguments.length<3){
            serchIndex=0;//当传进的参数小于3时，索引值默认为0；
        };
        for(var i=serchIndex; i<arr.length; i++){
            if(arr[i]===attr){//循环数组，i等于所传索引值，当循环到arr里的某位等于所要找的值时
                return i;//则返回当前i
            };//当循环到arr里的某位不等于所要找的值时，并且arr的长度减去索引值小于索引值时
            if(arr[i] != attr && arr.length-serchIndex<serchIndex){
                return -1;//则返回-1；
            };
        };
    }

};


// move library example:
