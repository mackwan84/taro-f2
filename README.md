# Taro多端F2图表
--------------------
目前支持 H5与小程序

实现方法完全照搬: https://github.com/antvis/wx-f2

F2图表具体使用方法请参考: https://github.com/antvis/f2

## 安装

```
$ npm install taro-f2
```
或者
```
$ yarn add taro-f2
```

## 使用指南

在 Taro 文件中引入组件
```
import { F2Canvas } from '@tarojs/taro-f2'
```

> F2Canvas宽高为100% 设置宽高需要再外面套个View


## 事件

| 事件名称 | 说明 | 返回参数 |
|:---|:---|:---|
| onInit | 画板初始化完毕事件 | (canvas: any, width: number, height: number, F2: any): void <br> canvas: 小程序下为伪Canvas元素 |



## 示例

```
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { F2Canvas } from '@tarojs/taro-f2'

export default class Index extends Component {

  canvasInit(canvas, width, height, F2){
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

  render () {
    return (
      <View className='index'>
        <View style='width:100%;height:500px'><F2Canvas onInit={this.canvasInit.bind(this)}></F2Canvas></View>
      </View>
    )
  }
}
```

