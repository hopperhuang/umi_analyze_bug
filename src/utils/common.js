export function dateFormat (date, fmt = 'yyyy-MM-dd hh:mm', clearHour = false) {
  if (!date || (date && date.toString() === 'Invalid Date')) return null
  if (typeof date === 'string' || typeof date === 'number') date = new Date(date)
  if (clearHour) {
    date.setHours(0, 0, 0)
  }
  let texts = {
    'M+': date.getMonth() + 1, // 月
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季
    'S': date.getMilliseconds() // 毫秒
  }
  let week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (let k in texts) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (texts[k]) : (('00' + texts[k]).substr(('' + texts[k]).length)))
    }
  }
  return fmt
}


// 为数字加上单位万或亿
/**
 *  @param {number} number 输入数字.
 *  @param {number} decimalDigit 小数点后最多位数，默认为2
 *  @return {string} 加上单位后的数字
 */
export function addChineseUnit () {
  const addWan = function(integer, number, mutiple, decimalDigit) {
      const digit = getDigit(integer);
      if (digit > 3) {
          let remainder = digit % 8;
          if (remainder >= 5) {   // ‘十万’、‘百万’、‘千万’显示为‘万’
              remainder = 4;
          }
          return Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万';
      } else {
          return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
      }
  };

  const getDigit = function(integer) {
      let digit = -1;
      while (integer >= 1) {
          digit++;
          integer = integer / 10;
      }
      return digit;
  };

  return function(number, decimalDigit) {
      decimalDigit = decimalDigit == null ? 2 : decimalDigit;
      const integer = Math.floor(number);
      const digit = getDigit(integer);
      // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
      const unit = [];
      if (digit > 3) {
          const multiple = Math.floor(digit / 8);
          if (multiple >= 1) {
              const tmp = Math.round(integer / Math.pow(10, 8 * multiple));
              unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
              for (let i = 0; i < multiple; i++) {
                  unit.push('亿');
              }
              return unit.join('');
          } else {
              return addWan(integer, number, 0, decimalDigit);
          }
      } else {
          return number;
      }
  };
}

// 处理百分比
export const percentFormat = (value, decimal = 1) => {
    if (!(typeof value === 'number' && !isNaN(value))) return '0%'
    value = value * 100
    return String(value).indexOf('.') > 0 ? `${value.toFixed(decimal)}%` : `${parseInt(value)}%`
}

// 处理百分比不带%
export const percentFormatWithoutPunctuator = (value, decimal = 1) => {
    if (!(typeof value === 'number' && !isNaN(value))) return 0
    value = value * 100
    return String(value).indexOf('.') > 0 ? value.toFixed(decimal) : parseInt(value)
}

// 精确处理百分比
export const precisionFormat = (value) => {
    if (!(typeof value === 'number' && !isNaN(value))) return '0%'
    value = value * 100
    if (String(value).indexOf('.') > 0 && (value - value.toFixed(3) !== 0)) {
        return `${value.toFixed(1)}%`
    } else if (String(value).indexOf('.') > 0 && value !== 0 && (value - value.toFixed(3) === 0)) {
        return `${value.toPrecision(2)}%`
    } else {
        return `${parseInt(value)}%`
    }
}

// 处理浮点数或整数(浮点数取一位/整数不做处理)  floatIntFormat(0.58*100) 返回 58.0
export const floatIntFormat = (value) => {
    if (!value) return 0
    if (String(value).indexOf('.') > 0) {
      return value.toFixed(1)
    } else {
      return value
    }
}
// 处理千位分隔
export const numFormat = (value, exRule) => {
    if (!(typeof value === 'number' && !isNaN(value))) return '--'
    // 补充逻辑：数值为零，且额外逻辑存在，且为false，显示--
    if (value === 0 && typeof exRule !== 'undefined' && !exRule) return '--'
    const reg = /\d{1,3}(?=(\d{3})+$)/g
    if (String(value).indexOf('.') > 0) {
      const list = value.toFixed(2).split('.')
      list[0] = String(list[0]).replace(reg, '$&,')
      return list.join('.')
    } else {
      return String(value).replace(reg, '$&,')
    }
}


export const WEEKMAP = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
}

// 给date字符串添加周
export const addWeekToDate = (date) => {
  return dateFormat(date, 'yyyy-M-d') + ' ' + WEEKMAP[new Date(date).getDay()]
}