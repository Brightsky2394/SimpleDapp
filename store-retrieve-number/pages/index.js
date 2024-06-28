import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect, useState } from "react";


const HomePage = () => {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const abi = process.env.ABI;

  const [provider, setProvider] = useState();
  const [enteredNumber, setEnteredNumber] = useState(0);
  const [storedNumber, setStoredNumber] = useState();
  const [retrieveLoader, setRetrieveLoader] = useState(false);
  const [storeLoader, setStoreLoader] = useState(false);


  const initWallet = async () => {
    try {
      if (typeof window.ethereum === undefined) {
        console.log("Please install MetaMask");
        alert("Please install MetaMask");
      } else {
        const web3ModalVar = new Web3Modal({
          cacheProvider: true,
          providerOptions: {
            walletconnect: {
              package: WalletConnectProvider
            }
          }
        })

        const instanceVar = await web3ModalVar.connect();
        const providerVar = new ethers.providers.Web3Provider(instanceVar);
        setProvider(providerVar);
        await readNumber(providerVar);
      }

    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

const readNumber = async (provider) => {
  try {
    setRetrieveLoader(true);
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, abi, provider);
    const contractWithSigner = await smartContract.connect(signer);
    const response = await contractWithSigner.readNum();
    console.log(Number(response));
    setStoredNumber(Number(response));
    setRetrieveLoader(false);
  } catch (err){
    console.log(err);
    alert(err);
    setRetrieveLoader(false);
  }
}

const writeNumber = async () => {
  try {
    setStoreLoader(true);
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, abi, provider);
    const contractWithSigner = await smartContract.connect(signer);
    const writeNumTX = await contractWithSigner.writeNum(enteredNumber);
    const response = await writeNumTX.wait();
    console.log(await response);
    setStoreLoader(false);
    alert(`Number ${enteredNumber} is successfully saved on the blockchain `);
  } catch (err) {
    console.log(err);
    alert(err);
    setStoreLoader(false);
  }
}

useEffect(() => {
  initWallet();
}, [])

return(
  <div>
    <h1>Simple Store And Retrieve Dapp</h1>
    <h2>This action retrieved saved number from the blockchain. (Read Operation...)</h2>
    <button onClick={() => readNumber(provider)}>{retrieveLoader ? "Loading...": "RETRIEVE"}</button>
    <h3>The stored number is <span>{storedNumber !== undefined ? storedNumber : 0}</span></h3>
    <hr/>
    <h2>This action store number into the blockchain. (Write Operation...)</h2>
    <div>
      <input onChange={(e) => setEnteredNumber(e.target.value)} name="store" type="text" placeholder="Enter a number here..."/>
    </div>
    <button onClick={writeNumber}>{storeLoader ? "Loading" : "STORE"}</button>
  </div>
)

}

export default HomePage;