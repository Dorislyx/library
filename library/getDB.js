/**
 * Created by liuyunxiao on 16/5/23.
 * DOM BOM NODES ---library
 */
// DOM : Document Object Model 文档对象模型
//   文档：html页面
//   文档对象：对象化的页面元素
//   文档对象模型：操作页面的方法
//
//BOM : Browser Object Model 浏览器对象模型
//  浏览器对象模型 ：定义了操作浏览器的方法

var get ={

    //通过id、标签名、类名获取元素
    //参数: selector: 选择符
    //      content: 包含符
    $ : function(selector,content){

        content = content || document;

        var tag = selector.charAt(),
            arr = [],	//声明一个空数组
            allClassEle = null;//声明一个空标签组

        if( tag === '#'){   // ID 选择符
            selector = selector.substring(1);
            return content.getElementById(selector);

        }else if( tag === '.'){ // 类选择符

            selector = selector.substring(1);
            allClassEle = content.getElementsByTagName('*');//从content里获取所有标签赋值给allClassEle

            for( var i=0; i<allClassEle.length; i++){
                if(selector === allClassEle[i].className){//通过循环比较标签组里的className值是否相等
                    arr.push(allClassEle[i]);	//然后添加进arr数组里
                };
            };
            return arr;
        }else{
            return content.getElementsByTagName(selector); //获取标签
        };

    },





    // getElementByClassName()方法 兼容IE 7 8 对象
    getByClass : function (parentObj, tagname, classname) {

        //获取指定范围内的所有指定元素
        var eles = parentObj.getElementsByTagName(tagname);
        //一个用来保存结果的数组
        var result = [];

        //循环遍历选中的元素eles
        for (var i=0; i<eles.length; i++) {
            //把当前循环过程中某个元素的class取出来，并分割成数组（元素可能会有多个class）
            var classes = eles[i].className.split(' ');
            //判断当前这个元素的class中是否有我们要找的class
            if (get.inArray(classes, classname)) {
                //如果当前元素中有我们要找的class，则把当前元素保存到结果数组中
                result.push(eles[i]);
            }

            /*for (var j=0; j<classes.length; j++) {
             if (classes[j] == classname) {
             result.push(eles[i]);
             break;
             }
             }*/
        }

        //返回结果数组
        return result;
    },
    inArray : function (arr, v) {
        for (var i=0; i<arr.length; i++) {
            if (arr[i] == v) {
                return true;
            }
        }
        return false;
    },

    
    //开关class
    toggleClass : function (obj, classname) {
        var classes = obj.className.split(' ');
        if ( get.inArray(classes, classname) ) {
            //如果有，删除
            get.removeClass(obj, classname);
        } else {
            //如果没有，添加
            get.addClass(obj, classname);
        }
    },

    //删除class
    removeClass : function (obj, classname) {
        var classes = obj.className.split(' ');
        var _index = get.arrayIndexOf(classes, classname);
        if (_index != -1) {
            classes.splice(_index, 1);
            obj.className = classes.join(' ');
        }
    },

    //添加class
    addClass : function (obj, classname) {
        var classes = obj.className.split(' ');
        if ( !get.inArray(classes, classname) ) {
            var s = obj.className + ' ' + classname;
            obj.className = trim(s);
        }
    },
    arrayIndexOf : function (arr, v) {
        for (var i=0; i<arr.length; i++) {
            if (arr[i] == v) {
                return i;
            }
        }
        return -1;
    },


    // 去除字符串左边空格
    leftTrim : function (str) {
        for (var i=0; i<str.length; i++) {
            if (str.charAt(i) != ' ') {
                break;
            }
        }
        return str.substring(i);
    },
    // 去除字符串右边空格
    rigTrim : function (str) {
        for (var i=str.length-1; i>=0; i--) {
            if (str.charAt(i) != ' ') {
                break;
            }
        }
        return str.substring(0, i+1);
    },
    // 去除字符串首尾空格
    trim : function (str) {
        var s = get.leftTrim(str);
        return get.rigTrim(s);
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
    },
    
    


    //封装获取元素节点函数兼容版
    //元素的最后一个子节点
    lastNode : function( obj ){
    //如果没传参数或当前参数的最后一个子节点为空取反时，就返回空；
        if( !obj || !obj.lastChild )	return null;
        //如果当前对象的最后一个子节点的节点类型等于1时，则返回该节点，否则利用递归传入当前最后一个子节点为参数调用自身
        return obj.lastChild.nodeType === 1 ? obj.lastChild : prev( obj.lastChild );
    },

    //元素的第一个子节点
    firstNode : function( obj ){
        //如果没传参数或当前参数的第一个子节点为空取反时，就返回空；
        if( !obj || !obj.firstChild ) return null;
        //如果当前对象的第一个子节点的节点类型等于1时，则返回该节点，否则利用递归传入当前第一个子节点为参数调用自身
        return obj.firstChild.nodeType ===1 ? obj.firstChild : next( obj.firstChild );
    },

    //获取当前节点的上一个兄弟节点
        prevNode : function( obj ){
        //如果没传参数或当前参数的上一个子节点为空取反时，就返回空；
        if( !obj || !obj.previousSibling )	return null;
        //如果当前对象的上一个兄弟节点的节点类型等于1时，则返回该节点，否则利用递归传入当前节点的上一个兄弟节点为参数调用自身
        return obj.previousSibling.nodeType === 1 ? obj.previousSibling : prev( obj.previousSibling );
    },


    //获取当前节点的下一个兄弟节点
    nextNode : function( obj ){
        //如果没传参数或当前参数的上一个子节点为空取反时，就返回空；
        if( !obj || !obj.nextSibling ) return null;
        //如果当前对象的下一个兄弟节点的节点类型等于1时，则返回该节点，否则利用递归传入当前节点的下一个兄弟节点为参数调用自身
        return obj.nextSibling.nodeType === 1 ? obj.nextSibling : next( obj.nextSibling );
    },


    //获取元素属性值
    getStyle : function( obj, attr ) {
     return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr];
    },


    //获取当前元素到定位父级元素的距离
    getOffset : function( obj ){
        var iLeft = 0;    //声明left值为0
        var iTop = 0;	//声明top值为0
        var objBdL = parseInt(get.getStyle(obj,"borderLeftWidth"));    //获取当前元素的左边边框，用parseInt排除NaN
        var objBdT = parseInt(get.getStyle(obj,"borderTopWidth"));    //获取当前元素的上边边框，用parseInt排除NaN
        //判断不是NaN，是NaN的话，赋值为0
        objBdL = isNaN( objBdL ) ? 0 : objBdL;
        objBdT = isNaN( objBdT ) ? 0 : objBdT;
        while( obj ){
            var borderL = parseInt(get.getStyle(obj,"borderLeftWidth"));    //获取当前元素的左边边框，用parseInt排除NaN
            var objBdT = parseInt(get.getStyle(obj,"borderTopWidth"));    //获取当前元素的上边边框，用parseInt排除NaN
            //判断不是NaN，是NaN的话，赋值为0
            objBdL = isNaN( objBdL ) ? 0 : objBdL;
            objBdT = isNaN( objBdT ) ? 0 : objBdT;
            iLeft += obj.offsetLeft + borderL ;    //iLeft 等于循环中获取的offsetLeft 值加上边框
            iTop += obj.offsetTop + objBdT ;    //iTop 等于循环中获取的offsetTop 值加上边框
            obj = obj.offsetParent;    //重置当前元素好下一次循环
        };
        return {
            T:iTop - objBdT,	//最后返回iTop 减去当前元素的边框值
            L:iLeft - objBdL    //最后返回iLeft 减去当前元素的边框值
        }
    },


    //获取可视区宽高的函数
    view : function (){
        return { //在标准下 || ie6 7 8 标准下
            w:window.innerWidth || document.documentElement.clientWidth,
            h:window.innerHeight || document.documentElement.clientHeight
        }
    },

    //*************************#########################################************************************



    //绑定事件处理程序
    bind : function (obj,evName,evFn){
    //标准下使用
        if( obj.addEventListener ){
            obj.addEventListener(evName,evFn,false);
        }else{//ie低版本使用
            obj.attachEvent("on"+evName,function (){
                evFn.call(obj);	//要改变一下传入的事件处理函数的this的指向
            })
        }
    },

    //解除事件处理程序
    unbind : function (obj,evName,evFn){
        if( obj.removeEventListener ){ //标准下
            obj.removeEventListener(evName,evFn,false);
        }else{ // ie下
            obj.detachEvent("on"+evName,evFn);
        }
    },



    //拖拽函数
    drag : function (obj){

        //当mousedown时，计算出鼠标到要拖拽的元素左边的距离
        //鼠标到要拖拽的元素左边的距离 = 鼠标摁下去鼠标的位置（clienX） - 元素到浏览器左边的距离（offsetLeft）
        obj.onmousedown = function (ev){

            var e = ev || event;

            var disX = e.clientX - this.offsetLeft;
            var disY = e.clientY - this.offsetTop;

            //设置全局捕获
            if(this.setCapture){
                this.setCapture();
            }

            //当mousemove时，计算出left值，把这个left赋给要拖拽的元素
            //计算left得值 = 鼠标移动过程中鼠标的位置（clienx） - 鼠标到要拖拽的元素左边的距离
            document.onmousemove = function (ev){
                var e = ev || event;

                var l = e.clientX - disX;
                var t = e.clientY - disY;


                obj.style.left = e.clientX - disX + "px";
                obj.style.top = e.clientY - disY + "px";

            };

            //当触发要拖拽元素的mousemove事件，那么一旦鼠标离开了这个元素，那么就不会触发这个元素的mosuemove事件。
            document.onmouseup = function (){
                document.onmousemove = null;
                document.onmouseup = null;

                //释放全局捕获
                if( obj.releaseCapture ){
                    obj.releaseCapture();
                }
            };
            //阻止事件默认行为
            return false;
        };
    },





     // 矩形的碰撞检测对象
     //obj1：拖拽的元素
     // obj2：被碰撞的元素

    rectangleCollision : function (obj1,obj2){

        var obj1L = obj1.offsetLeft;
        var obj1LW = obj1L + obj1.offsetWidth;
        var obj1T = obj1.offsetTop;
        var obj1TH = obj1T + obj1.offsetHeight;

        var obj2L = obj2.offsetLeft;
        var obj2LW = obj2L + obj2.offsetWidth;
        var obj2T = obj2.offsetTop;
        var obj2TH = obj2T + obj2.offsetHeight;

        if( obj1LW < obj2L || obj1L > obj2LW || obj1TH < obj2T || obj1T > obj2TH){
            return false;
        }

        return true;
    },

    // collision object example:

    /*div1.onmousedown = function (ev){
    var e = ev || event;

    var disX = e.clientX - this.offsetLeft;
    var disY = e.clientY - this.offsetTop;

    document.onmousemove = function (ev){
        var e = ev || event;

        var l = e.clientX - disX;
        var t = e.clientY - disY;
        //如果碰撞上
        if( get.collision(div1,div2) ){
            div2.style.background = "blue";
        }else{
            div2.style.background = "green";
        }

        div1.style.left =  l + "px";
        div1.style.top = t + "px";
    };
    document.onmouseup = function (){
        document.onmousemove = null;
        document.onmouseup = null;
    };
    };*/



    // 正元的碰撞检测对象
    //正圆的碰撞检测：检测两个圆心之间的距离是不是小于半径之和。勾股定理。

    roundCollision : function ( obj1 , obj2 ){

        obj1.onmousedown = function( ev ){

            var ev = ev || event;
            var disX = ev.clientX - this.offsetLeft;
            var disY = ev.clientY - this.offsetTop;

            obj2.color = getComputedStyle( obj2 )['backgroundColor'];


           // 把所有跟鼠标相关的事件都捕捉并绑定到一个指定对象上，所有对整个浏览器的鼠标操作都会被认为是在这个指定的对象上操作。
            if( obj1.setCapture ) obj1.setCapture(); // 设置全局捕获

            document.onmousemove = function( ev ){

                var ev = ev || event;

                var l = ev.clientX - disX;
                var t = ev.clientY - disY;

                obj1.style.left = l + 'px';
                obj1.style.top = t + 'px';

                var r1 = obj1.offsetWidth / 2;
                var r2 = obj2.offsetWidth / 2;
                var x1 = obj1.offsetLeft + r1;
                var x2 = obj2.offsetLeft + r2;
                var y1 = obj1.offsetTop + r1;
                var y2 = obj2.offsetTop + r2;
                var a = Math.abs( x1 - x2 ) , b = Math.abs( y1 - y2 );
                var c = Math.sqrt( a*a + b*b );

                if( c <= r1 + r2 ){

                    obj2.style.background = 'orange';

                }else{

                    obj2.style.background = obj2.color;

                }

            };

            document.onmouseup = function(){
                if( obj1.releaseCapture ) obj1.releaseCapture();// 释放全局捕获
                document.onmousemove = document.onmouseup = null;
            };

            return false;
        };

    }




};



// get library  examples:
