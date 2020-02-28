import React from "react";
import { FaUserAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';


class Login extends React.Component {
    render() {
        let error = <div id = "loginerror"></div>;
        let branches = this.props.branches;
        let i =  0;
        if(this.props.loginerror && this.props.brancherror){
            error= <div id = "loginerror">Username or password is wrong and Invalid Branch!</div>
        }else if (this.props.loginerror) {
            error= <div id = "loginerror">Username or password is wrong!</div>
        }else if(this.props.brancherror){
            error= <div id = "loginerror">Invalid Branch</div>
        }
        return(
            <>
                <div id = "branchname">
                    <select name="" id="" onClick= {this.props.setBranch}>
                        <option selected disabled >
                            Select Branch
                        </option >
                        {   
                            branches.map(item => {
                                {i++};
                                return(
                                <option key = {i} value = {item.branch_Name}>{item.branch_Name}</option>
                                
                                );
                               
                            })
                        }
                    </select>
                </div>
                <div id = "lg">

                <div id="login">
                    <h1>LOG IN</h1>
                    {error}
                        <div>
                            <div>
                                <p>User Name</p>
                                <div className = "input">
                                    <FaUserAlt/>
                                    <input 
                                        type="text" 
                                        name = "username" 
                                        onChange={this.props.handleUsernameInput}
                                        value ={this.props.user.username}
                                    
                                    />
                                </div>
                            </div>
                            <div>
                                <p>Password</p>
                                <div className = "input">
                                    <FaLock/>
                                    <input 
                                        type="password" 
                                        name = "username" 
                                        onChange = {this.props.handlePasswordInput}
                                        value ={this.props.user.password}
                                    />
                                </div>
                            </div>
                            <div id = "signin">
                                <button onClick = {this.props.Login}>
                                    SIGN IN
                                </button>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;