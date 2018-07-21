//引用
//返回mobule.exports
const m5=require('./004.module4.js');

console.log(require('./004.module4.js'))
console.log(m5);
console.log(m5.obj1);

console.log(m5.str);
console.log(m5.fn);
m5.fn();