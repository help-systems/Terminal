import React from 'react';
import './App.css';
import Login from "./components/Login";
import TodoTerminal from "./components/TodoTerminal";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password:"",
      user:{username:"",password:""},
      loginsituation: false,
      products:[],
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
    var user = this.state.user;
    var username = e.target.value;
    user = {username,password:this.state.password};
    this.setState({
      user,
      username
    });
  }

  handlePasswordInput = (e) => {
    var user = this.state.user;
    var password = e.target.value;
    user = {username:this.state.username,password};
    this.setState({
      user,
      password
    });
    
  }

  defaultSituation = () => {
    var products = [];
    for (let i = 0; i < 6; i++) {
     products[i] = {key:i,barcode:"",count:1};
      
    }
    this.setState({
      products
    })
  }

  async handleBarcodeInput(key,e) {

    var barcode = e.target.value;

    const url = `http://localhost:58423/Terminal/GetProducts/485326587`;      
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    var products =  this.state.products;
    products.map(item=>{
      if(item.key === key) {
        item.barcode = barcode;
        item.product_name = data[0].product_name;
        item.supplier_Name = data[0].supplier_Name;
        item.selling_Price = data[0].selling_Price;
      }    
      return item;
    });

      this.setState({
        barcodes:data
      })

      if (products[products.length -1].barcode !== "") {
        products[products.length] = {key:products.length,barcode:"",count:1, product_name:"", supplier_Name:"", selling_Price:""};
    }   

    this.setState({
      products
     });

  }


  async Login() {
  //  const user = this.state.user;

    console.log(JSON.stringify(this.state.user));
    const url = `http://localhost:58423/Terminal/Login/${JSON.stringify (this.state.user)}`;
    const settings = {
      method: "POST",
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',

          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
          'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
      },
      //  redirect: 'follow', 
      //  referrerPolicy: 'no-referrer',
      body: `${this.state.user}`
    };
    const response = await fetch(url,settings);
    const data = await response.json();
    console.log(data);
 

    if(data){
      this.setState({
        loginsituation:true
      })
    }

    this.setState({
      loginsituation:true
      // loginerror: true
    });


    //let newDate = new Date();
    //console.log(newDate);
    // fetch(url,{
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(this.state.user)
    // })
    // .then(response => {
    //   // console.log(response);
    //   this.setState({
    //     loginsituation:true
    //   });
    // })
    // .catch(error =>{
    //    console.log(error);
    // })
    if(!this.state.loginsituation){
    var  user = {username:"",password:""};
      this.setState({
        username:"",
        password:"",
        user
      });
    }
    
    var products = [];
    for (let i = 0; i < 6; i++) {
     products[i] = {key:i,barcode:"",count:1, product_name:"", supplier_Name:"", selling_Price:""};
      
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

  transactionDone () {
    var products = []; 

    for (let i = 0; i < 6; i++) {
     products[i] = {key:i,barcode:"",count:1};
    }

    this.setState({
      products      
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
         />
        :
          <TodoTerminal
            handleBarcodeInput = {this.handleBarcodeInput}
            products = {this.state.products}
            inputProductCount = {this.inputProductCount}
            inputGivenMoney = {this.inputGivenMoney}
            transactionDone = {this.transactionDone}
            barcodes = {this.state.barcodes}
          />
      }
      </>      
    );
  }
}

export default App;
