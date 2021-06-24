import * as http from 'http';

//创建http服务器
const server =  http.createServer();

//监听服务器是否被请求
server.on('request',(request,response)=>{
  //结束响应，内容是'hi'
  response.end('hi')
  console.log('有人请求了')
})
//监听本机的端口
server.listen(8888)