import Taro, { Component, Config } from '@tarojs/taro';
import F2Canvas from "../../../components/f2-canvas/f2-canvas";
import {fixF2} from "../../../common/f2-tool"
import {View} from '@tarojs/components';


const F2 = require("@antv/f2/lib/index");



export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '玫瑰图',
    disableScroll: true,
  };

  state = { };

  initChart (canvas, width, height) {
    fixF2(F2);
    const data = [
      { year: '2001', population: 41.8 },
      { year: '2002', population: 25.8 },
      { year: '2003', population: 31.7 },
      { year: '2004', population: 46 },
      { year: '2005', population: 28 }
    ];

    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data);
    chart.coord('polar');
    chart.legend({
      position: 'right'
    });
    chart.axis(false);
    chart.interval().position('year*population')
      .color('year')
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
    return chart;
  }

  render () {
    return (
      <View className='full-screen'><F2Canvas onCanvasInit={this.initChart.bind(this)}></F2Canvas></View>
    )
  }
}

