## CodeImg

A lightweight and versatile JavaScript plugin designed to automatically generate random verification codes (commonly known as captchas) for enhanced security in web forms and user authentication processes. It allows customization of code length, character set (including alphanumeric, special characters), and expiration time, ensuring seamless integration into various web applications.

### Install（安装）

    npm install codeimg
    yarn add codeimg

## How to use?（使用说明）

    var codeImg = new CodeImg(options);
    const code = codeImg.getData();  // 获取验证码
    console.log(code);  // [ '1', '2', '3', '4', '5' ]

Available options are:  
可配置项如下:
| Name | Parameter | Remark |
| -------- | :----------------------: | ----------------------------------------------------: |
| container | HTML DOM element | dom 元素 |
| num | 5 | 验证码个数 |
| iconum | 10 | 背景斑点个数 |
| changeBtn | [ HTML DOM element ]| DOM 元素数组 点击刷新验证码 |
| width | 160 | 容器大小 |
| height | 40 | 容器大小 |
| background| #ccc | 容器背景色|
| fontSize | 14 | 字体大小 |
| cimgRefresh| true | 是否点击验证码图片后刷新验证码
