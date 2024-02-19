## **2024/2/19 15:32** 第一版——纯前端+WebView暂替页面

- 主体框架写好了，Home页面的数据目前都是写死的，fetch后填入View发现高度不会自适应

- 活动里面的天气是写死的，添加计划暂时不能保存到本地，每次打开都会重置

- 全程浏览地图未完善，点击反馈用的是x y坐标，有弊端，暂时不知道怎么改进

- 出行是对马蜂窝和腾讯地图的链接

- 我的里面有key问题，uuid和nanoid安装后不能正常使用。按钮订单优惠券等只有log反馈


App面向移动设备，前端使用了Reacct-native作为基本框架，综合使用了Javascript和Typescript作为主要编写语言，结合html和css，搭建出基本页面。同时使用webpack等辅助app的配置

icon、image主要源于网络，其中icon大部分来自阿里图标库

组件方面主要运用了ant design（如Grid、Tabs）和React-native自带的一些组件（如ScrollView、ImageBackground），综合运用其他常见的第三方库（如webview、navigation）

后端使用了Nodejs为基础的Express框架，监听前端的fetch和axios，发送数据包文件，如json文件等，实现前后端分离编写。

后端部署在nginx服务器上，并简单加装了openssl

目前主要争对Android开发，后续会逐步完善iOS、HarmonyOS、Web等平台。
