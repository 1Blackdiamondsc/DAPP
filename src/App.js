import React, { Component } from "react";
import TruffleContract from "truffle-contract";
import ProcurementContract from "./contracts/Procurement.json";
import "./App.css";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css/';

const etherscanBaseUrl = "https://rinkeby.etherscan.io"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storedValue: null,
            procurementInstance: undefined,
            procurementDeadline: undefined,
            procurementName: undefined,
            procurementAmount: undefined,

            account: null,
            web3: null,
            etherscanLink: "https://rinkeby.etherscan.io"

        }
        this.handleIssueProcurement = this.handleIssueProcurement.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount = async() => {
        try {

            this.handleChange = this.handleChange.bind(this);
            this.handleIssueProcurement = this.handleIssueProcurement.bind(this);
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            const contract = TruffleContract(ProcurementContract);

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ProcurementContract.networks[networkId];
            const instance = new web3.eth.Contract(
                ProcurementContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ storedValue: '3', procurementInstance: instance, web3: web3, account: accounts[0] })

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.log(error);
        }
    };
    async handleIssueProcurement(event) {
        event.preventDefault();

        const { accounts, contract } = this.state;
        await contract.createTender(this.state.procurementDeadline, this.state.procurementName, this.state.procurementAmount, {from: accounts[0]});
        const response = await contract.getTender();
        this.setState({storageValue: response});
    }
    handleChange(event)
    {
        switch(event.target.name) {
            case "procurementName":
                this.setState({"procurementName": event.target.value})
                break;
            case "procurementDeadline":
                this.setState({"procurementDeadline": event.target.value})
                break;
            case "procurementAmount":
                this.setState({"procurementAmount": event.target.value})
                break;
            default:
                break;
        }
    }
    setLastTransactionDetails(result)
    {
        if(result.tx !== 'undefined')
        {
        this.setState({etherscanLink: etherscanBaseUrl+"/tx/"+result.tx})
        }
        else
        {
        this.setState({etherscanLink: etherscanBaseUrl})
        }
    }
    runExample = async () => {
        const { accounts, contract } = this.state;
        await contract.set(5, { from: accounts[0] });
        const response = await contract.get();
        this.setState({ storegaValue: response.toNumeber() });
    };



    render() {


        return ( 
            <div className = "App" >
                <div className="grid">
                    
                    <div className="col-lg-12 col-md-10 col-sm-8">
                        <a href = { this.state.etherscanlink } target = "_blank" > Last Transaction details </a>
                        
                            
                    
                    </div>
                    <div class="row">
                        <div className="col-lg-12 col-lg-offset-3">
                            <div className = "container-fluid" >
                                <div className = "panel-heading" > A Basic Panel </div > 
                                <form onSubmit = { this.handleIssueProcurement }>
                                    <div className="col-lg-12 col-10">
                                        <div className="form-group">
                                            <label>Name:</label>
                                            <input 
                                                className="form-control form-control-lg"
                                                type="textarea"
                                                name="procuremntName"
                                                value={this.state.procurementName}
                                                placeholder="Enter procurement details"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Deadline:</label>
                                            <input 
                                                className="form-control form-control-lg"
                                                type="text"
                                                name="procuremntDeadline" 
                                                value={this.state.procurementDeadline} 
                                                placeholder="Enter deadline" 
                                                onChange={this.handleChange} 
                                            />
                                            
                                        </div>

                                        <div className="form-group">
                                            <label>Amount:</label>
                                            <input 
                                                className="form-control form-control-lg"
                                                type="text"
                                                name="procuremntAmount" 
                                                value={this.state.procurementAmount} 
                                                placeholder="Amount $" 
                                                onChange={this.handleChange} 
                                            />
                                            
                                        </div>
                                        <button variant="primary" class="btn btn-primary mb-2" type="submit">Submit</button>
                                        
                                    </div>
                                
                                </form> 
                            </div>



                        </div> 
                    </div> 
                </div> 
            </div >
        );
    }
}

export default App;