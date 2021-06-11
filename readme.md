# 组件说明

阿里云函数计算配置转换组件

## Funcraft转Serverless Devs

通过该方法可以讲Funcraft的Yaml规范转为Serverless devs组件规范。

使用方法为：`s cli fc-transform fun2fc`

参数包括：

```
--source          Specify fun configuration path(default: template.[yaml|yml]). 
--target          Specify serverless devs configuration path(default: s.yaml).  
--force           Mandatory overwrite s file                                    
--region string   Pass in region in cli mode     
```

例如：

```
$ s cli fc-transform fun2fc --target test.yaml

[2021-06-11T12:21:51.022] [INFO ] [FC-TRANSFORM] - Using funcraft yaml: /Users/jiangyu/Desktop/test/template.yml
[2021-06-11T12:21:51.022] [INFO ] [FC-TRANSFORM] - Reminder serverless devs yaml path: /Users/jiangyu/Desktop/test/test.yaml

Tips for next step

======================
* Invoke Event Function: s local invoke -t test.yaml
* Invoke Http Function: s local start -t test.yaml
* Deploy Resources: s deploy -t test.yaml

End of method: fun2fc
```

即可看到已经生成文档`test.yaml`:

```
edition: 1.0.0
name: tramsform_fun
access: default
vars:
  region: cn-shenzhen
services:
  fc-test-test:
    component: devsapp/fc
    props:
      region: ${vars.region}
      service:
        name: test
        description: helloworld
        internetAccess: true
      function:
        name: test
        handler: index.handler
        runtime: nodejs10
        codeUri: ./
```