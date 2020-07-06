import Taro from "@tarojs/taro-h5";
export function fixF2(F2) {
  if (!F2 || F2.TaroFixed) {
    return F2;
  }
  {
    F2.Global.pixelRatio = window.devicePixelRatio;
  }
  F2.TaroFixed = true;
  return F2;
}