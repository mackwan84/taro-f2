import Taro, { Component, Config } from '@tarojs/taro';
import F2Canvas from "../../../components/f2-canvas/f2-canvas";
import {View} from '@tarojs/components';


const F2 = require("@antv/f2");



export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '渐变色柱状图',
    disableScroll: true,
  };

  state = { };

    initChart (canvas, width, height) {
    F2Canvas.fixF2(F2);
    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 }
    ];
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.tooltip({
      showItemMarker: false,
      onShow(ev) {
        const { items } = ev;
        items[0].name = null;
        items[0].name = items[0].title;
        items[0].value = '¥ ' + items[0].value;
      }
    });
    chart.interval().position('year*sales').color('l(90) 0:red 1:white'); // 使用创建的渐变色对象进行颜色填充
    chart.render();
    return chart;
  }

  render () {
    return (
      <View className='full-screen'><F2Canvas onCanvasInit={this.initChart.bind(this)}></F2Canvas></View>
    )
  }
}

