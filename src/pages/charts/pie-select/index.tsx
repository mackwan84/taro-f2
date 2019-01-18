import Taro, { Component, Config } from '@tarojs/taro';
import F2Canvas from "../../../components/f2-canvas/f2-canvas";
import {View, Text} from '@tarojs/components';

/* 引入F2 */
const F2 = require("@antv/f2");



export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '饼图选中交互',
    disableScroll: true,
  };

  state = {
    message: '',
  };

  initChart (canvas, width, height, F2) {
    var data = [
      { name: '芳华', percent: 0.4, a: '1' },
      { name: '妖猫传', percent: 0.2, a: '1' },
      { name: '机器之血', percent: 0.18, a: '1' },
      { name: '心理罪', percent: 0.15, a: '1' },
      { name: '寻梦环游记', percent: 0.05, a: '1' },
      { name: '其他', percent: 0.12, a: '1' }
    ];
    var chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          return val * 100 + '%';
        }
      }
    });
    chart.legend({
      position: 'right'
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85,
      innerRadius: 0.618
    });
    chart.axis(false);
    chart
      .interval()
      .position('a*percent')
      .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      });

    chart.interaction('pie-select', {
      cancelable: false, // 不允许取消选中
      animate: {
        duration: 300,
        easing: 'backOut'
      },
      onEnd: (ev) => {
        const { shape, data, shapeInfo, selected } = ev;
        if (shape) {
          if (selected) {
            this.setState({
              message: data.name + ': ' + data.percent * 100 + '%'
            });
          }
        }
      }
    });
    chart.render();
    return chart;
  }

  render () {
    return (
      <View className='full-screen'>
        <View style='height: 20%;'><Text>{this.state.message}</Text></View>
        <View style='height: 80%;'>
          <F2Canvas  onCanvasInit={this.initChart.bind(this)}></F2Canvas>
        </View>
      </View>
    )
  }
}

