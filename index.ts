import * as http from 'http';
import * as fs from 'fs'
import * as p from 'path'
import * as url from 'url';
import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';

//创建http服务器
const server =  http.createServer();
const publicDir = p.relative(__dirname,'public')

//监听服务器是否被请求
server.on('request',(request:IncomingMessage,response:ServerResponse)=>{
  const {method,url:path,headers} = request
  //定义路径和查询字符串
  const {pathname,search} = new URL(`http://localhost:8888${path}`)
  //声明内容的类型
  // response.setHeader('Content-Type','text/html; charset = utf-8')
  // /index.html => index.html
  const filename = pathname.substr(1)
  fs.readFile(p.resolve(publicDir,filename),(error,data)=>{
    if(error){
      response.statusCode = 404
      response.setHeader("Content-Type","text/plain; charset=utf-8")
      response.end('请求的文件不存在')
    }else{
      response.end(data.toString())
    }
  })
})
//监听本机的端口
server.listen(8888)