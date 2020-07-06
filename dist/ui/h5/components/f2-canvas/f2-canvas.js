import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";

import PropTypes from 'prop-types';

import './f2-canvas.css';
function randomStr(long) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const maxPos = chars.length;
  var string = '';
  for (var i = 0; i < long; i++) {
    string += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return string;
}
export default class F2Canvas extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      width: '100%',
      height: '100%;'
    };
    this.id = 'f2-canvas-' + randomStr(16);
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  touchStart(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchstart', [e]);
    }
  }
  touchMove(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchmove', [e]);
    }
  }
  touchEnd(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchend', [e]);
    }
  }
  press(e) {
    if (this.canvas) {
      this.canvas.emitEvent('press', [e]);
    }
  }
  htmlCanvas(canvas) {
    if (!canvas) return;
    setTimeout(() => {
      this.canvas = canvas;
      this.props.onCanvasInit(canvas, canvas.offsetWidth, canvas.offsetHeight, this.$scope);
    }, 1);
  }
  render() {
    const id = this.id;
    {
      return <canvas ref={this.htmlCanvas.bind(this)} style={{ width: this.state.width, height: this.state.height }} className={'f2-canvas ' + id}></canvas>;
    }
  }
}
F2Canvas.defaultProps = {
  onCanvasInit: () => {}
};
F2Canvas.propTypes = {
  onCanvasInit: PropTypes.any
};