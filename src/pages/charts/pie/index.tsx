import Taro, { Component, Config } from '@tarojs/taro';
import F2Canvas, {f2Fix} from "../../../components/f2-canvas/f2-canvas";
import {View} from '@tarojs/components';

/* 引入F2 */
const F2 = require("@antv/f2");

/* 补丁 */
f2Fix(F2);

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '饼图',
    disableScroll: true,
  };

  state = { };

  initChart (canvas, width, height) {
    const map = {
      '芳华': '40%',
      '妖猫传': '20%',
      '机器之血': '18%',
      '心理罪': '15%',
      '寻梦环游记': '5%',
      '其他': '2%',
    };
    const data = [
      { name: '芳华', percent: 0.4, a: '1' },
      { name: '妖猫传', percent: 0.2, a: '1' },
      { name: '机器之血', percent: 0.18, a: '1' },
      { name: '心理罪', percent: 0.15, a: '1' },
      { name: '寻梦环游记', percent: 0.05, a: '1' },
      { name: '其他', percent: 0.02, a: '1' }
    ];
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data, {
      percent: {
        formatter(val) {
          return val * 100 + '%';
        }
      }
    });
    chart.legend({
      position: 'right',
      itemFormatter(val) {
        return val + '  ' + map[val];
      }
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85
    });
    chart.axis(false);
    chart.interval()
      .position('a*percent')
      .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      })
      .animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
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

