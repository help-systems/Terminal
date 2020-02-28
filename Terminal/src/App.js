import React from 'react';
import './App.css';
import Login from "./components/Login";
import TodoTerminal from "./components/TodoTerminal";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:{username:"",password:""},
      loginsituation: false,
      cashier_info:"",
      branches:[],
      Branch_name: "",
      transaction_list:[],
      products:[],
      is_givenmoney: true,
      payment_Type:"Cash",
      count: 1,
      givenmoney:"",
      loginerror: false, 
      brancherror:false,
      amount: 0,
      barcodes: {},
      transaction:{amount: 0,
                  status: "",
                  payment_Type: "",
                  branch_name: "",
                  date: ""
                }
    }

    this.Login = this.Login.bind(this);
    this.handleBarcodeInput = this.handleBarcodeInput.bind(this);
    this.inputProductCount = this.inputProductCount.bind(this);
    this.transactionDone = this.transactionDone.bind(this);
    this.transactionCanceled = this.transactionCanceled.bind(this);
    this.searchBarcode = this.searchBarcode.bind(this);
    this.LogOut = this.LogOut.bind(this);
    this.Amount = this.Amount.bind(this);
  }
  async componentDidMount() {  

    let url = `http://localhost:58423/Terminal/GetBranches/`;      
    let response = await fetch(url);
    let branches = await response.json();

   
    this.setState({
      branches
    })
    
  }
  
  handleUsernameInput = (e) => {
    let user = this.state.user;
    user.username =e.target.value;

    this.setState({
      user
    });
  }

  handlePasswordInput = (e) => {
    let user = this.state.user;    
    user.password = e.target.value;

    this.setState({
      user
    });
    
  }

  setBranch = (e) => {
    let  Branch_name = e.target.value;
    this.setState({
      Branch_name
    })
  }

  async handleBarcodeInput(key,e) {

    let barcode = e.target.value;
    let products =  this.state.products;

    products.map(item=>{
      if(item.key === key) {
        if(barcode.trim()!==""){
          item.barcode = barcode;          
        }
        else{
          this.state.amount = this.state.amount - item.selling_Price * item.count;
          item.barcode = "";
          item.product_name = "";
          item.supplier_Name = "";
          item.selling_Price = "";
          item.count = "";    
        }
      }    
      return item;
    });

    this.setState({
      products
    });

    if (products[products.length -1].barcode !== "") {
      products[products.length] = {key:products.length,barcode:"",count:"", product_name:"", supplier_Name:"", selling_Price:"",Branch_name:this.state.Branch_name};
    }
    
    this.setState({
      products
    });
  }

  Amount() {

    let products = this.state.products;
    let amount = 0;

    for (let i = 0; i < products.length; i++) {
      amount += products[i].selling_Price * products[i].count;
      
    }
    this.setState({
      amount
    })
   
  }

  async searchBarcode(key,e) {

    var products =  this.state.products;

    var barcode = e.target.value;

    if(barcode.trim() !== ""){

      let url = `http://localhost:58423/Terminal/GetProducts/${barcode}`;      
      let response = await fetch(url);
      let data = await response.json();

      if(!data){
        products.map(item=>{
          if(item.key === key) {
            item.barcode = "";
            item.product_name = "";
            item.supplier_Name = "";
            item.selling_Price = "";
            item.Branch_name = this.state.Branch_name;

          }    
          return item;
        });
      }
      else{
        

        products.map(item=>{
          if(item.key === key) {
            item.barcode = barcode;
            if(item.count === ""){
              item.count = this.state.count;
            }
            
            item.product_name = data[0].product_name;
            item.supplier_Name = data[0].supplier_Name;
            item.selling_Price = data[0].selling_Price;
            item.Branch_name = this.state.Branch_name;
          }    
          return item;
        });
        
        
      }
    }
    else{
      products.map(item=>{
        if(item.key === key) {
          item.barcode = "";
        }    
        return item;
      });
    }

    this.setState({
      products,
      count: 1
     });
     this.Amount();  
  }


  async Login() {
  
    let url = `http://localhost:58423/Terminal/Login/${JSON.stringify (this.state.user)}`;
    let settings = {
      method: "POST",
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',

          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
          'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
      },
      body: `${this.state.user}`
    };
    let response = await fetch(url,settings);
    let data = await response.json();
  
    if(data && this.state.Branch_name!== "" && this.state.Branch_name!== "Select Branch"){
      url = `http://localhost:58423/Terminal/GetCashier/${this.state.user.username}`;

      response = await fetch(url);
      data = await response.json();  

      this.setState({
        loginsituation:true,
        cashier_info: data
      })
    }
    if(!data){
      this.setState({     
        loginerror: true
      });
    }else{
      this.setState({     
        loginerror: false
      });
    }
    if(this.state.Branch_name === "" || this.state.Branch_name == "Select Branch") {
      this.setState({
        brancherror:true
      })
    }else {
      this.setState({
        brancherror:false
      })
    }

    if(this.state.loginerror){
    var  user = {username:"",password:""};
      this.setState({
        username:"",
        password:"",
        user
      });
    }
    
    var products = [];
    for (let i = 0; i < 6; i++) {
     products[i] = {key:i,barcode:"",count:"", product_name:"", supplier_Name:"", selling_Price:"",Branch_name:this.state.Branch_name};
      
    }
    this.setState({
      products
    })
  }

  inputProductCount(key,e) {
    var count = e.target.value;
    var products =  this.state.products;
    products.map(item=>{
      if(item.key === key) {
        if(count<0){
          item.count = 1;
        }
        else
        item.count = count;
      }    
      return item;
    });

    this.setState({
      products,
      count 
    })
    this.Amount();
  }

  inputGivenMoney = (e) => {

    const givenmoney = e.target.value;
    this.setState({
      givenmoney
    });

  }

  handlePaymentType = (e) => {
   
    this.setState({
      payment_Type: e.target.value
    });
  }

  async transactionDone () {

    let Branch_name = this.state.Branch_name
    let transaction_list = this.state.transaction_list;
    let Payment_Type = this.state.payment_Type;

    if(this.state.givenmoney === "") {
      this.setState({
        is_givenmoney: false
      });
    }

    if(this.state.amount !== 0 && this.state.givenmoney >= this.state.amount){

      let transaction = {
        Id: transaction_list.length,
        Amount: this.state.amount,
        Status: "Completed",
        Payment_Type,
        Branch_name
      };

      transaction_list.push(transaction);

      let url = `http://localhost:58423/Terminal/PostTransactions/${JSON.stringify(transaction)}`
      let settings = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
            'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
        },
        body:JSON.stringify(transaction)
      };
      let response = await fetch(url,settings);
      let data = await response.json();
    
      const products = this.state.products;

      for (let i = 0; i < products.length; i++) {

        if(products[i].barcode!==""){

          url = `http://localhost:58423/Terminal/Update/${JSON.stringify(products[i])}`;
          settings = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
      
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
                'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
            },
            body:JSON.stringify(products[i])
          };
          response = await fetch(url,settings);
          data = await response.json();

        }
      }
      let newproducts = [];

      for (let i = 0; i < 6; i++) {
        newproducts[i] = {key:i,barcode:"",count:"", product_name:"", supplier_Name:"", selling_Price:"",Branch_name:this.state.Branch_name};
        
      }
      
      this.setState({
        products:newproducts,
        amount: 0,
        givenmoney: "",
        transaction_list,
        is_givenmoney: true,
        payment_Type:"Cash"
      })
    }
    
  }


  async transactionCanceled(){

    let transaction_list = this.state.transaction_list;
    const products = this.state.products;
    let Branch_name = this.state.Branch_name;
    let Payment_Type = this.state.payment_Type

    let transaction = {
      Id: transaction_list.length,
      Amount: this.state.amount,
      Status: "Cancled",
      Payment_Type,
      Branch_name
    };
    transaction_list.push(transaction);

    let url = `http://localhost:58423/Terminal/PostTransactions/${JSON.stringify(transaction)}`
    let settings = {
      method: "POST",
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',

          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
          'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
      },
      body:JSON.stringify(transaction)
    };
    await fetch(url,settings);

    let newproducts = [];

    for (let i = 0; i < 6; i++) {
      newproducts[i] = {key:i,barcode:"",count:"", product_name:"", supplier_Name:"", selling_Price:"",Branch_name:this.state.Branch_name};
      
    }
    this.setState({
      products: newproducts,
      amount: 0,
      givenmoney: "",
      transaction_list
    })
  } 

  LogOut() {
    
    this.setState ({
      user:{username:"",password:""},
      loginsituation: false,
      cashier_info:"",
      Branch_name: "",
      transaction_list:[],
      products:[],
      count: 1,
      givenmoney:"",
      loginerror: false, 
      amount: 0,
      barcodes: {},
      transaction:{amount: 0,
                  status: "",
                  payment_Type: "",
                  branch_name: "",
                  date: ""
                }
    })

  }


  render() {
    const loginsituation = this.state.loginsituation;
    return (
      <>
      {
        !loginsituation ?
          <Login
            handleUsernameInput = {this.handleUsernameInput}
            handlePasswordInput = {this.handlePasswordInput}
            Login = {this.Login}
            user = {this.state.user}
            loginerror = {this.state.loginerror}
            branches = {this.state.branches}
            setBranch = {this.setBranch}
            brancherror = {this.state.brancherror}
         />
        :
          <TodoTerminal
            handleBarcodeInput = {this.handleBarcodeInput}
            products = {this.state.products}
            inputProductCount = {this.inputProductCount}
            inputGivenMoney = {this.inputGivenMoney}
            transactionDone = {this.transactionDone}
            barcodes = {this.state.barcodes}
            transactionCanceled = {this.transactionCanceled}
            searchBarcode = {this.searchBarcode}
            amount = {this.state.amount}
            givenmoney = {this.state.givenmoney}
            cashier_info = {this.state.cashier_info}
            transaction_list = {this.state.transaction_list}
            LogOut = {this.LogOut}
            handlePaymentType = {this.handlePaymentType}
            payment_Type = {this.state.payment_Type}
            is_givenmoney = {this.state.is_givenmoney}
          />
      }
      </>
    );
  }
}

export default App;
