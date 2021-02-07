import Web3 from 'web3';

/*
* 1. Web3 ile metamask bağlantısını kontrol et
* 2. NetworkId ile kullanıcının doğru ağa bağlı olduğunu kontrol ederiz
* 3. Metamask'tan kullanıcı hesap bilgisini alır
* 4. Metamask'tan kullanıcı bakiyesini alır
*/

export default new Promise((resolve, reject) => {
    // Web3 ile metamask bağlantısını kontrol et
    var web3js = window.ethereum
    if (typeof web3js !== 'undefined') {
        var web3 = new Web3(web3js)
        web3.eth.handleRevert = true;
        web3.eth.net.isListening()
            .then(() => {
                console.log("Metamask bağlantısı başarılı!");
                resolve({
                    injectedWeb3: true,
                    web3() {
                        return web3
                    }
                })
            })
            .catch(e => console.log('Bir şeyler yanlış gitti: ' + e));

    } else {
        reject(new Error('Metamask bağlantısı kurulamadı'))
    }
}).then(result => {
    return new Promise((resolve, reject) => {
        // NetworkId ile kullanıcının doğru ağa bağlı olduğunu kontrol ederiz
        result.web3().eth.net.getId()
            .then((networkId) => {
                result = Object.assign({}, result, { networkId })
                resolve(result)
            })
            .catch(() => reject(new Error('Metamask, network Id verisi alınamadı')));
    })
}).then(result => {
    return new Promise((resolve, reject) => {
        // Metamask'tan kullanıcı hesap bilgisini alır
        result.web3().eth.getCoinbase((err, coinbase) => {
            if (err) {
                reject(new Error('Metamask hesap bilgisi alınamadı'))
            } else {
                result = Object.assign({}, result, { coinbase })
                resolve(result)
            }
        })
    })
}).then(result => {
    return new Promise((resolve, reject) => {
        // Metamask'tan kullanıcı bakiyesini alır
        result.web3().eth.getBalance(result.coinbase, (err, balance) => {
            if (err) {
                reject(new Error('Metamask adres bakiyesi alınamadı: ' + result.coinbase))
            } else {
                result = Object.assign({}, result, { balance })
                resolve(result)
            }
        })
    })
})