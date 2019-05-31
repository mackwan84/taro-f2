import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/charts/scroll-line/index',
      'pages/charts/radial-bar/index',
      'pages/charts/line/index',
      'pages/charts/area/index',
      'pages/charts/column/index',
      'pages/charts/bar/index',
      'pages/charts/dodge/index',
      'pages/charts/stackBar/index',
      'pages/charts/ring/index',
      'pages/charts/pie/index',
      'pages/charts/rose/index',
      'pages/charts/radar/index',
      'pages/charts/gauge/index',
      'pages/charts/double-axis/index',
      'pages/charts/k/index',
      'pages/charts/stack-area/index',
      'pages/charts/multiCharts/index',
      'pages/charts/steps-pan/index',
      'pages/charts/pie-select/index',
      'pages/charts/column-select/index',
      'pages/charts/gradient-column/index',
      'pages/charts/save-image/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentWillMount () {

  }


  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
