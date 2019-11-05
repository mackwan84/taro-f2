import Taro, { Component, Config } from '@tarojs/taro';
import F2Canvas from "../../../components/f2-canvas/f2-canvas";
import {fixF2} from "../../../common/f2-tool"
import {Button, View} from '@tarojs/components';


const F2 = require("@antv/f2/lib/index");


export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '雷达图',
    disableScroll: true,
  };

  state = { };

  canvas: any = null;
  canvasScope: any = null;

  initChart (canvas, width, height, scope) {

    this.canvasScope = scope;
    this.canvas = canvas;

    fixF2(F2);
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
    chart.tooltip(false); // 关闭 tooltip
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
    return chart;
  }

  saveImage() {
    if(this.canvas){
      if(process.env.TARO_ENV === 'h5'){
        const a = document.createElement("a");
        a.href = this.canvas.toDataURL('image/png');
        a.download = '图表.png';
        a.click();
      }else {
        // @ts-ignore
        const saveTempFile = Taro.canvasToTempFilePath({
          canvasId: this.canvas.ctx.canvasId,
          x: 0,
          y: 0,
        }, this.canvasScope);
        // @ts-ignore
        saveTempFile.then(image => {
          Taro.saveImageToPhotosAlbum({
            filePath: image.tempFilePath,
          }).then(() => {
            Taro.showToast({ title: '保存成功', icon: 'none' })
          }, () => {
            Taro.showToast({ title: '保存相册失败', icon: 'none' })
          })
        }, (e) => {
          console.log(e);
          Taro.showToast({ title: '无法读取canvas', icon: 'none' })
        })
      }
    }
  }

  render () {
    return (
      <View>
        <Button onClick={this.saveImage.bind(this)}>保存成图片</Button>
        <View className='full-screen'><F2Canvas onCanvasInit={this.initChart.bind(this)}></F2Canvas></View>
      </View>
    )
  }
}

