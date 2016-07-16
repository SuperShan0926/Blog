window.onload = function () {
	each($('#list').getElementsByTagName('li'),function (item) {
		addEvent(item,'click',clickListener);

	});
	addEvent($("#mm"),'click',ajax.bind(this,
	'http://localhost:3000/testonly',
		{
			data: {
            name: 'simon',
            password: '123456'
        	},
        onsuccess: function (responseText, xhr) {
        		$("#mm").innerHTML = responseText;
        	}
		}
	));
};

function clickListener() {
	alert('hahaha!!!');
}

function isArray(arr) {
	console.log(arr instanceof Object);
}

function isFunction(fn) {
	console.log(fn instanceof Function);
}

	//数组去重。
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) !== null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

function cloneObject(src) {
	var newObj = {};
	var subObj = [];
	for(var i in src){

		if(src[i] instanceof Array){
			src[i].forEach(function (srcAarry,index) {
				subObj.push(srcAarry);
			});
			newObj[i] = subObj;
		}
		else if(src[i] instanceof Object){
			
			newObj[i] = cloneObject(src[i]);
		}
		else{
	 	newObj[i] = src[i];
	 }
	}
	return newObj;
}


var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: {
        	a:1,
        	b:["one","two"]
        }
    }
};

// var a = ["a","b"];
// var tarObj = cloneObject(srcObj);
// srcObj.b.b1[0] = "fuck";
// srcObj.b.b2.a = 100;
// console.log(srcObj);
// console.log(tarObj);
// var arr = [1,2,3,4,4,2,4,3,5,7,4,7,1];
// console.log(unique(arr));


function trim(str) {
	for(var i=0;i<str.length;i++){
		if(str.substring(i+1,0)!=" "){
			str = str.substring(i);
			break;
		}
	}
	for(var j = str.length;j>0;j--){
		if(str.substring(j-1)!=" "){
			return str.substring(j-1,0);
		}
	}
}

var str = " aaaa   ";
// cloneObjectsole.log(trim(str));
// console.log(trim(str).length);

function each(arr,fn) {
	for (var i = 0; i < arr.length; i++) {
		fn(arr[i],i);
	}
}

function output(item) {
	 console.log(":"+item);
}

var arr = ['java','c','php'];
each(arr,output);

function getObjectLength(obj) {
	var len = 0;
	for(var i in obj){
		len ++;
	}
	return len;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
// console.log(getObjectLength(obj)); // 3

function checkEmail(str) {
	var re = /\w+@\w{2,5}\.(com|cn)/g;
	
	console.log(re.test(strs));
}

var strs = "782593749@qq.com";
checkEmail(strs);

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	element.className +=" "+ newClassName;
}


function $(selector) {
	selector = selector.trim();
	if(selector.substring(1,0)==="#"){
		return document.getElementById(selector.substring(1));	
		// alert(parent.getElementsByClassName('classa')[0].innerHTML);	

	}
	// if(selector.trim().substring(1,0)==="["){
	// 	 list = selector.split("="); 
	// }

}


function renderList(argument) {
	$("#list").innerHTML += '<li>new item</li>';
}


function addEvent(element, event, listener) {
//针对chrome,safari,DOM2级添加事件方法
     if(element.addEventListener){
      element.addEventListener(event,listener,false);
     }
//针对IE，DOM2级
     else if(element.attachEvent){
      element.attachEvent('on'+event,listener);
     }
     else{
     //低版本ie，使用dom 0级添加事件的方法。这里不能写 element.'on'+event,因为.后面不可以跟字符串，需要用［‘’］。
          element['on'+event] = listener;
     }
}

function delegateEvent(element, tag, eventName, listener) {
    return addEvent(element, eventName, function (e) {
        var oEvent = e || event; //兼容处理
        var target = oEvent.target || oEvent.srcElement; //兼容处理
        if (target.tagName.toLocaleLowerCase() === tag) {
            listener.call(target, oEvent); //使用call方法修改执行函数中的this指向，现在this指向触发了事件的HTML节点（可直接使用this.innerHTML返回该节点内容）
        }
    });
}

function ajax(url,options) {
	xhr = new XMLHttpRequest();
	var method = options.method || 'GET';
	xhr.open(method,url);
	var str = 'aaa';
	for(var i in options.data){
		str+= i +'='+options.data[i]+'&';
	}
	var len = str.length-2;
	// console.log(len);
	str = str.substring(str.length-1,0);
	switch(method) {
		case 'GET':xhr.send(str);
			break;
		case 'POST':xhr.send(options.data);
			break;
	}
xhr.onreadystatechange=function()
  {
  if (xhr.readyState===4 && xhr.status===200)
    {
    	options.onsuccess(xhr.responseText,xhr);
    }
  };
}



