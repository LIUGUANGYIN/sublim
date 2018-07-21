### 服务器
安装了Web服务器软件的电脑就可以提供管理网站的服务,我们称之为Web服务器。
常见的Web服务器软件有:Apache,IIS,Tomcat,Nginx,NodeJs等

### NodeJs 初识
* 官网 https://nodejs.org/ 下载安装,注意要下载LTS版本的
* NodeJs安装完成后,去终端用node -v 查看,如果有版本号说明安装成功
* 如果node命令找不到,Windows的用户注意环境变量的配置
* NodeJs安装的同时会安装npm(node package manager)

### ajax请求流程：
* 客户端创建一个ajax对象
* 用ajax对象和服务端建立连接
* 用ajax对象发送请求到服务端
* 用ajax对象接收服务端返回的数据

```javascript
function ajax(method,url,data,fnSucc,fnFaild){
        // 1.创建一个ajax对象
        var oAjax = new XMLHttpRequest();
        //post方法处理
        if(method.toLowerCase() == 'post'){
                oAjax.open(method,url,true);
                //设置请求头,该方法必须在open和send中间调用
                oAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                //post发送的数据 
                oAjax.send(data);               
        }else{
                if(data){
                        url = url+"?"+data;
                }
                // 2.用ajax对象建立连接
                // oAjax.open(请求方法，请求地址，是否异步)                
                oAjax.open(method,url,true);
                // 3.用ajax对象发送请求                
                oAjax.send();
        }
        // 4.用ajax对象接收数据
        oAjax.onreadystatechange = function(){
                // console.log(oAjax.readyState);
                // 0 还没有初始化
                // 1 已经初始化，但是还没有调用open方法
                // 2 send方法已经调用
                // 3 返回了部分数据
                // 4 数据完全返回
                if(oAjax.readyState == 4){//请求完成，表明所有的数据已经返回，但并不代表成功
                        if(oAjax.status == 200){//成功
                                fnSucc(oAjax.responseText);
                        }else{//失败
                                if(fnFaild){
                                        fnFaild(oAjax.status);
                                }       
                        }
                }
        }
}
```

### 跨域方案
* 请求端的协议,域名,端口和服务器的协议,域名,端口有一个不一致就会发生跨域
* CORS(Cross-origin resource sharing)跨域方案

> 服务器端设置响应头
```javascript
res.setHeader("Access-Control-Allow-Origin","*")
```
> 注意:
> * Access-Control-Allow-Origin设置可以跨域的域名
> * \*代表所有
> * 一次只能只能设置一个值

* 简单请求同时满足条件

> * 请求方法必须是 HEAD,GET,POST之一
> * 请求头中的字段仅限于 Accept,Accept-Language,Content-Language,Last-Event-ID,Content-Type
> * Content-Type 的值仅限于application/x-www-form-urlencoded,multipart/form-data,text/plain


* 复杂请求
不满足简单请求的时候就是复杂请求,复杂请求会先发一次OPTIONS方法进行预检(preflight)请求

例如设置如下请求头后该请求就会变为复杂请求
oAjax.setRequestHeader('abc','abc');

需要在服务器端设置如下响应头才能实现请求

```javascript
res.setHeader("Access-Control-Allow-Headers","abc");
```
> Access-Control-Allow-Headers 表示服务端接受的跨域请求的字段


* 服务器端响应头Access-Control-Expose-Headers

> Access-Control-Expose-Headers表示允许客户端通过getResponseHeader方法获取的字段
> CORS方式下默认只能获取6个基础字段,Cache-Control,Content-Language,Content-Type,Expires,Last-Modified,Pragma




