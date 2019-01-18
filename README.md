# Taro多端F2图表

# ⚠️  2.0.* 暂不可用 请不要更新

[![](https://img.shields.io/npm/v/taro-f2.svg?style=flat-square)](https://www.npmjs.com/package/taro-f2)

目前支持: H5、微信小程序、支付宝小程序

微信部分实现方法完全照搬: https://github.com/antvis/wx-f2

F2图表具体使用方法请参考: https://github.com/antvis/f2

> 直接克隆代码 可查阅示例

##  更新日志
* 2.0.0: 支持了按需引用
  - `onInit` 修改为 `onCanvasInit`,回调不再返回F2
  - 增加 `f2Fix` 方法, 用于为F2增加小程序等兼容代码
  - 增加示例代码
* 1.2.0: 使用新的打包方式，注意升级Taro库到 1.2.0 或更高版本
* 1.1.2: 改用低版本@tarojs/cli编译，新版本貌似改了h5的编译方式了
* 1.1.0: 增加支付宝小程序支持, 修复h5模糊的问题
 


## 安装

```
$ yarn add taro-f2 @antv/f2
```
> 注意 @antv/f2 需要手动安装

#### 修改项目配置文件 config/index.js
在 `h5` 的 `esnextModules` 中增加 `taro-f2`
```
{
  h5: {
    esnextModules: ['taro-f2']
  }
}
```


## 使用指南

在 Taro 文件中引入组件
```
import { F2Canvas, f2Fix } from 'taro-f2'
import F2 from "@antv/f2"
f2Fix(F2)
```

> F2Canvas宽高为100% 设置宽高需要在外面套个View

## 事件

| 事件名称 | 说明 | 返回参数 |
|:---|:---|:---|
| onCanvasInit | 画板初始化完毕事件 | (canvas: any, width: number, height: number): void <br> canvas: 小程序下为伪Canvas元素 |


## 示例

```jsx harmony
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { F2Canvas, f2Fix } from 'taro-f2'
import F2 from "@antv/f2"
f2Fix(F2)

export default class Index extends Component {

  drawRadar(canvas, width, height){

    console.log(canvas, width, height)

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
        <View style='width:100%;height:500px'><F2Canvas onCanvasInit={this.drawRadar.bind(this)}></F2Canvas></View>
      </View>
    )
  }
}
```



