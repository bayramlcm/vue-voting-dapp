import { contracts } from "../config";

export const votingAppContract = (web3Instance) => new Promise((resolve) => {
    let web3 = web3Instance();
    let contractInstance = new web3.eth.Contract(
        contracts.votingApp.abi,
        contracts.votingApp.contractAddress
    );
    resolve(contractInstance)
})