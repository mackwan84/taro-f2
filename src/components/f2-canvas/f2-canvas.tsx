import Taro, { Component } from '@tarojs/taro'
import {Canvas} from '@tarojs/components'
import PropTypes from 'prop-types';
import Renderer from './lib/renderer.js';

const F2 = require('@antv/f2');
if (process.env.TARO_ENV === 'weapp') {
  F2.Util.addEventListener = function (source, type, listener) {
    source.addListener(type, listener);
  };
  F2.Util.removeEventListener = function (source, type, listener) {
    source.removeListener(type, listener);
  };
  F2.Util.createEvent = function (event, chart) {
    const type = event.type;
    let x = 0;
    let y = 0;
    const touches = event.touches;
    if (touches && touches.length > 0) {
      x = touches[0].x;
      y = touches[0].y;
    }

    return {
      type,
      chart,
      x,
      y
    };
  };
}

import './f2-canvas.scss';

interface F2CanvasPropTypes {
  onInit: any,
}

export default class F2Canvas extends Component<F2CanvasPropTypes> {
  static defaultProps = {
    onInit: (canvas, width, height, F2) => {}
  };
  static propTypes = {
    onInit: PropTypes.any,
  };

  state = {};

  canvas?: any;

  componentWillMount () {
    if (process.env.TARO_ENV === 'weapp') {
      setTimeout(()=>{
        const ctx = Taro.createCanvasContext('f2-canvas', this.$scope);
        const canvas = new Renderer(ctx);
        this.canvas = canvas;
        const query = Taro.createSelectorQuery().in(this.$scope);
        query.select('.f2-canvas').boundingClientRect().exec(res => {
          this.props.onInit(canvas, res[0].width, res[0].height, F2);
        });
      },1)
    }
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  testCanvas() {

  }

  touchStart(e){
    if (this.canvas) {
      this.canvas.emitEvent('touchstart', [e]);
    }
  }
  touchMove(e){
    if (this.canvas) {
      this.canvas.emitEvent('touchmove', [e]);
    }
  }
  touchEnd(e){
    if (this.canvas) {
      this.canvas.emitEvent('touchend', [e]);
    }
  }
  press(e){
    if (this.canvas) {
      this.canvas.emitEvent('press', [e]);
    }
  }

  h5Canvas(canvas){
    setTimeout(() => {
      this.canvas = canvas;
      this.props.onInit(canvas, canvas.offsetWidth, canvas.offsetHeight, F2)
    }, 1)
  }

  render () {
    if (process.env.TARO_ENV === 'weapp') {
      return (
        <Canvas style={'width: 100%;height: 100%;'} className='f2-canvas' canvasId='f2-canvas'
                onTouchStart={this.touchStart.bind(this)}
                onTouchMove={this.touchMove.bind(this)}
                onTouchEnd={this.touchEnd.bind(this)}
                onLongPress={this.press.bind(this)}
        />
      )
    } else if (process.env.TARO_ENV === 'h5') {
      return <canvas ref={this.h5Canvas.bind(this)} id='f2-canvas'  className='f2-canvas'></canvas>;
    }
  }
}
