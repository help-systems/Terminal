import React from "react";

class TodoTerminal extends React.Component {    


    render() {
        const products = this.props.products;
        const transaction_list = this.props.transaction_list;
        return(
            <div id="todoterminal">
                <header>
                    <div>
                        <h3>{this.props.cashier_info.cashier_Name}</h3>
                        <span>
                            {this.props.cashier_info.cashier_Rank}
                        </span>
                    </div>
                    <ul id= "transactionlist" >
                        <li>Transactions's Manu
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
                    </div>
                    
                </header>
                <div>
                    <div>
                        <div id = "productinterminal">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Barcode</th>
                                        <th>Product Name</th>
                                        <th>Supplier Name</th>
                                        <th>Price</th>
                                        <th>Product count</th>   
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
                            <div>
                                <span>Amount</span>
                                <span>
                                    {this.props.amount}
                                </span>
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
                                <span>{this.props.givenmoney - this.props.amount}</span>:
                                <span></span>    
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