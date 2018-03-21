import axios from 'axios'
import config from './config.js'

const apiUrl = config.apiHost + 'seller/_buyer.php'

export function getBuyersByTrades() {
	return new Promise(function(resolve, reject) {
		axios.get(apiUrl + '?m=getBuyersByTrades').then((res) => {
			if(res.data.errno === 0) {
				let buyers = res.data.buyers
				resolve(buyers)
			}
		})
	})
}