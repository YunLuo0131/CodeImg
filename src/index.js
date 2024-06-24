(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = global || self), (global.CodeImg_JS = factory()));
})(this, function () {
  "use strict";

  class CodeImg_JS {
    constructor(option) {
      this.init(option);
    }

    init(option) {
      const defaultOption = {
        num: 4,
        iconum: 10,
        width: 160,
        height: 40,
        background: "#ddd",
        fsize: [18, 20, 22, 16],
        cimgRefresh: true,
        fontSize: 14,
      };

      if (this.dataType(option) !== "Object") {
        console.log("参数必须是object");
        return;
      }
      if (!option.container || !this.isElement(option.container)) {
        console.log("container参数必须是Dom元素");
        return;
      }

      this.option = Object.assign({}, defaultOption, option);
      this.data = [];
      this.verificationCode = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
      ];
      this.picVerificationCode();

      //点击刷新验证码
      if (this.option.cimgRefresh) {
        this.option.container.addEventListener(
          "click",
          function () {
            this.picVerificationCode();
          },
          true
        );
      }
      if (this.dataType(this.option.changeBtn) == "Array") {
        const that = this;
        this.option.changeBtn.forEach(function (item) {
          if (!that.isElement(item)) return;
          item.addEventListener(
            "click",
            function () {
              that.picVerificationCode();
            },
            true
          );
        });
      }
    }

    picVerificationCode() {
      const tlist = []; //验证码字符数组
      const color = []; //字符颜色
      const rote = []; //字符旋转角度
      const fsize = []; //字符字体大小
      const IconColor = []; //斑点颜色
      this.option.container.innerHTML = ""; //初始化验证码容器

      for (let i = 0; i < this.option.num; i++) {
        let rgb = "";
        for (var j = 0; j < 3; j++) {
          rgb += this.randomNum(255).toString(16);
        }
        if (rgb.length == 4 || rgb.length == 5) {
          rgb = rgb.substr(0, 3);
        }
        color.push("#" + rgb);
        if (this.option.fsize[i]) {
          fsize.push(this.option.fsize[i] + "px");
        } else {
          fsize.push(
            this.option.fsize[this.randomNum(0, this.option.fsize.length - 1)] +
              "px"
          );
        }
        tlist.push(this.verificationCode[this.randomNum(61)]);
        rote.push(this.randomNum(-45, 45));
      }

      //设置验证码容器样式
      const box = this.option.container;
      box.style.background = this.option.background;
      box.style.width = this.option.width + "px";
      box.style.height = this.option.height + "px";
      box.style.lineHeight = this.option.height + "px";
      box.style.fontSize = this.option.fontSize + "px";
      box.style.display = "inline-block";
      box.style.position = "relative";
      box.style.textAlign = "center";
      box.style.padding = 0;
      box.style.userSelect = "none";
      const boxWidth = box.offsetWidth;
      const boxHeight = box.offsetHeight;

      //绘制斑点颜色
      for (var m = 0; m < this.option.iconum; m++) {
        var threeColor = "";
        for (var j = 0; j < 3; j++) {
          threeColor += this.randomNum(255).toString(16);
        }
        if (threeColor.length == 4 || threeColor.length == 5) {
          threeColor = threeColor.substr(0, 3);
        }
        IconColor.push("#" + threeColor);
      }

      for (var n = 0; n < this.option.iconum; n++) {
        var eltag = document.createElement("div");
        eltag.style.background = IconColor[n];
        eltag.style.position = "absolute";
        eltag.style.width = "3px";
        eltag.style.height = "3px";
        eltag.style.borderRadius = "50%";
        eltag.style.top = this.randomNum(boxHeight - 2) + "px";
        eltag.style.left = this.randomNum(boxWidth - 2) + "px";
        box.appendChild(eltag); //添加斑点
      }
      for (var k = 0; k < this.option.num; k++) {
        //添加验证码字符
        var span = document.createElement("span");
        span.innerHTML = tlist[k]; //内容
        span.style.color = color[k]; //颜色
        span.style.fontSize = fsize[k]; //字体大小
        span.style.display = "inline-block";
        span.style.width =
          Math.floor(this.option.width / this.option.num) + "px";
        if (this.supportCss3("transform")) {
          //浏览器如果支持css3 transform则设置
          span.style.transform = "rotate(" + rote[k] + "deg)"; //旋转角度
        }
        box.appendChild(span);
      }

      this.option.container.setAttribute("data-verificode", tlist);
      this.data = tlist;
    }

    getData() {
      return this.data;
    }

    /******数组乱序******/
    shuffle(arr) {
      var length = arr.length,
        randomIndex,
        temp;
      while (length) {
        randomIndex = Math.floor(Math.random() * length--);
        temp = arr[randomIndex];
        arr[randomIndex] = arr[length];
        arr[length] = temp;
      }
      return arr;
    }

    supportCss3(style) {
      var prefix = ["webkit", "Moz", "ms", "o"],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
          return string.replace(/-(\w)/g, function ($0, $1) {
            return $1.toUpperCase();
          });
        };

      for (i in prefix) humpString.push(_toHumb(prefix[i] + "-" + style));

      humpString.push(_toHumb(style));

      for (i in humpString) if (humpString[i] in htmlStyle) return true;

      return false;
    }

    /******判断js变量是否是DOM元素*******/
    isElement(OBJ) {
      return HTMLElement
        ? OBJ instanceof HTMLElement
        : OBJ &&
            typeof OBJ === "object" &&
            (OBJ.nodeType === 1 || OBJ.nodeType === 9) &&
            typeof OBJ.nodeName === "string";
    }

    /******判断数据类型*******/
    dataType(data) {
      if (data === null) return "Null";
      if (data === undefined) return "Undefined";
      return Object.prototype.toString.call(data).slice(8, -1);
    }

    /******获取[a,b]范围内的随机数******/
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    }
  }

  return CodeImg_JS;
});
