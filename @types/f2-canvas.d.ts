import { ComponentClass } from 'react'

export interface F2CanvasProps {
  onInit: (canvas:any, width: number, height: number, F2:any) => any,
  F2: any
}

declare const F2Canvas: ComponentClass<F2CanvasProps>

export default F2Canvas
