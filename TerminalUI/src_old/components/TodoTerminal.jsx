import React from "react";
import TodoTransactionList from "./TodoTransactionList";

class TodoTerminal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showTransaction:false,
            transactionlist:[]
        }
    }
    todoTransaction = () => {
        fetch('http://localhost:5000/questions',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.user)
        })
        .then(response => {
            console.log(response);
        
        })
        .catch(error =>{
          console.log(error);
        })
    }

    render() {
        const products = this.props.products;
        console.log(products);
        return(
            <div id="todoterminal">
                <header>
                    <span>Cashier info</span>
                    <ul id= "transactionlist" >
                        <li>Transactions's Manu
                            <ul>
                                <li>hkdjghdk</li>
                                <li>shgduhgg</li>
                            </ul>
                        </li>
                    </ul>
                    {/* <button onClick = {this.todoTransaction}>Transactions's Manu</button>                 */}
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
                                        <th>Product count</th>
                                        <th>selling_Price</th>
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
                                                        />
                                                    </td>
                                                    <td>
                                                        {item.product_name}
                                                    </td>
                                                    <td>
                                                        {item.supplier_Name}
                                                    </td>
                                                    <td>
                                                        <input 
                                                            type="number" 
                                                            min= '1' 
                                                            value = {item.count}
                                                            onChange ={(e)=> {this.props.inputProductCount(item.key,e)}}
                                                        />
                                                    </td>
                                                    <td>
                                                        {item.selling_Price}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                        <div id = "amount">
                            <div>
                                <span>Amount</span>
                                <span>5000000</span>
                            </div>
                        </div>
                        <div id = "changer">
                            <div>
                                <p>Given money</p>
                                <input 
                                    type="text"
                                    onChange = {this.props.inputGivenMoney}
                                />
                            </div>
                            <div>
                                <p>Change</p>
                                <input type="text"/>
                            </div>
                        </div>
                        <div id ="done">
                            <button onClick = {this.props.transactionDone} >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoTerminal;