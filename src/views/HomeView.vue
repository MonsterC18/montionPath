<!--
 * @Author: your name
 * @Date: 2022-04-08 16:28:21
 * @LastEditTime: 2022-04-13 16:23:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \recorddemo\src\views\HomeView.vue
-->
<template>
  <div id="home">
    <div class="button_wrap">
      <button @click="controlMove('move')">移动</button>
      <!-- <button @click="controlMove('pause')">暂停</button> -->
      <button @click="controlMove('restart')">重新播放</button>
      <!-- <button @click="controlMove('reverse')">逆转播放</button> -->
      <button @click="clearDraw">清空画布</button>
      <button @click="lineDraw">折现画图</button>
      <button @click="onlyLineDraw">直线画图</button>
      <button @click="addDom">添加</button>
      <button @click="complete">完成</button>
    </div>

    <div id="svg_wrap">
      <div id="svg_content">
        <!-- 折线画布 -->
        <svg
          version="1.1"
          id="container"
          :style="svg_wrap_style"
          xmlns:svg="http://www.w3.org/2000/svg"
          xml:space="preserve"
        >
          <g id="lines" stroke="#4af" stroke-width="2" fill="none">
            <path
              stroke="#4af"
              stroke-dasharray="20"
              stroke-miterlimit="5"
              d=""
              id="moveLine"
            />
            <path
              stroke="#4af"
              stroke-dasharray="20"
              stroke-miterlimit="5"
              d=""
              id="rocket-path"
            />
          </g>
        </svg>
      </div>

      <!-- <svg
        id="rocket"
        x="0"
        y="0"
        viewBox="0 0 72 72"
        version="1.1"
        width="72"
        height="72"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="color">
          <path
            fill="#FCEA2B"
            d="M16.12,48.114 c-3.1584,3.1634-4.6518,7.5601-3.97,11.688c4.128,0.6763,8.5223-0.8196,11.683-3.977c3.1584-3.1634,4.6518-7.5601,3.97-11.688 C23.675,43.4607,19.2807,44.9566,16.12,48.114z"
          />
          <path
            fill="#61B2E4"
            d="M31.973,45.839 c-0.1919,0.966-0.6657,1.8536-1.3616,2.5507c-0.3389,0.3373-0.7246,0.6241-1.1452,0.8516 c2.1626,2.9716,3.7579,6.2847,4.6952,9.7506c0.7092-0.6216,1.3906-1.2786,2.0417-1.9685c1.9136-2.0343,3.5491-4.3376,4.8516-6.8326 c1.2507-2.4201,2.1751-4.9922,2.7442-7.6354c-3.7285,1.9544-7.7719,3.0771-11.826,3.2837L31.973,45.839z"
          />
          <path
            fill="#92D3F5"
            d="M14.923,35.749 c-0.69,0.65-1.3472,1.3303-1.9691,2.0383c3.4682,0.9313,6.7846,2.521,9.7604,4.6784c0.2264-0.414,0.5104-0.7939,0.8435-1.1281 c0.6949-0.6935,1.5791-1.1665,2.5417-1.3598c0.2106-4.0507,1.3364-8.0899,3.293-11.814c0.0019-0.0037,0.0037-0.0074,0.0056-0.0112 c-2.645,0.5687-5.2188,1.4928-7.6405,2.7434C19.2616,32.199,16.9577,33.8349,14.923,35.749L14.923,35.749z"
          />
          <path
            fill="#EA5A47"
            d="M34.821,20.747 c-5.2314,5.2507-8.3665,12.1635-8.7228,19.233c1.6376-0.3318,3.3326,0.1781,4.515,1.3584c1.186,1.1868,1.6956,2.8903,1.356,4.5332 c7.0754-0.3609,13.9919-3.5024,19.242-8.7398c6.7117-6.7229,9.8843-16.067,8.4337-24.839 c-1.7318-0.2827-3.5044-0.3879-5.2915-0.3141c-7.1741,0.2926-14.2097,3.4508-19.532,8.7677L34.821,20.747z M45.07,20.2179 c1.8412-1.8413,4.8269-1.8418,6.6687-0.0012c0.0004,0.0004,0.0008,0.0008,0.0012,0.0012c1.8418,1.8407,1.8424,4.8255,0.0012,6.6667 c-0.0004,0.0004-0.0008,0.0008-0.0012,0.0012c-1.8419,1.8404-4.8274,1.8398-6.6685-0.0014 C43.2297,25.0438,43.229,22.0592,45.07,20.2179z"
          />
          <path
            fill="#F1B31C"
            d="M26.538,52.037 c-0.8756,0.9831-1.8894,1.8467-3.0072,2.5617c-3.4907,2.2228-7.7244,2.8345-11.441,1.653c-0.1495,1.1964-0.1293,2.3916,0.06,3.5496 c4.128,0.6763,8.5223-0.8195,11.683-3.9769c1.1048-1.1131,2.0209-2.3956,2.7055-3.7874L26.538,52.037z"
          />
          <path
            fill="#D22F27"
            d="M26.204,38.687 c-0.033,0.4281-0.0559,0.8558-0.0684,1.283c1.6271-0.316,3.305,0.1967,4.4773,1.3682c1.186,1.1868,1.6956,2.8903,1.356,4.5332 c7.075-0.3618,13.9907-3.5038,19.24-8.7412c1.4932-1.5067,2.8266-3.1619,3.9746-4.9339c-1.3472,1.2267-2.8051,2.3344-4.353,3.3074 c-7.5574,4.7109-16.6938,5.8918-24.627,3.1832L26.204,38.687z"
          />
          <polygon
            points="36.1664,-14.4511 36.1664,-14.4511 36.1664,-14.4511"
          />
          <path
            fill="#61B2E4"
            d="M24.039,48.551 c0.8703-0.4372,1.7206-0.9178,2.5501-1.438c2.4433-1.5323,4.6776-3.4046,6.6294-5.5552l0.0028-0.0028 c1.8803-2.0911,3.4745-4.4187,4.7329-6.9122c0.061-0.1204,0.0967-0.252,0.1047-0.3867 C34.6604,33.5028,23.2129,44.5071,24.039,48.551L24.039,48.551z"
          />
        </g>
        <g id="hair" />
        <g id="skin" />
        <g id="skin-shadow" />
        <g id="line">
          <path
            d="M48.405,29.49c-3.2761,0-5.941-2.6641-5.941-5.9392s2.6649-5.9392,5.941-5.9392c3.2761,0,5.941,2.6641,5.941,5.9392 S51.6811,29.49,48.405,29.49z M48.405,19.5913c-2.1839,0-3.9607,1.7757-3.9607,3.9595c0,2.1837,1.7768,3.9595,3.9607,3.9595 c2.1838,0,3.9607-1.7758,3.9607-3.9595C52.3657,21.367,50.5888,19.5913,48.405,19.5913z"
          />
          <path
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.949"
            d="M20.653,45.063c-1.678,0.7083-3.2222,1.7475-4.5331,3.0508c-3.1581,3.1631-4.6517,7.5594-3.9703,11.687 c4.128,0.6762,8.5221-0.8196,11.683-3.9769c1.3043-1.3104,2.3446-2.8541,3.0537-4.5318"
          />
          <path
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.949"
            d="M14.923,35.749c-0.69,0.65-1.3472,1.3303-1.9691,2.0383c3.4682,0.9313,6.7846,2.521,9.7604,4.6784 c0.2264-0.414,0.5104-0.7939,0.8435-1.1281c0.6949-0.6935,1.5791-1.1665,2.5417-1.3598c0.2106-4.0507,1.3364-8.0899,3.293-11.814 c0.0019-0.0037,0.0037-0.0074,0.0056-0.0112c-2.645,0.5687-5.2188,1.4928-7.6405,2.7434 C19.2616,32.199,16.9577,33.8349,14.923,35.749L14.923,35.749z"
          />
          <path
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.949"
            d="M31.973,45.839c-0.1919,0.966-0.6657,1.8536-1.3616,2.5507c-0.3389,0.3373-0.7246,0.6241-1.1452,0.8516 c2.1626,2.9716,3.7579,6.2847,4.6952,9.7506c0.7092-0.6216,1.3906-1.2786,2.0417-1.9685c1.9136-2.0343,3.5491-4.3376,4.8516-6.8326 c1.2507-2.4201,2.1751-4.9922,2.7442-7.6354c-3.7285,1.9544-7.7719,3.0771-11.826,3.2837L31.973,45.839z"
          />
          <path
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.949"
            d="M31.83,43.345c0.2696,0.8863,0.2506,1.6919,0.1371,2.5245c7.0759-0.3611,13.993-3.5031,19.243-8.7412 c6.7106-6.7215,9.8836-16.063,8.4351-24.834c-8.7712-1.4365-18.108,1.742-24.823,8.4508 c-5.2322,5.2509-8.3679,12.164-8.7242,19.234c0.9413-0.1907,1.8984-0.0942,2.7693,0.2387"
          />
          <path
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.949"
            d="M37.072,34.196l-0.0002,0c-2.4156,1.2183-4.6724,2.7626-6.6996,4.5844c-2.0849,1.8911-3.9,4.0556-5.3844,6.4211 c-0.5039,0.8031-0.9684,1.6273-1.3917,2.4694"
          />
        </g>
      </svg> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { gsap, MotionPathPlugin } from "gsap/all";
export default {
  name: "HomeView",
  data() {
    return {
      lines: "",
      svg_wrap_style:{border:'1px solid #000',position:'relative' , top:0 , left:0} ,
      svgFlag: false,
    };
  },
  methods: {
    addPath() {
      let dom = document.getElementById("test");
      dom.style.offsetPath = 'path("M172 68 L536 91")';
      console.log(dom);
    },
    /**
     * @description: 动画移动
     * @param {*}
     * @return {*}
     */
    //可以用MotionPathHelper 再浏览器中
    rocketMove() {},
    /**
     * @description:动画控制
     * @param {*}
     * @return {*}
     */

    controlMove(mode) {
      let judgeDom = document.getElementById("rocket-path");
      if (judgeDom.getAttribute("d") == "") {
        return alert("没有路径");
      }
      //创建移动实例
      let _this = this;
      const gsapMove = gsap.to("#adddom", {
        duration: judgeDom.getTotalLength() / 500,
        repeat: 0,
        motionPath: {
          path: "#rocket-path",
          align: "#rocket-path",
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
        onComplete: function () {
          _this.clearDraw();
        },
      });
      console.log(gsapMove);
      //seek 跳转到指定时间 repeat 重复几次  restart 重新播放 delay延迟 resume 继续播放而不改变方向
      switch (mode) {
        case "move":
          gsapMove.play();
          break;
        case "pause":
          gsapMove.pause();
          break;
        case "restart":
          gsapMove.restart();
          break;
        case "reverse":
          console.log(13);
          gsapMove.reverse();
          break;
        default:
          break;
      }
    },
    /**
     * @description: 清空画布
     * @param {*}
     * @return {*}
     */
    clearDraw() {
      // let dom = document.querySelector("#lines");
      // let domChild = dom.childNodes;
      // for (let node of domChild) {
      //   node.setAttribute("d", "");
      // }
      let lines = document.getElementById("rocket-path");
      lines.setAttribute("d", "");
      moveLine.setAttribute("d", "");
    },

    /**
     * @description: 添加dom
     * @param {*}
     * @return {*}
     */
    addDom() {
      let dom = document.createElement("div");
      dom.setAttribute("id", "adddom");
      dom.style.width = "100px";
      dom.style.height = "100px";
      dom.style.backgroundColor = "red";
      dom.style.position = "absolute";
      dom.style.top = "50%";
      dom.style.left = "50%";
      dom.style.transform = "translate(-50% , -50%)";
      console.log(dom);
      const svg_wrap = document.getElementById("svg_wrap");
      svg_wrap.appendChild(dom);
    },
    /**
     * @description: 直线画图
     * @param {*}
     * @return {*}
     */
    onlyLineDraw(){
      gsap.registerPlugin(MotionPathPlugin);
      //定义动态svg最小的宽高
      let minWidth = 0 , minHeight = 0;
      //创建画图
      let addDomPosition = document.getElementById("adddom"); //元素位置
      let svg_content = document.getElementById('svg_content'); //svg容器
      svg_content.style.position = 'absolute';
      svg_content.style.top = parseInt(addDomPosition.offsetTop)-60+'px';
      svg_content.style.left = parseInt(addDomPosition.offsetLeft)-60+'px';
      const container = document.getElementById("container");
      container.setAttribute('width',addDomPosition.offsetWidth + 20);
      container.setAttribute('height',addDomPosition.offsetHeight + 20);
      let lineD;
      container.onmousedown = function (e) {
        let beginX = e.offsetX;
        let beginY = e.offsetY;
        if (lines.lastElementChild.getAttribute("d") == "") {
          lineD = "M" + beginX + " " + beginY;
        } else {
          lineD += " L" + beginX + " " + beginY;
        }
        lines.lastElementChild.setAttribute("d", lineD);
        container.onmousemove = function (ev) {
          let changeWidth = parseInt(container.getAttribute('width'))+ev.movementX;
          let changeHeight = parseInt(container.getAttribute('height'))+ev.movementY;
          container.setAttribute('width',changeWidth > minWidth ?  changeWidth : minWidth);
          container.setAttribute('height',changeHeight > minHeight ? changeHeight : minHeight);
          let moveX = ev.offsetX;
          let moveY = ev.offsetY;
          let move = "M" + beginX + " " + beginY + " L" + moveX + " " + moveY;
          moveLine.setAttribute("d", move);
        };
        container.onmouseup = function (e) {
          lineD += " L" + e.offsetX + " " + e.offsetY;
          lines.lastElementChild.setAttribute("d", lineD);
          minWidth = parseInt(container.getAttribute('width'));
          minHeight = parseInt(container.getAttribute('height'));
          container.onmousemove = null;
        };
      };
    },
    /**
     * @description: 链接线画图
     * @param {*}
     * @return {*}
     */
    lineDraw() {
      this.clearDraw();
      gsap.registerPlugin(MotionPathPlugin);
      //创建画图
      let addDomPosition = document.getElementById("adddom").getBoundingClientRect(); //元素位置
      let svg_content = document.getElementById('svg_content'); //svg容器
      svg_content.style.height = '100%';
      svg_content.style.width = '100%';
      const container = document.getElementById("container");
      
      container.setAttribute('width',svg_content.offsetWidth);
      container.setAttribute('height',svg_content.offsetHeight);
      const rocket = document.getElementById("rocket");
      let lineD;
      container.onmousedown = function (e) {

        if (lines.lastElementChild.getAttribute("d") == "") {
          //只能从dom元素周围作为起点
          if (
            e.offsetX <
              addDomPosition.offsetLeft - addDomPosition.offsetWidth / 2 - 10 ||
            e.offsetX >
              addDomPosition.offsetLeft + addDomPosition.offsetWidth / 2 + 10 ||
            e.offsetY <
              addDomPosition.offsetTop - addDomPosition.offsetHeight / 2 - 10 ||
            e.offsetY >
              addDomPosition.offsetTop + addDomPosition.offsetHeight / 2 + 10
          ) {
            console.log(11);
            return;
          }
        }
        let beginX = e.offsetX;
        let beginY = e.offsetY;
        if (lines.lastElementChild.getAttribute("d") == "") {
          lineD = "M" + beginX + " " + beginY;
        } else {
          lineD += " L" + beginX + " " + beginY;
        }
        lines.lastElementChild.setAttribute("d", lineD);
        container.onmousemove = function (ev) {;
          let moveX = ev.offsetX;
          let moveY = ev.offsetY;
          let move = "M" + beginX + " " + beginY + " L" + moveX + " " + moveY;
          moveLine.setAttribute("d", move);
        };
        container.onmouseup = function (e) {
          lineD += " L" + e.offsetX + " " + e.offsetY;
          lines.lastElementChild.setAttribute("d", lineD);
          container.onmousemove = null;
        };
      };
    },
  },

  mounted() {
    // 自定义路径
    // rocket.onmousedown = function () {};
    // container.onmousedown = function (e) {
    //   var beginX = e.offsetX;
    //   var beginY = e.offsetY;
    //   var lineD;
    //   lines.innerHTML +=
    //     '<path id="rocket-path" stroke="#4af" stroke-dasharray="20" stroke-miterlimit="10" d="" />';
    //   container.onmousemove = function (ev) {
    //   };
    //   document.onmouseup = function (ev) {
    //      if (lines.lastElementChild.getAttribute("d") == "") {
    //       lineD =
    //         "M" + beginX + " " + beginY + " L" + ev.offsetX + " " + ev.offsetY;
    //     } else {
    //       lineD += " L" + ev.offsetX + " " + ev.offsetY;
    //     }
    //     lines.lastElementChild.setAttribute("d", lineD);
    //     // console.log(document.getElementById('rocket-path').getTotalLength());
    //     console.log(lines);
    //     container.onmousedown = null;
    //     container.onmousemove = null;
    //     document.onmouseup = null;
    //   };
    // };
  },
};
</script>
<style scoped lang="less">
.box {
  padding: 0.25rem;
  background: lightgreen;
  width: 3rem;
  height: 3rem;
  margin-right: 0.25rem;
}
#svg_wrap {
  position: relative;
  width: 800px;
  height: 600px;
  border: 1px solid black;
  margin: 0 auto;
}
.button_wrap {
  margin: 15px auto;
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: space-around;
}
// #container {
//   width: 100%;
// }
#test {
  width: 100px;
  height: 100px;
  background-color: yellowgreen;
}
.lineDrawStyle{
  width: 100%;
  height: 100%;
}
//dom块中画图
#move_wrap {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid black;
}
</style>
