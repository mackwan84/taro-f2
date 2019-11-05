import Taro, { Component, Config } from '@tarojs/taro';
import F2Canvas from "../../../components/f2-canvas/f2-canvas";
import {fixF2} from "../../../common/f2-tool"
import data from '../../../data/steps-pan.js'
import {View} from '@tarojs/components';


const F2 = require("@antv/f2/lib/index");
require('@antv/f2/lib/interaction/');
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar');
F2.Chart.plugins.register([ScrollBar]);


function formatNumber(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '每日步数（柱状图平移）',
    disableScroll: true,
  };

  state = { };

    initChart (canvas, width, height) {
    fixF2(F2);
    const originDates = [];
    data.forEach(obj => {
      if (obj.date >= '2018-05-01') {
        originDates.push(obj.date);
      }
    });

    const chart = new F2.Chart({
      el: canvas,
      width,
      height,
      animate: false
    });

    chart.source(data, {
      date: {
        type: 'timeCat',
        tickCount: 5,
        values: originDates,
        mask: 'MM-DD'
      },
      steps: {
        tickCount: 5
      }
    });

    chart.axis('date', {
      tickLine: {
        length: 4,
        stroke: '#cacaca'
      },
      label: {
        fill: '#cacaca'
      },
      line: {
        top: true
      }
    });
    chart.axis('steps', {
      position: 'right',
      label(text) {
        return {
          text: formatNumber(text * 1),
          fill: '#cacaca'
        };
      },
      grid: {
        stroke: '#d1d1d1'
      }
    });
    chart.tooltip({
      showItemMarker: false,
      background: {
        radius: 2,
        padding: [3, 5]
      },
      onShow(ev) {
        const items = ev.items;
        items[0].name = '';
        items[0].value = items[0].value + ' 步';
      }
    });
    chart.interval().position('date*steps').style({
      radius: [ 2, 2, 0, 0 ]
    });

    // 定义进度条
    chart.scrollBar({
      mode: 'x',
      xStyle: {
        backgroundColor: '#e8e8e8',
        fillerColor: '#808080',
        offsetY: -2
      }
    });
    chart.interaction('pan');
    chart.render();
    return chart;
  }

  render () {
    return (
      <View className='full-screen'><F2Canvas onCanvasInit={this.initChart.bind(this)}></F2Canvas></View>
    )
  }
}

