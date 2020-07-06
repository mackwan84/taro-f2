import Taro, { Component, Config } from '@tarojs/taro';
import F2Canvas from '../../../components/f2-canvas/f2-canvas';
import { fixF2 } from '../../../common/f2-tool';
import { View } from '@tarojs/components';

const F2 = require('@antv/f2/lib/index');

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '层叠条形图',
    disableScroll: true,
  };

  state = {};

  initChart(canvas, width, height) {
    fixF2(F2);
    const data = [
      { State: 'WY', 年龄段: '小于5岁', 人口数量: 25635 },
      { State: 'WY', 年龄段: '5至13岁', 人口数量: 1890 },
      { State: 'WY', 年龄段: '14至17岁', 人口数量: 9314 },
      { State: 'DC', 年龄段: '小于5岁', 人口数量: 30352 },
      { State: 'DC', 年龄段: '5至13岁', 人口数量: 20439 },
      { State: 'DC', 年龄段: '14至17岁', 人口数量: 10225 },
      { State: 'VT', 年龄段: '小于5岁', 人口数量: 38253 },
      { State: 'VT', 年龄段: '5至13岁', 人口数量: 42538 },
      { State: 'VT', 年龄段: '14至17岁', 人口数量: 15757 },
      { State: 'ND', 年龄段: '小于5岁', 人口数量: 51896 },
      { State: 'ND', 年龄段: '5至13岁', 人口数量: 67358 },
      { State: 'ND', 年龄段: '14至17岁', 人口数量: 18794 },
      { State: 'AK', 年龄段: '小于5岁', 人口数量: 72083 },
      { State: 'AK', 年龄段: '5至13岁', 人口数量: 85640 },
      { State: 'AK', 年龄段: '14至17岁', 人口数量: 22153 },
    ];
    const chart = new F2.Chart({
      el: canvas,
      width,
      height,
    });

    chart.source(data, {
      人口数量: {
        tickCount: 5,
      },
    });
    chart.coord({
      transposed: true,
    });
    chart.axis('State', {
      line: F2.Global._defaultAxis.line,
      grid: null,
    });
    chart.axis('人口数量', {
      line: null,
      grid: F2.Global._defaultAxis.grid,
      label(text, index, total) {
        const textCfg = {
          text: text / 1000 + ' k',
        };
        if (index === 0) {
          textCfg.textAlign = 'left';
        }
        if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      },
    });
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
      onChange(obj) {
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.map((item) => {
          map[item.name] = Object.assign({}, item);
        });
        tooltipItems.map((item) => {
          const { name, value } = item;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(Object.values(map));
      },
      onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      },
    });
    chart.interval().position('State*人口数量').color('年龄段').adjust('stack');

    chart.render();
    return chart;
  }

  render() {
    return (
      <View className='full-screen'>
        <F2Canvas onCanvasInit={this.initChart.bind(this)}></F2Canvas>
      </View>
    );
  }
}
