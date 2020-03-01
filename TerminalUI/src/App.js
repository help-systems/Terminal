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
      products:[],
      prod_count:0,
      product_trans:{},
      givenmoney:"",
      loginerror: false, 
      barcodes: {}
    }
    this.Login = this.Login.bind(this);
    this.handleBarcodeInput = this.handleBarcodeInput.bind(this);
    this.inputProductCount = this.inputProductCount.bind(this);
    this.transactionDone = this.transactionDone.bind(this);
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

  async handleBarcodeInput(key,e) {

    let barcode = e.target.value;
    let products =  this.state.products;

    products.map(item=>{
      if(item.key === key) {
        item.barcode = barcode;
      }    
      return item;
    });

    this.setState({
      products
    });

    if (products[products.length -1].barcode !== "") {
      products[products.length] = {key:products.length,barcode:"",count:"", product_name:"", supplier_Name:"", selling_Price:""};
    }

    this.setState({
      products
    });
  }


  async Login() {
  //  const user = this.state.user;

      // console.log(JSON.stringify(this.state.user));
      // const url = `http://localhost:58423/Terminal/Login/${JSON.stringify (this.state.user)}`;
      // const settings = {
      //   method: "POST",
      //   headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',

      //       'Access-Control-Allow-Origin': '*',
      //       'Access-Control-Allow-Credentials': true,
      //       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
      //       'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
      //    },
      // //  redirect: 'follow', 
      // //  referrerPolicy: 'no-referrer',
      //   body: `${this.state.user}`
      // };
      // const response = await fetch(url,settings);
      // // .catch((error)=>{
      // //   console.log(error)
      // // });
      // const data = await response.json();
      // console.log(data);   
  
      // if(data){
      //   this.setState({
      //     loginsituation:true
      //   })
      // }
    

    this.setState({
      loginsituation:true
      // loginerror: true
    });

    if(!this.state.loginsituation){
    let  user = {username:"",password:""};
      this.setState({
        user
      });
    }
    
    let products = [];
    for (let i = 0; i < 6; i++) {
     products[i] = {key:i,barcode:"",count:"", product_name:"", supplier_Name:"", selling_Price:""};
    }
    this.setState({
      products
    })
  }

  inputProductCount(key,e) {
    let count = e.target.value;
    let products =  this.state.products;
    products.map(item=>{
      if(item.key === key) {
        item.count = count;
      }    
      return item;
    });
    this.setState({
      products
    })
  }

  inputGivenMoney = (e) => {
    const givenmoney = e.target.value;
    this.setState({
      givenmoney
    });
  }
  
  async transactionDone () {
// ​
    // let q =  new FormData();
    // q.append("data", this.state.product);
    // console.log(q.json());
  
    console.log(`${JSON.stringify (this.state.products)}`);
    const url = `http://localhost:58423/Terminal/PutProducts/${this.state.products}`;
    const settings = {
    method: "POST",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
// ​
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
        'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
    },
      //  redirect: 'follow', 
      //  referrerPolicy: 'no-referrer',
      body: this.state.products
    };
    const response = await fetch(url,settings);
    // .catch((error)=>{
    //   console.log(error)
    // });
    const data = await response.json();
   
    
    let products = []; 
// ​
    for (let i = 0; i < 6; i++) {
      products[i] = {key:i,barcode:"",count:"", product_name:"", supplier_Name:"", selling_Price:""};
    }
    
    this.setState({
      products      
    })
  }

  transactionCanceled(){
    console.log("jhjjh")
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
         />
        :
          <TodoTerminal
            handleBarcodeInput = {this.handleBarcodeInput}
            products = {this.state.products}
            inputProductCount = {this.inputProductCount}
            inputGivenMoney = {this.inputGivenMoney}
            transactionDone = {this.transactionDone}
            barcodes = {this.state.barcodes}
            transactionCanceled = {this.state.transactionCanceled}
          />
      }
      </>      
    );
  }
}

export default App;
