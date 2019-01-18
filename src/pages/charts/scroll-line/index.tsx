import Taro, { Component, Config } from '@tarojs/taro';
import data from '../../../data/sroll-line.js'
import F2Canvas from "../../../components/f2-canvas/f2-canvas";
import {View} from '@tarojs/components';

/* 引入F2 */
const F2 = require("@antv/f2");
require('@antv/f2/lib/interaction/');
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar');
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
F2.Chart.plugins.register([ScrollBar, Tooltip]);



export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '线图平移交互(长按展示 tooltip)',
    disableScroll: true,
  };

  state = { };

  initChart(canvas, width, height, F2) {
    const chart = new F2.Chart({
      el: canvas,
      width,
      height,
      animate: false
    });
    chart.source(data, {
      release: {
        min: 1990,
        max: 2010
      }
    });
    chart.tooltip({
      showCrosshairs: true,
      showItemMarker: false,
      background: {
        radius: 2,
        fill: '#1890FF',
        padding: [3, 5]
      },
      nameStyle: {
        fill: '#fff'
      },
      onShow(ev) {
        const items = ev.items;
        items[0].name = items[0].title;
      }
    });
    chart.line().position('release*count');
    chart.point()
      .position('release*count')
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });

    chart.interaction('pan');
    // 定义进度条
    chart.scrollBar({
      mode: 'x',
      xStyle: {
        offsetY: -5
      }
    });

    // 绘制 tag
    chart.guide().tag({
      position: [ 1969, 1344 ],
      withPoint: false,
      content: '1,344',
      limitInPlot: true,
      offsetX: 5,
      direct: 'cr'
    });
    chart.render();
    return chart;
  }

  render () {
    return (
      <View className='full-screen'><F2Canvas F2={F2} onCanvasInit={this.initChart.bind(this)}></F2Canvas></View>
    )
  }
}

