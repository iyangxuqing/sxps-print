import axios from 'axios'
import config from './config'
import { formatDate } from '@/common/js/date'

const apiUrl = config.apiHost + 'seller/_trade.php'

export function getTrades(options) {
	return new Promise(function(resolve, reject) {
		axios.get(apiUrl + '?m=get', {
			params : options
		}).then((res) => {
			if (res.data.errno === 0) {
				let trades = res.data.trades
				for (let i in trades) {
					trades[i].time = formatDate(trades[i].created, 'yyyy-MM-dd hh:mm:ss')
					trades[i].name = trades[i].receive_name
					trades[i].phone = trades[i].receive_phone || trades[i].mobileNumber
					trades[i].address = trades[i].receive_district + trades[i].receive_address
					let num = 0
					let amount = 0
					let realNum = 0
					let realAmount = 0
					for (let j in trades[i].orders) {
						let order = trades[i].orders[j]
						order.iid = Number(order.iid)
						order.sid = Number(order.sid)
						num += Number(order.num)
						amount += Number(order.num * order.price)
						realNum += Number(order.realNum)
						realAmount += Number(order.realNum * order.price)
					}
					trades[i].num = num
					trades[i].amount = amount.toFixed(2)
					trades[i].realNum = realNum
					trades[i].realAmount = realAmount.toFixed(2)
				}
				resolve(trades)
			}
		})
	})
}

export function setTrade(trade) {
	return new Promise(function(resolve, reject) {
		axios.post(apiUrl + '?m=set', trade).then((res) => {
			if (res.data.errno === 0) {
				resolve(res.data)
			}
		})
	})
}

export function setOrders(orders) {
	return new Promise(function(resolve, reject) {
		axios.post(apiUrl + '?m=setOrders', orders).then((res) => {
			if (res.data.errno === 0) {
				resolve(res.data)
			}
		})
	})
}
