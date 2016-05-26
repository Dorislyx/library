/**
 * Created by liuyunxiao on 16/5/23.
 * DOM BOM NODES ---library
 */

// ajax的定义：
//AJAX ： Asynchronous JavaScript and XML （异步的javascript 与 XML）。
//数组、JSON， XML 、HTML
//ajax 是基于 http ( https ）协议，所以只能在HTTP服务器环境下运行。

// ajax的作用：
// 利用js发送请求，接收数据。
// 操作DOM，更新数据。
// 这样就可不用刷新页面或者打开新窗口更新数据。利用ajax就能对页面的数据进行局部更新。
// 利用ajax做到无刷新操作数据
// 传统的网页（不使用 AJAX）如果需要更新内容，必需重载整个网页面。

//ajax工作流程：
// 一：初始阶段，创建ajax对象
// 二：建立连接，填写数据
// 三：发送请求
// 四：等待服务器相应（数据没有完全发送）
// 五：请求完成



//options 选项
function ajax(options){

	//默认
	var defaults = {
		method: options.method || "get",	
		url:options.url || "",
		data: options.data || "",
		dataType: options.dataType || "text",
		success:options.success || "",
		fail:options.fail || ""
	};

	// 创建AJAX  XMLHttpRequest 对象对象
	var xhr = null;
	if( window.XMLHttpRequest ){
		//ie6没有XMLHttpRequest这个函数，其余浏览器都有这个函数
		xhr = new XMLHttpRequest();
	}else{// IE6
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	};


	if( defaults.method.toLowerCase() === "get" ){
		defaults.url += "?"+ defaults.data;
	};


	//规定请求的类型、URL 以及是否异步处理请求
	xhr.open(defaults.method,defaults.url,true);



	if( typeof xhr.onload !== "undefined" ){

		//ie6,7,8都没有这个函数。
		//onload是html5新出来的事件属性，当ajax完成之后触发的函数
		xhr.onload = function (){
			if( xhr.status === 200 ){
				/*
				 xhr.responseText接收是后台返回的文本信息，始终是一个字符串。如果接收到的是json字符串：如下所示：
				 '{"code": 1, "msg": "用户名已经被注册了！"}'
				 那需要用到JSON.parse解析成js中的对象
				 */
				var data = xhr.responseText;
				if( defaults.dataType.toLowerCase() === "json" ){
					data = JSON.parse(data);
				};
				if( defaults.dataType.toLowerCase() === "xml" ){
					data = xhr.responseXML;
				}

				if( typeof defaults.success === "function" ){
					defaults.success(data);
				}


			}else{

				if( typeof defaults.fail === "function" ){
					defaults.fail( xhr.status,xhr.responseText );
				}

			}
		};
	}else{
		xhr.onreadystatechange = function (){
			if( xhr.readyState === 4 ){
				if( xhr.status === 200 ){
					var data = xhr.responseText;
					if( defaults.dataType.toLowerCase() === "json" ){
						data = JSON.parse(data);
					};
					if( defaults.dataType.toLowerCase() === "xml" ){
						data = xhr.responseXML;
					}

					if( typeof defaults.success === "function" ){
						defaults.success(data);
					}
				}else{
					if( typeof defaults.fail === "function" ){
						defaults.fail( xhr.status,xhr.responseText );
					}
				}
			}	
		};
	}


	//将请求发送到服务器
	if( defaults.method.toLowerCase() === "get" ){ // get 方式请求
		xhr.send();
	}else{ // post 方式请求
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded'); // 设置请求头
		xhr.send(defaults.data);
	}


}