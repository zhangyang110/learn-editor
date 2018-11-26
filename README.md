# introduction
tv-editor is the editor for tv program, and it is a single page web application.

# tool-chain
* js  
react  redux  saga dvajs      
* css
less    
* html    
html5 
* build tool  
webpack
* test  
jest



// yarn run build完成后  执行如下linux命令完成本地和网络环境的同步  

rsync -rv dist/ root@192.168.1.244:/home/programs/tv/integration/editor/v3   //测试环境
rsync -rv dist/ root@192.168.1.244:/home/programs/tv/staging/editor/v3    //准生产环境

// 更新接口 需要的操作如下  

在项目外的tvapispec 项目中  git pull  然后yarn run  build  然后  yarn run genjs 
进入本项目   cd services   然后 sh genjs.sh

// 192.168.1.244  服务器 的密码如下

// =oacXMj/A%-#4M*@

//test gogs push code

  

