console.log(1);
// let t=setTimeout(()=>{
// 	console.log(2);
// },1000);
// clearTimeout(t);

// let t=setInterval(()=>{
// 	console.log(2);
// },1000);
// clearInterval(t);

let y=setTimeout(()=>{
	console.log(4);
},10);

let t=setImmediate(()=>{
	console.log(2);
});
console.log(3);