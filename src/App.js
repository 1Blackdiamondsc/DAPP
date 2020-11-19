import React, { Component } from "react";
import contract from "truffle-contract"
import ProcurementContract from "./contracts/Procurement.json";



import "./App.css";
import getWeb3 from "./getWeb3";

class App extends Component {
  state = { storageValue: [] }
  async componentDidMount() {
    const web3 = await getWeb3()
    const provider = () => {
      // If the user has MetaMask:
      if (typeof web3 !== 'undefined') {
        return web3.currentProvider
      } else {
        console.error("You need to install MetaMask for this app to work!")
      }
    }
    try {
      
      const accounts = await web3.eth.getAccounts() // Get user's ETH addresses
      //console.log(addresses)
      
      
      
      const getInstance = async (web3, ProcurementContract) => {
        // get network ID and the deployed address
        const networkId = await web3.eth.net.getId()
        const deployedAddress = ProcurementContract.networks[networkId].address
      
        // create the instance
        const instance = new web3.eth.Contract(ProcurementContract.abi, deployedAddress)
        return instance
      }
      //get user
      const storage = await getInstance(web3, ProcurementContract)
      const  id  = await storage.methods.getTender('1');
      
      console.log(id)
      this.setState({ storageValue: id })
    } catch (err) {
      console.error(err)
    }
    
  }
  
  
  

  render() {
    
    
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: 
          
        </div>
      </div>
    );
  }
}

export default App;
