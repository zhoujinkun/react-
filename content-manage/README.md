react-后台管理系统（cms）

1.使用create-react-app 脚手架构建工程 安装 react-router-dom axios less-loader less antd babel-plugin-import 
2.按需加载antd组件 （自定义主题颜色）  
 - 如果用git仓库建立的文件，先必须提交
 - git add . 
 - git commit -m 'init'
 - 最后npm run eject 就可以暴露隐藏的配置文件了
 - 在webpack.config.js中配置
 
然后安装less和lessloader：

npm i less less-loader --save


         
然后就可以在项目中畅用less了，sass配置方法一样，只是安装的包不一样，node-sass和sass-loader----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

不过现在create-react-app默认安装版本是2.03了，其中有些改变，在新版本脚手架中css的rules.test的值被提取到外面声明为一个变量，并将css的rules.use同样提取为一个函数在外部声明，函数接受两个参数，第一个为传入css-loader的Options，第二个为可选，就是需要添加的loader，最后返回配置后的loader数组：

看到这里发现其实只是变换了写法而已，并且新版本脚手架中已经配置了sass了，依葫芦画瓢，最笨的办法就是也定义两个关于less的变量：

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
然后在oneOf数组最后复制sass的两个loader配置追加到后面，将变量对应的改为上面自己声明的变量，并将第二个参数'sass-loader'改为'less-loader'：
```
           {
                test: lessRegex,
                exclude: lessModuleRegex,
                use: getStyleLoaders(
                  {
                    importLoaders: 2,
                    sourceMap: isEnvProduction
                      ? shouldUseSourceMap
                      : isEnvDevelopment,
                  },
                  'less-loader'
                ),
              },
             //配置less
              {
                test: lessModuleRegex,
                use: getStyleLoaders(
                  {
                    importLoaders: 2,
                    sourceMap: isEnvProduction
                      ? shouldUseSourceMap
                      : isEnvDevelopment,
                    modules: true,
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                  'less-loader'
                ),
              },
    ```
然后重新运行即可，亲测！



按需引入antd组件
安装使用不多说了直接进入正题，如何按需加载，使用需要用到的组件：

import { Button } from 'antd'
安装按需引入所需要的插件：

npm i babel-plugin-import --save
然后在package.json中babel属性下添加：
```
    "plugins": [
      ["import", {
        "libraryName": "antd",
        "style": "css"
      }]
    ]
```
在webpack.config.js中配置，但pugins是个二维数组！！不要复制粘贴错了哦！

修改antd默认主题颜色
这样就实现了antd组件按需加载了，不需要再额外引入组件样式了，但是如果要更改antd主题颜色的话，这里这个style属性值就不能是"css"了。必须改成true,原因是因为值是css时按需加载时加载的就是antd编译后之后的css文件，要更改主题颜色是要更改less变量的，而true标识直接加载antd的less文件，注意，坑来了！！当你设为true时，你会发编译失败，页面中antd组件也会没有样式了，命令行抛出如下异常：



这是因为你还没配置less-loader的配置项，在之前我复制修改的那个地方只是引入使用了less-loader,并没有添加配置项，导致他就会出现这个异常，在网上找资料大概less的版本2.7.3以前不会出现这个问题，所以我们要先给less-loader一个修改antd主题颜色的配置，
在最新的react脚手架版本中，上面也提到了，因新版本的配置文件中关于css的rules中的use值被提到外部声明成了一个配置函数，函数返回该样式文件类型所需要的loader数组，所以经过我如下修改并测试，成功修改主题颜色：



所以这个我们这样改：
//在大约106行代码改成如下
```
  if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
          modifyVars : {
            'primary-color': '#f9c700',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled : true
        },
      });
    }
```
每一次修改webpack配置文件，都要重新编译一下

3.三角形的制作
使用伪元素方法(具体的位置可以变动)
```
&:after{
        content:"";
        position: absolute;
        left:50%;
        bottom:-9px;
        transform: translateX(-50%);
        border-top:9px solid #fff;
        border-right:12px solid transparent;
        border-left:12px solid transparent;
    }
```
4.函数传值以及给属性赋值
```
//省略部分代码
 handleClickOpen= (type)=>{
        // 技巧 给属性赋值
        this.setState({
            [type]:true
        })
    }
    render() {
        return (
            <div>
                <Card title="基础模态框">
                                        {/*坑  函数传值必须使用箭头函数包裹 */}
                    <Button onClick={() => this.handleClickOpen('showModal1')}>Open</Button>
                    <Button onClick={() => this.handleClickOpen('showModal2')}>自定义页脚</Button>
                    <Button onClick={() => this.handleClickOpen('showModal3')}>顶部20px</Button>
                    <Button onClick={() => this.handleClickOpen('showModal4')}>水平垂直居中</Button>
                </Card>
            </div>
        )
```
**注**：1. 放在public文件夹下的资源可以直接使用'assets/1.img',而不用使用相对路径（也找不到）；
        2. 函数传值必须使用箭头函数包裹 ` <Button onClick={() => this.handleClickOpen('showModal1')}>Open</Button>`
