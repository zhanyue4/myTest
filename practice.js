// 'use strict'
/**
 * 测试面向对象继承方式一
 */
function Animal () {
	this.species = '动物';
}
Animal.prototype.space = 'earth';

function Cat(name,color) {
	// console.info('arguments:',arguments)
	// console.info(arguments.length);
	// console.info(Cat.caller)
	// Animal.call(this,arguments);
	this.name = name;
	this.color = color;
}
function F (){};
F.prototype = Animal.prototype;
Cat.prototype =  new F();
Cat.prototype.constructor = Cat;
Cat.uber = Animal.prototype;
var cat1 = new Cat('seki');
// console.info(cat1.species,cat1.space);
// console.info(Animal.prototype.constructor)

/**
 * 测试面向对象继承方式二
 */
function object(o) {
　　　　function F() {}
　　　　F.prototype = o;
　　　　return new F();
}

var Chinese = {
　　　　nation:'中国'
};

var Doctor = object(Chinese);
Doctor.career = '医生';
// console.info(Doctor.nation)

function test() {
	console.info('加载成功后调用');
}

function inherit(p) {
	if (p == null) throw TypeError();
	if (Object.create) {
		return Object.create(p);
	}
	var t = typeof p;
	if (t !== 'object' && t !== 'function') {
		throw TypeError();
	}
	function f() {};
	f.prototype = p;
	return new F();
}


function augment(destClass, srcClass) {
    var destProto = destClass.prototype
    var srcProto  = srcClass.prototype
    for (var method in srcProto) {
        if (!destProto[method]) {
            destProto[method] = srcProto[method]
        }
    }
}
 
function Person() {} // 具有两个方法的类，用于mixin
Person.prototype.getName = function() {}
Person.prototype.getAge  = function() {}
 
function Student() {} // 没有任何方法的类
 
augment(Student, Person) // 调用，拷贝
 
var s1 = new Student()
console.log(s1.getName) // Student { getName=function(), getAge=function()}

var o = Object.create(Object.prototype, {
  // foo is a regular 'value property'
  foo: { writable: true, configurable: true, value: 'hello'},
  // bar is a getter-and-setter (accessor) property
  bar: {
  	enumerable: true,
    configurable: false,
    get: function() { return 10; },
    set: function(value) { console.log('Setting `o.bar` to', value); }
/* with ES5 Accessors our code can look like this
    get function() { return 10; },
    set function(value) { console.log('setting `o.bar` to', value); } */
  }
});
console.info('对象o：',o);
console.info(JSON.stringify(o));
console.info(Object.getOwnPropertyDescriptor(o,'bar'))
var obj1 = {};
$.extend(obj1, o);
console.info(o.foo)
console.info(JSON.stringify(obj1))

var object1 = {
  apple: 0,
  banana: { weight: 52, price: 100 },
  cherry: 97
};
var object2 = {
  banana: { price: 200 },
  durian: 100
};
 
 var m = {
	n:function(){
		var self = this;
		console.log(this == m);
		function x() {
			console.log(this == m);
			console.log(self == m);
		}
		x();
}
}
m.n()

/**
 * 闭包1
 * @return {[type]} [description]
 */
function counter () {
	var n = 0;
	return {
		counte : function () {
			return n++;
		},
		reset : function () {
			return n = 0;
		}
	}
}

/**
 * 闭包2
 */
function counterNew(n) {
	return {
		get count() {
			return n++;
		},
		set count (m) {
			if (m > n) n = m;
			else {
				throw Error('count can only be set to a larger value');
			}
 		}
	}
}

/**
 * 闭包3
 */
var scope1 = 'global scope';
function checkspose() {
	var scope1 = 'local scope';
	console.log('inner:'+scope1);
	return function() {
		return scope1;
	}
}
console.log(checkspose()());

/**
 * 闭包4
 */
function addPrivateProperty (obj,name,predicate) {
	var value;
	obj['get'+name] = function () {
		return value;
	};
	obj['set'+name] = function (v) {
		if (predicate && !predicate(v)) {
			throw Error('set'+name+':invalid value '+v);
		} else {
			value = v;
		}
	}
}
var o = {};
addPrivateProperty(o,'Name',function(x) {return typeof x === 'string'});

/**
 * 闭包5
 */
function constFuncs(){
	var funcs = [];
	for (var i = 0 ; i < 10 ; i++) {
		funcs[i] = function () { return i;};
	}
	console.log('i='+i)
	return funcs;
}
var func = constFuncs();
console.log(func[5]());