import Taro, { Component } from '@tarojs/taro'
import {Canvas} from '@tarojs/components'
import PropTypes from 'prop-types';
import Renderer from './lib/renderer';
import './f2-canvas.css';

interface F2CanvasPropTypes {
  onCanvasInit: (canvas: any, width: number, height: number, $scope: any) => any,
}

function randomStr (long: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const maxPos = chars.length;
  var string = '';
  for (var i = 0; i < long; i++) {
    string += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return string;
}

export default class F2Canvas extends Component<F2CanvasPropTypes> {
  static defaultProps = {
    onCanvasInit: () => {},
  };
  static propTypes = {
    onCanvasInit: PropTypes.any,
  };

  state = {
    width: '100%',
    height: '100%;',
  };

  id: string = 'f2-canvas-' + randomStr(16);
  canvas: any;
  static fixF2: (F2: any) => any;

  componentWillMount () {
    if (process.env.TARO_ENV !== 'h5' ) {
      setTimeout(()=>{
        const query = Taro.createSelectorQuery().in(this.$scope);
        query.select('#'+this.id).boundingClientRect().exec(res => {
          const ctx = Taro.createCanvasContext(this.id, this.$scope);
          const canvasWidth = res[0].width;
          const canvasHeight = res[0].height;
          const canvas = new Renderer(ctx, process.env.TARO_ENV);
          this.canvas = canvas;
          this.props.onCanvasInit(canvas, canvasWidth, canvasHeight, this.$scope);
        });
      },1)
    }
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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

  htmlCanvas(canvas){
    if(!canvas) return;
    setTimeout(() => {
      this.canvas = canvas;
      this.props.onCanvasInit(canvas, canvas.offsetWidth, canvas.offsetHeight, this.$scope)
    }, 1)
  }

  render () {
    const id = this.id;
    if (process.env.TARO_ENV === 'h5') {
      return <canvas ref={this.htmlCanvas.bind(this)} style={{ width: this.state.width, height: this.state.height }} className={'f2-canvas ' + id}></canvas>
    }
    if (process.env.TARO_ENV !== 'h5') {
      return <Canvas style={'width: '+this.state.width+'; height:'+this.state.height}
        className='f2-canvas' canvasId={id}
        id={id}
        onTouchStart={this.touchStart.bind(this)}
        onTouchMove={this.touchMove.bind(this)}
        onTouchEnd={this.touchEnd.bind(this)}
        onLongPress={this.press.bind(this)}
      />;
    }
  }
}
