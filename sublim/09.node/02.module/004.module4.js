//定义
let str='hello';

let obj1={name:"Tom",age:18};

let fn=()=>{
	console.log('fn::::...')
}
// module.exports.obj1=obj1;
// exports.str=str;
// console.log(module.exports);
// console.log(module.exports.obj1);
module.exports={
	obj1:obj1,
	str:str,
	fn:fn
}