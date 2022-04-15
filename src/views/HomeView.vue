<!--
 * @Author: your name
 * @Date: 2022-04-08 16:28:21
 * @LastEditTime: 2022-04-15 11:12:18
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
      <button @click="lineDraw">自由画图</button>
      <button>圆弧画图</button>
      <button @click="onlyLineDraw">直线画图</button>
      <button @click="addDom">添加</button>
      <button @click="complete">完成</button>
    </div>

    <div id="svg_wrap">
      <div id="svg_content" :class="svgFlag == 0 ? '' : 'disappear'">
        <!-- 折线画布 -->
        <svg
          version="1.1"
          id="container"
          style="
            border: 1px solid #000;
            position: relative;
            top: 0;
            left: 0;
            z-index: 30;
          "
          xmlns:svg="http://www.w3.org/2000/svg"
          xml:space="preserve"
        >
          <g id="lines" stroke="#4af" stroke-width="2" fill="none">
            <path
              stroke="#4af"
              stroke-dasharray="5"
              stroke-miterlimit="5"
              d=""
              id="moveLine"
            />
            <path
              stroke="#4af"
              stroke-dasharray="5"
              stroke-miterlimit="5"
              d=""
              id="rocket_path"
            />
          </g>
        </svg>
      </div>
      <div id="true_svg" :class="svgFlag == 1 || svgFlag == 2 || svgFlag == 3? '' : 'disappear'" :style=" svgFlag == 3 ? 'opacity : 0' : 'opacity : 1'">
        <svg
          version="1.1"
          id="true_container"
          style="
            border: 1px solid #000;
            position: relative;
            z-index: 30;
            pointer-events: none;
          "
          xmlns:svg="http://www.w3.org/2000/svg"
          xml:space="preserve"
        >
          <g id="true_lines" stroke="#4af" stroke-width="2" fill="none">
            <path
              stroke="#4af"
              stroke-dasharray="5"
              stroke-miterlimit="5"
              d=""
              id="true_path"
            />
          </g>
        </svg>
      </div>
      <div
        id="copy_dom"
        :style="copyFlag ? 'display:none' : ''"
        v-on:mousedown="onMouseDown('copy_dom', $event)"
        v-on:mousemove="onMouseMove($event)"
        v-on:mouseout="onMouseOut('copy_dom')"
      ></div>
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
      svgFlag: 0,
      copyFlag: true,
      //拖拽
      choiceDom: null, // 鼠标选中的DOM
      mouse: {
        // 鼠标相关属性
        init: {
          // 鼠标移动前的位置属性, 如果鼠标还未Click过, 则为空
          x: null, // 鼠标x轴定位
          y: null, // 鼠标y轴定位
        },
      },
    };
  },
  watch: {
    // svgFlag:{
    //   handler(newVal,oldVal){
    //     if(newVal){
    //       this.svg_wrap_style = {border:'1px solid #000',position:'relative' , top:0 , left:0 }
    //     }else{
    //     }
    //   },
    //   immediate:true
    // }
  },
  methods: {
    /**
     * @description: 绑定copydom的拖拽方法
     * @param {*}
     * @return {*}
     */
    onMouseOut: function (domID) {
      // 鼠标若移动太快, 则会划出DIV, 本方法即对此事件的处理
      if (this.choiceDom === null) {
        // 如果尚未选中DOM
        return; // 立即退出方法
      }

      if (this.choiceDom.id === domID) {
        // 如果离开的DOM是当前选中的DOM
        this.choiceDom = null; // 则将选中的DON置空
      }
    },
    onMouseDown: function (domID, event) {
      // 当鼠标按下某DOM
      this.choiceDom = document.getElementById(domID); // 获取dom object

      this.mouse.init.x = event.clientX; // 获取鼠标X轴定位
      this.mouse.init.y = event.clientY; // 获取鼠标Y轴定位
    },

    onMouseUp: function () {
      // 鼠标左键弹起处理
      this.choiceDom = null; // 置空选中元素
    },
    onMouseMove: function (event) {
      if (this.choiceDom === null) {
        // 如果没有选中的元素
        return; // 立即结束
      }
      let domLeft =
        this.choiceDom.offsetLeft + event.clientX - this.mouse.init.x;
      let domTop = this.choiceDom.offsetTop + event.clientY - this.mouse.init.y;
      this.mouse.init.x = event.clientX;
      this.mouse.init.y = event.clientY;
      this.choiceDom.style.left = `${domLeft}px`;
      this.choiceDom.style.top = `${domTop}px`;

      this.copydomMove();
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
      let judgeDom = document.getElementById("true_path");
      if (judgeDom.getAttribute("d") == "") {
        return alert("没有路径");
      }
      //创建移动实例
      let _this = this;
      this.svgFlag = 3;
      const gsapMove = gsap.to("#adddom", {
        duration: judgeDom.getTotalLength() / 500,
        repeat: 0,
        motionPath: {
          path: "#true_path",
          align: "#true_path",
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
        onComplete: function () {
          _this.svgFlag = 2;
          gsapMove.pause(0);
          
        },
      });
      //seek 跳转到指定时间 repeat 重复几次  restart 重新播放 delay延迟 resume 继续播放而不改变方向
      switch (mode) {
        case "move":
          this.svgFlag = 3;
          gsapMove.play();
          break;
        case "pause":
          gsapMove.pause();
          break;
        case "restart":
          gsapMove.restart();
          break;
        case "reverse":
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
      let lines = document.getElementById("rocket_path");
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
      const _this = this;
      dom.setAttribute("id", "adddom");
      dom.style.width = "100px";
      dom.style.height = "100px";
      dom.style.backgroundColor = "red";
      dom.style.position = "absolute";
      dom.style.top = "50%";
      dom.style.left = "50%";

      dom.style.transform = "translate(-50% , -50%)";
      dom.addEventListener("mousedown", (e) => {
        _this.onMouseDown("adddom", e);
      });
      dom.addEventListener("mousemove", (e) => {
        _this.onMouseMove(e);
      });
      dom.addEventListener("mouseleave", (e) => {
        _this.onMouseOut("adddom");
      });
      const svg_wrap = document.getElementById("svg_wrap");
      svg_wrap.appendChild(dom);
    },
    /**
     * @description: dom 拖拽
     * @param {*}
     * @return {*}
     */

    /**
     * @description: 直线画图
     * @param {*}
     * @return {*}
     */
    onlyLineDraw() {
      gsap.registerPlugin(MotionPathPlugin);
      //定义动态svg最小的宽高
      let minWidth = 0,
        minHeight = 0;
      //创建画图
      this.svgFlag = 1;

      let svg_wrap = document.getElementById("svg_wrap");
      let addDomPosition = document.getElementById("adddom"); //元素位置
      let svg_content = document.getElementById("true_container"); //svg容器
      let true_path = document.getElementById("true_path");
      let true_svg_direction = document.getElementById("true_svg");
      let initWidth =
        (document.getElementById("svg_wrap").offsetWidth -
          addDomPosition.offsetWidth) /
        2;
      //点击初始化svg_box_position,定位, 初始化box大小
      true_svg_direction.style.position = "relative";
      true_svg_direction.style.top = addDomPosition.offsetTop + "px";
      true_svg_direction.style.left = addDomPosition.offsetLeft + "px";
      true_svg_direction.style.height = "80px";
      true_svg_direction.style.width = initWidth + "px";

      //复制dom
      let copy_dom = document.getElementById("copy_dom");
      copy_dom.style.cssText = addDomPosition.style.cssText;
      copy_dom.style.top = addDomPosition.offsetTop + 80 + "px";
      copy_dom.style.left = addDomPosition.offsetLeft + initWidth + "px";
      this.copyFlag = false;
      // let copyDom = addDomPosition;
      // copyDom.setAttribute('')
      true_path.setAttribute("d", `M0 0 ${initWidth} 80`);
      // container.onmousedown = function (e) {
      //   let beginX = e.offsetX;
      //   let beginY = e.offsetY;
      //   if (lines.lastElementChild.getAttribute("d") == "") {
      //     lineD = "M" + beginX + " " + beginY;
      //   } else {
      //     lineD += " L" + beginX + " " + beginY;
      //   }
      //   lines.lastElementChild.setAttribute("d", lineD);
      //   container.onmousemove = function (ev) {
      //     let changeWidth =
      //       parseInt(container.getAttribute("width")) + ev.movementX;
      //     let changeHeight =
      //       parseInt(container.getAttribute("height")) + ev.movementY;
      //     container.setAttribute(
      //       "width",
      //       changeWidth > minWidth ? changeWidth : minWidth
      //     );
      //     container.setAttribute(
      //       "height",
      //       changeHeight > minHeight ? changeHeight : minHeight
      //     );
      //     let moveX = ev.offsetX;
      //     let moveY = ev.offsetY;
      //     let move = "M" + beginX + " " + beginY + " L" + moveX + " " + moveY;
      //     moveLine.setAttribute("d", move);
      //   };
      //   container.onmouseup = function (e) {
      //     lineD += " L" + e.offsetX + " " + e.offsetY;
      //     lines.lastElementChild.setAttribute("d", lineD);
      //     minWidth = parseInt(container.getAttribute("width"));
      //     minHeight = parseInt(container.getAttribute("height"));
      //     container.onmousemove = null;
      //   };
      // };
    },
    /**
     * @description: 修改path
     * @param {*}
     * @return {*}
     */
    copydomMove() {
      let true_svg_direction = document.getElementById("true_svg");
      let addDomPosition = document.getElementById("adddom"); //初始元素位置
      let true_path = document.getElementById("true_path");
      let copy_dom = document.getElementById("copy_dom");
      //定义改变svgbox大小
      let changeHeight, changeWidth;
      if (this.choiceDom.getAttribute("id") == "adddom") {
        changeHeight = copy_dom.offsetTop-this.choiceDom.offsetTop;
        changeWidth = copy_dom.offsetLeft - this.choiceDom.offsetLeft;
        
        true_svg_direction.style.top = this.choiceDom.offsetTop + "px";
        true_svg_direction.style.left = this.choiceDom.offsetLeft + "px";
      } else {
        changeHeight = this.choiceDom.offsetTop - addDomPosition.offsetTop;
        changeWidth = this.choiceDom.offsetLeft - addDomPosition.offsetLeft;
      }
      true_svg_direction.style.width = Math.abs(changeWidth) + "px";
      true_svg_direction.style.height = Math.abs(changeHeight) + "px";
      //当移动到上半区域
      if (changeHeight < 0) {
        true_svg_direction.style.top =
          eval(addDomPosition.offsetTop + changeHeight) + "px";
        if (changeWidth < 0) {
          true_svg_direction.style.left =
            eval(addDomPosition.offsetLeft + changeWidth) + "px";
          return true_path.setAttribute(
            "d",
            `M${Math.abs(changeWidth)} ${Math.abs(changeHeight)} 0 0`
          );
        }
        return true_path.setAttribute(
          "d",
          `M0 ${Math.abs(changeHeight)}  ${Math.abs(changeWidth)} 0`
        );
        // console.log(changeWidth )
        // true_svg_direction.style.left = eval(true_svg_direction.offsetLeft + changeWidth) + 'px';
      }
      //当移动到下半 左区域
      if (changeHeight >= 0 && changeWidth < 0) {
        true_svg_direction.style.left =
          eval(addDomPosition.offsetLeft + changeWidth) + "px";
        return true_path.setAttribute(
          "d",
          `M${Math.abs(changeWidth)}  0 0 ${Math.abs(changeHeight)}`
        );
      }
      // console.log(changeWidth)

      console.log(changeHeight, changeWidth);

      true_path.setAttribute(
        "d",
        `M0 0 ${Math.abs(changeWidth)} ${Math.abs(changeHeight)}`
      );
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
      let addDomPosition = document.getElementById("adddom"); //元素位置
      console.log(addDomPosition);
      let svg_content = document.getElementById("svg_content"); //svg容器
      svg_content.style.height = "100%";
      svg_content.style.width = "100%";
      const container = document.getElementById("container");
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
        container.onmousemove = function (ev) {
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

    /**
     * @description: 完成连接线画图后，隐藏作画画布，显示动态路径画布
     * @param {*}
     * @return {*}
     */
    complete() {
      const lines_posititon = document
        .getElementById("lines")
        .getBoundingClientRect();
      const true_path = document.getElementById("true_path");
      const svg_wrap = document.getElementById("svg_wrap");
      let true_svg = document.getElementById("true_svg");

      true_svg.style.position = "relative";
      true_svg.style.top = lines_posititon.top - svg_wrap.offsetTop + "px";
      true_svg.style.left = lines_posititon.left - svg_wrap.offsetLeft + "px";
      true_svg.style.width = lines_posititon.width + 5 + "px";
      true_svg.style.height = lines_posititon.height + 5 + "px";

      let arr = document
        .getElementById("rocket_path")
        .getAttribute("d")
        .split(" ");
      // path d属性转化
      for (let i = 0; i < arr.length; i++) {
        if (i == 0) {
          arr[i] =
            "M" +
            (
              arr[i].substring(1) -
              (lines_posititon.left - svg_wrap.offsetLeft - 2)
            ).toString();
        } else if (i == 1) {
          arr[i] = arr[i] - (lines_posititon.top - svg_wrap.offsetTop) + 2;
        } else if (arr[i].includes("L")) {
          arr[i] =
            "L" +
            (
              arr[i].substring(1) -
              (lines_posititon.left - svg_wrap.offsetLeft - 2)
            ).toString();
        } else {
          arr[i] = arr[i] - (lines_posititon.top - svg_wrap.offsetTop) + 2;
        }
      }
      true_path.setAttribute("d", arr.join(" ").toString());
    },
  },

  mounted() {
    window.onmouseup = this.onMouseUp; // 设置监听全窗口鼠标弹起事件
    // 自定义路径
    // rocket.onmousedown = function () {};
    // container.onmousedown = function (e) {
    //   var beginX = e.offsetX;
    //   var beginY = e.offsetY;
    //   var lineD;
    //   lines.innerHTML +=
    //     '<path id="rocket_path" stroke="#4af" stroke-dasharray="20" stroke-miterlimit="10" d="" />';
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
    //     // console.log(document.getElementById('rocket_path').getTotalLength());
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
#container {
  width: 100%;
  height: 100%;
}
#test {
  width: 100px;
  height: 100px;
  background-color: yellowgreen;
}
.lineDrawStyle {
  width: 100%;
  height: 100%;
}
#true_container {
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
//隐藏画布
.disappear {
  display: none;
}
.svg_content {
  position: relative;
}
</style>
