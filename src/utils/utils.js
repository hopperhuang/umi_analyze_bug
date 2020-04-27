/**
 * 截流函数
 * @param {*} fn 
 * @param {*} gapTime 时间
 */
export function throttle(fn, gapTime) {
    if (gapTime === null || gapTime === undefined) {
      gapTime = 1500
    }
    let _lastTime = null
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        _lastTime = _nowTime;
        fn.apply(this, arguments)
      }
    }
}

/**
 * 防抖
 * @param {*} func 
 * @param {*} wait 时间
 */
export function debounce(func, wait) {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      let later = () => {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }
}

/**
 * @description 打开地图
 * @param {Object} params
 */
export function openMap(params) {
  const { lat, lng, address, shopName } = params
  window.location.href = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${lng};title:${shopName};addr:${address}&referer=myshow`
}