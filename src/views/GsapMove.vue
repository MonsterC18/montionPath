
<template>
  <div>
    <button @click="move">start</button>
    <div class="gsap-wrap">

      <div class="item">
        <div class="ball1"></div>
      </div>
      <div class="item">
        <div class="ball2"></div>
        <div class="ball3"></div>
        <div class="ball4"></div>
        <div class="ball5"></div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>

    </div>
  </div>
</template>

<script>
import { gsap, Linear, MotionPathPlugin,TimelineLite,TweenLite } from "gsap/all";
export default {
    name:'GsapMove',
    data(){
        return{

        }
    },
    mounted(){
    },
    methods:{
        move(){
            this.ball1Move()
            this.ballsMove()
        },
        ball1Move(){
             gsap.registerPlugin(TweenLite);
             TweenLite.to('.ball1',2,{
                x:100,
                ease:Linear.easeNone
             })
        },
        ballsMove(){
            let tl = new TimelineLite()
            tl.from(".ball2",1,{
                y:"-=60x",
                autoAlpha:0
            }).from(".ball3",1,{
                x:'+=60px',
                autoAlpha:0
            }).from(".ball4",1,{
                y:'+=60px',
                autoAlpha:0
            }).from(".ball5",1,{
                x:'-=60px',
                autoAlpha:0
            })

            //等同于
            // tl.add(TweenLite.from("#ball1", 1, {
            //     y: "-=60px",
            //     autoAlpha: 0
            // }));
        }
    }
}
</script>

<style lang="less" scoped>
.gsap-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;

  .item {
    margin: 10px;
    width: 300px;
    height: 200px;
    border: 1px dashed #9f9fa7;
    *{
        margin:  0 auto;
    }
  }
  .ball1{
    width: 30px;
    height: 30px;
    background-color: orange;
    border-radius: 50%;
  }
  .ball2{
    width: 30px;
    height: 30px;
    background-color: orange;
    border-radius: 50%;
  }
  .ball3 {
    width: 30px;
    height: 30px;
    background-color: blue;
    border-radius: 50%;
  }
  .ball4 {
    width: 30px;
    height: 30px;
    background-color: palevioletred;
    border-radius: 50%;
  }
  .ball5 {
    width: 30px;
    height: 30px;
    background-color: green;
    border-radius: 50%;
  }
}
</style>