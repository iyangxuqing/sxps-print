export function formatDate(date, fmt) {

	if (typeof date == 'string') {
			/* 针对10位的秒数，转变成13位的毫秒数 */
			if (date.length == 10) {
				date = date * 1000
			}
			date = new Date(date)
	}

	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}

	// 遍历这个对象
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
  		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? str : padLeftZero(str))
		}
	}
 	return fmt
}
 
function padLeftZero(str) {
 return ('00'+str).substr(str.length)
}