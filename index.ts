import * as http from 'http';
import * as fs from 'fs'
import * as p from 'path'
import * as url from 'url';
import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';

//创建http服务器
const server =  http.createServer();
const publicDir = p.relative(__dirname,'public')
let cacheAge = 3600 *24 *365;

//监听服务器是否被请求
server.on('request',(request:IncomingMessage,response:ServerResponse)=>{
  const {method,url:path,headers} = request
  //定义路径和查询字符串
  const {pathname,search} = new URL(`http://localhost:8888${path}`)
  //对请求方式进行过滤，静态服务器不能使用post请求
  if(method !== 'GET'){
    response.statusCode = 405;
    response.end()
    return
  }

  //声明内容的类型
  // response.setHeader('Content-Type','text/html; charset = utf-8')
  // /index.html => index.html
  let filename = pathname.substr(1)
  if(filename === ''){
    filename = 'index.html'
  }
  fs.readFile(p.resolve(publicDir,filename),(error,data)=>{
    if(error){
      if(error.errno === -4058){
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir,'404.html'),(error,data)=>{
          response.end(data)
        });
      }else if(error.errno === -4068){
        response.statusCode = 403;
        response.setHeader("Content-Type","text/plain; charset=utf-8")
        response.end('无权查看目录内容')
      } else{
        response.statusCode = 500;
        response.setHeader("Content-Type","text/plain; charset=utf-8")
        response.end('服务器繁忙，请稍后再试')
      }
    }else{
      // 添加缓存
      response.setHeader('Cache-Control',`public, max-age=${cacheAge}`)
      // 返回文件内容
      response.end(data)
    }
  })
})
//监听本机的端口
server.listen(8888)