import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
  };

  state: {
    charts: { name: string; value: string }[];
    others: { name: string; value: string }[];
  } = {
    charts: [
      { name: 'radial-bar', value: 'iwatch健康记录' }, // ok
      { name: 'line', value: '折线图' }, // ok
      { name: 'area', value: '区域图' }, // ok
      { name: 'column', value: '柱状图' }, // ok
      { name: 'bar', value: '条形图' }, // ok
      { name: 'dodge', value: '分组柱状图' }, // ok
      { name: 'stackBar', value: '层叠条形图' }, // ok
      { name: 'ring', value: '环图' }, // ok
      { name: 'pie', value: '饼图' }, // ok
      { name: 'rose', value: '玫瑰图' }, // ok
      { name: 'radar', value: '雷达图' }, // ok
      { name: 'gauge', value: '仪表盘' }, // ok
      { name: 'double-axis', value: '双 Y 轴' }, // ok
      { name: 'k', value: 'K 线图(异步获取数据)' }, // ok
      { name: 'stack-area', value: '层叠区域图' }, // ok
      { name: 'multiCharts', value: '多图表好性能' }, // ok
    ],
    others: [
      { name: 'scroll-line', value: '线图平移交互(长按展示 tooltip)' }, // ok 长按真机貌似有问题 虚拟机可以 ???
      { name: 'steps-pan', value: '每日步数（柱状图平移）' }, // ok
      { name: 'pie-select', value: '饼图选中交互' }, // ok
      { name: 'column-select', value: '柱状图选中交互(可取消选中)' }, // ok
      { name: 'gradient-column', value: '渐变色柱状图' }, // ok
      { name: 'save-image', value: '保存图片' }, // ok
    ],
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  gotoPage(page) {
    Taro.navigateTo({
      url: '/pages/charts/' + page + '/index',
    });
  }

  render() {
    return (
      <View className='index'>
        <View className='others'>
          {this.state.others.map((v) => (
            <View key={v.name} className='item' hoverClass='hover' onClick={this.gotoPage.bind(this, v.name)}>
              <Text>{v.value}</Text>
            </View>
          ))}
        </View>
        <View className='charts'>
          {this.state.charts.map((v) => (
            <View key={v.name} className='item' hoverClass='hover' onClick={this.gotoPage.bind(this, v.name)}>
              <Image
                className='image'
                mode='aspectFit'
                src={'https://github.com/antvis/wx-f2/blob/master/img/' + v.name + '.png?raw=true'}
              />
              <View className='text'>{v.value}</View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
