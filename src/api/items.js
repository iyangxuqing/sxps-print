import axios from 'axios'
import config from './config'

const apiUrl = config.apiHost + 'seller/_item.php'

let cache_items_buyer = null
let cache_items_seller = null

export function getItems(options) {
	return new Promise(function(resolve, reject) {
		if (options.onShelf) {
			if (cache_items_buyer) {
				resolve(cache_items_buyer)
				return
			}
		} else if (cache_items_seller) {
			resolve(cache_items_seller)
			return
		}
		axios.get(apiUrl + '?m=get', { params: options }).then((res) => {
			if(res.data.errno === 0) {
				let items = res.data.items
				for (let i in items) {
					for (let j in items[i].specs) {
						items[i].specs[j].iid = Number(items[i].specs[j].iid)
						items[i].specs[j].sid = Number(items[i].specs[j].sid)
						items[i].specs[j].price = Number(items[i].specs[j].price).toFixed(2)
					}
				}
				if (options.onShelf) {
					cache_items_buyer = items
				} else {
					cache_items_seller = items
				}
				resolve(items)
			} else {
				reject(res)
			}
		}).catch((res) => {
			reject(res)
		})
	})
}

export function setItem(cate, method) {
	let url = apiUrl + '?m=' + method
	return new Promise(function(resolve, reject) {
		axios.post(url, cate).then((res) => {
			if (res.data.errno === 0) {
				resolve(res.data)
			} else {
				reject(res)
			}
		}).catch((res) => {
			reject(res)
		})
	})
}
