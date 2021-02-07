import { contracts } from "../../config";

export default (web3Instance) => new Promise((resolve) => {
    let web3 = web3Instance();
    let usersContractInstance = new web3.eth.Contract(
        contracts.users.abi,
        contracts.users.contractAddress
    );
    resolve(usersContractInstance)
})