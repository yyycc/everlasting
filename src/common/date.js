/**
 * Created by 4ever on 2018/12/31.
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

export function formatDate2(wDate) {
  let date = wDate.split('/');
  if (date.length === 3)
    return date[2] + '年' + date[0] + '月' + date[1] + '日';
  return wDate;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
