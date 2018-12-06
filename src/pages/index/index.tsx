import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import F2Canvas from '../../components/f2-canvas/f2-canvas';
const random = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    dataList: [
 
    ]
    

  }

  componentWillMount () {
    this.setState({
      dataList: new Array(3).fill(1).map(() => new Array(random(20, 40)).fill(1).map(() => random(0,20)))
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  drawRadar(canvas, width, height, F2){
    console.log(canvas, width, height, F2)
    

    const data = [
      { name: '超大盘能力', value: 6.5 },
      { name: '抗跌能力', value: 9.5 },
      { name: '稳定能力', value: 9 },
      { name: '绝对收益能力', value: 6 },
      { name: '选证择时能力', value: 6 },
      { name: '风险回报能力', value: 8 }
    ];
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data, {
      value: {
        min: 0,
        max: 10
      }
    });
    chart.coord('polar');
    chart.axis('value', {
      grid: {
        lineDash: null
      },
      label: null,
      line: null
    });
    chart.axis('name', {
      grid: {
        lineDash: null
      }
    });
    chart.area()
      .position('name*value')
      .color('#FE5C5B')
      .style({
        fillOpacity: 0.2
      })
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.line()
      .position('name*value')
      .color('#FE5C5B')
      .size(1)
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.point().position('name*value').color('#FE5C5B').animate({
      appear: {
        delay: 300
      }
    });
    chart.guide().text({
      position: ['50%', '50%'],
      content: '73',
      style: {
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#FE5C5B'
      }
    });
    chart.render();
  }
  drawArea(areaData, canvas, width, height, F2){
    const data: any[] = areaData.map((v, i) => ({
      key: i,
      val: v,
    }))
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.scale('val', {
      tickCount: 3
    });
    chart.source(data);
    chart.area().position('key*val').color('country').shape('smooth');
    chart.line().position('key*val').color('country').shape('smooth');
    chart.render();
    setInterval(()=> {
      data.push({key: data.length, val: random(0,20)})
      chart.clear(); // 清理所有
      chart.source(data);
      chart.area().position('key*val').color('country').shape('smooth');
      chart.line().position('key*val').color('country').shape('smooth');
      chart.repaint()
    } ,1000)
    return chart;
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <View style='width:100%;height:500px'><F2Canvas onInit={this.drawRadar.bind(this)}></F2Canvas></View>
        {
          this.state.dataList.map(data => (
            <View style='width:100%;height:100px'><F2Canvas onInit={this.drawArea.bind(this, data)}></F2Canvas></View>
          ))
        }
      </View>
    )
  }
}

