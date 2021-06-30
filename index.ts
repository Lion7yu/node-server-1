import * as http from 'http';
import * as fs from 'fs'
import * as p from 'path'
import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';

//创建http服务器
const server =  http.createServer();
const publicDir = p.relative(__dirname,'public')

//监听服务器是否被请求
server.on('request',(request:IncomingMessage,response:ServerResponse)=>{
  const {method,url,headers} = request
  switch(url){
    case '/index.html':
      //声明内容的类型是 HTML
      response.setHeader('Content-Type','text/html; charset = utf-8')
      //读 publicDir 目录下的 index.html
      fs.readFile(p.resolve(publicDir,'index.html'),(error,data)=>{
        if(error) throw error
        response.end(data.toString())
      })
      break
    case '/style.css':
      //声明内容的类型是 CSS
      response.setHeader('Content-Type','text/css; charset = utf-8')
      //读 publicDir 目录下的 style.css
      fs.readFile(p.resolve(publicDir,'style.css'),(error,data)=>{
        if(error) throw error
        response.end(data.toString())
      })
      break
    case '/main.js':
      //声明内容的类型是 JS
      response.setHeader('Content-Type','text/javascript; charset = utf-8')
      //读 publicDir 目录下的 main.js
      fs.readFile(p.resolve(publicDir,'main.js'),(error,data)=>{
        if(error) throw error
        response.end(data.toString())
      })
      break

  }
})
//监听本机的端口
server.listen(8888)