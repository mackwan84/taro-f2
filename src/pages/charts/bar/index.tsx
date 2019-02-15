import Taro, { Component, Config } from '@tarojs/taro';
import F2Canvas from "../../../components/f2-canvas/f2-canvas";
import {View} from '@tarojs/components';

const F2 = require("@antv/f2");

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '条形图',
    disableScroll: true,
  };

  state = { };

    initChart (canvas, width, height) {
    F2Canvas.fixF2(F2);
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    var Global = F2.Global;
    var data = [
      { country: '巴西', population: 18203 },
      { country: '印尼', population: 23489 },
      { country: '美国', population: 29034 },
      { country: '印度', population: 104970 },
      { country: '中国', population: 131744 }
    ];

    chart.source(data, {
      population: {
        tickCount: 5
      }
    });
    chart.coord({
      transposed: true
    });
    chart.axis('country', {
      line: Global._defaultAxis.line,
      grid: null
    });
    chart.axis('population', {
      line: null,
      grid: Global._defaultAxis.grid,
      label: function label(text, index, total) {
        var textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.interval().position('country*population');
    chart.render();

    return chart;
  }

  render () {
    return (
      <View className='full-screen'><F2Canvas onCanvasInit={this.initChart.bind(this)}></F2Canvas></View>
    )
  }
}

