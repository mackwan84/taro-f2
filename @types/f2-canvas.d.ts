import { ComponentClass } from 'react'

export interface F2CanvasProps {
  onCanvasInit: (canvas:any, width: number, height: number) => any,
}

declare const F2Canvas: ComponentClass<F2CanvasProps>

export default F2Canvas

export function f2Fix(F2:any): undefined;
