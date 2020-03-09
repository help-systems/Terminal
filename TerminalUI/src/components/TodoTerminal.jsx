import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { IoIosMenu } from "react-icons/io";

class TodoTerminal extends React.Component {    


    render() {
        const products = this.props.products;
        const transaction_list = this.props.transaction_list;
        return(
            <div id="todoterminal">
                <header>
                    <div>
                        <p>
                        {this.props.cashier_info.cashier_Name}
                        </p> 
                        <span>
                            {this.props.cashier_info.cashier_Rank}
                        </span>
                    </div>
                    <ul id="headerlist">
                    {this.props.showTransaction ?
                        <li id = "transactionlist" className= "toggledlist" onClick = {this.props.toshowTransactions}>
                            <span>
                            Transactions 
                            <IoIosMenu className ="menuicon"/>
                            </span>

                        </li>
                        :
                        <li id = "transactionlist" onClick = {this.props.toshowTransactions}>
                            <span>
                            Transactions 
                            <IoIosMenu className ="menuicon"/>
                            </span>

                        </li>
                    }
                            {
                                this.props.showTransaction ?
                                <div>
                                    <ul>
                                        {transaction_list.map(item =>{ 
                                            return(
                                                <li key={item.Id}>
                                                    {"ID"}{"  "}
                                                    {item.Id}{"|  $"}
                                                    {item.Amount}{"|  "}
                                                    {item.Status}
                                                </li>
                                            )   
                                        })}
                                    </ul>
                                </div>
                                :
                                ""
                            }
                        
                        
                        <li id = "logout" onClick = {this.props.LogOut}>
                            Log Out
                        </li>
                    </ul>
                        {/* <div>
                            <h3>{this.props.cashier_info.cashier_Name}</h3>
                            <span>
                                {this.props.cashier_info.cashier_Rank}
                            </span>
                        </div>
                        <ul>
                            <li id = "transactionlist">Transactions's Manu
                                <ul>
                                    {transaction_list.map(item =>{ 
                                        return(
                                            <li key={item.Id}>
                                                {"ID"}{"  "}
                                                {item.Id}{"|  $"}
                                                {item.Amount}{"|  "}
                                                {item.Status}
                                            </li>
                                        )   
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <div>
                            <button id = "logout" onClick = {this.props.LogOut}>
                                Log Out
                            </button>
                        </div> */}
                    
                </header>
                <div>
                    <div>
                        <div id = "delivery">
                            <button 
                                type="button" 
                                className="btn btn-primary btn-lg"
                                onClick = {this.props.todoDelivery}
                            >
                                Delivery
                            </button>
                            {
                                this.props.is_delivery ?
                                <div>
                                    <div className="md-form">
                                        <input 
                                            placeholder="Delivery Person" 
                                            value = {this.props.delivery_Person}
                                            onChange = {this.props.handleinputeDelPerson}
                                            type="text" id="inputPlaceholderEx" 
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="md-form">
                                        <input 
                                            placeholder="Delivery ID"
                                            value = {this.props.delivery_ID} 
                                            onChange = {this.props.handleinputeDelID}
                                            type="text" id="inputPlaceholderEx" 
                                            className="form-control"
                                        />                                        
                                    </div>
                                    {
                                        this.props.is_filldeliveryinfo ?
                                        ""
                                        :
                                        <div className="nonfill">
                                            Delivery Person or Delivery ID is empty!
                                        </div>
                                    }
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input 
                                            type="radio" 
                                            value = "Completed"
                                            className="custom-control-input" 
                                            id="defaultInline1" 
                                            name="inlineDefaultRadiosExample" 
                                            checked={this.props.Status === "Completed"}  
                                            onChange={this.props.handleStatus}
                                        />
                                        <label className="custom-control-label" htmlFor="defaultInline1">Completed</label>
                                    </div>   
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input 
                                            type="radio" 
                                            value = "Suspended"
                                            className="custom-control-input" 
                                            id="defaultInline2" 
                                            name="inlineDefaultRadiosExample" 
                                            checked={this.props.Status === "Suspended"}  
                                            onChange={this.props.handleStatus}
                                        />
                                        <label className="custom-control-label" htmlFor="defaultInline2">Suspended</label>
                                    </div>                                  
                                </div>
                                
                               
                                :
                                ""
                            }
                        </div>
                        <div id = "productinterminal">
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Barcode</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Supplier Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Product count</th>   
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(item =>{

                                            return (
                                                <tr  key={item.key}>
                                                    <td>
                                                        <input
                                                            type="text" 
                                                            value = {item.barcode} 
                                                            onChange={(e)=>{this.props.handleBarcodeInput(item.key,e)}}
                                                            onKeyPress={event => {
                                                                if (event.key === 'Enter') {
                                                                  this.props.searchBarcode(item.key,event)
                                                                }
                                                              }}
                                                        />
                                                    </td>
                                                    <td>
                                                        {item.product_name}
                                                    </td>
                                                    <td>
                                                        {item.supplier_Name}
                                                    </td>
                                                    <td>
                                                        {item.selling_Price}
                                                    </td>
                                                    <td>
                                                        <input 
                                                            type="number" 
                                                            min= '1' 
                                                            value = {item.count}
                                                            onChange ={(e)=> {this.props.inputProductCount(item.key,e)}}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                        <div id = "amount">
                            <div className="radio">
                                <label>
                                    <input 
                                        type="radio" 
                                        value="Cash" 
                                        name = "Payment Type"
                                        checked={this.props.payment_Type === "Cash"} 
                                        onChange={this.props.handlePaymentType}
                                    />
                                    Cash
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        value="Card" 
                                        name = "Payment Type"                                
                                        checked={this.props.payment_Type === "Card"}  
                                        onChange={this.props.handlePaymentType}
                                    />
                                    Card
                                </label>
                            </div>
                            <div >
                                <p>Amount</p>
                                <div className = "likeinput">
                                    {this.props.amount}
                                </div>
                            </div>
                        </div>
                        <div id = "changer">
                            <div>
                                <p>Given money</p>
                                {
                                    this.props.is_givenmoney ? 
                                    <input 
                                    type="text"
                                    value = {this.props.givenmoney}
                                    onChange = {this.props.inputGivenMoney}
                                />
                                :
                                <input 
                                    type="text"
                                    value = {this.props.givenmoney}
                                    onChange = {this.props.inputGivenMoney}
                                    className = "nonegivenmoney"
                                 />
                                }
                                
                            </div>
                            <div>
                                <p>Change</p>
                                {this.props.givenmoney - this.props.amount >= 0?
                                <div className = "likeinput">{this.props.givenmoney - this.props.amount}</div>:
                                <div className = "likeinput"></div>    
                                }
                                 
                            </div>
                        </div>
                        <div id ="done">
                        <button 
                                id = "donetrans"
                                onClick = {this.props.transactionDone} >
                                  Done
                            </button>
                            <button 
                                id = "canceltrans"
                                onClick = {this.props.transactionCanceled}>
                                     Cancel
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoTerminal;