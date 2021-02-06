import Web3 from 'web3'

/*
* 1. Entegre edilen web3'ü kontrol et (metamask)
* 2. Metamask yeni bir web3 örneği oluşturur ve sonucu iletirse
* 3. NetworkId ile kullanıcının doğru ağa bağlı olduğunu kontrol ederiz
* 4. Metamask'tan kullanıcı hesabını alın
* 5. Kullanıcının bakiyesini alın
*/

let getWeb3 = new Promise(function (resolve, reject) {
    // Entegre edilen web3'ü kontrol et (metamask)
    var web3js = window.web3
    if (typeof web3js !== 'undefined') {
        var web3 = new Web3(web3js.currentProvider)
        resolve({
            injectedWeb3: web3.isConnected(),
            web3() {
                return web3
            }
        })
    } else {
        reject(new Error('Unable to connect to Metamask'))
    }
})
    .then(result => {
        return new Promise(function (resolve, reject) {
            // NetworkId bilgisini alır
            result.web3().version.getNetwork((err, networkId) => {
                if (err) {
                    // Eğer NetworkId bulunmazsa hata döndürür
                    reject(new Error('Unable to retrieve network ID'))
                } else {
                    // NetworkId bilgisini döndürür
                    result = Object.assign({}, result, { networkId })
                    resolve(result)
                }
            })
        })
    })
    .then(result => {
        return new Promise(function (resolve, reject) {
            // Coinbase bilgisini alır
            result.web3().eth.getCoinbase((err, coinbase) => {
                if (err) {
                    reject(new Error('Unable to retrieve coinbase'))
                } else {
                    result = Object.assign({}, result, { coinbase })
                    resolve(result)
                }
            })
        })
    })
    .then(result => {
        return new Promise(function (resolve, reject) {
            // Coinbase bakiyesini alır
            result.web3().eth.getBalance(result.coinbase, (err, balance) => {
                if (err) {
                    reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
                } else {
                    result = Object.assign({}, result, { balance })
                    resolve(result)
                }
            })
        })
    })

export default getWeb3;