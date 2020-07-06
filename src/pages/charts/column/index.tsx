import Taro, { Component, Config } from '@tarojs/taro';
import F2Canvas from '../../../components/f2-canvas/f2-canvas';
import { fixF2 } from '../../../common/f2-tool';
import { View } from '@tarojs/components';

const F2 = require('@antv/f2/lib/index');

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '柱状图',
    disableScroll: true,
  };

  state = {};

  initChart(canvas, width, height) {
    fixF2(F2);
    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ];
    const chart = new F2.Chart({
      el: canvas,
      width,
      height,
    });

    chart.source(data, {
      sales: {
        tickCount: 5,
      },
    });
    chart.tooltip({
      showItemMarker: false,
      onShow(ev) {
        const { items } = ev;
        items[0].name = null;
        items[0].name = items[0].title;
        items[0].value = '¥ ' + items[0].value;
      },
    });
    chart.interval().position('year*sales');
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
