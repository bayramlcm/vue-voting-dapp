import { contracts } from "../../config";

export default (web3Instance) => new Promise((resolve) => {
    let web3 = web3Instance();
    let registerContractInstance = new web3.eth.Contract(
        contracts.register.abi,
        contracts.register.contractAddress
    );
    resolve(registerContractInstance)
})