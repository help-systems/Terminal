import React from "react";
// import { FaUserAlt } from 'react-icons/fa';
// import { FaLock } from 'react-icons/fa';


class Login extends React.Component {
    render() {
        let logerror = <div id = "loginerror"></div>;
        if (this.props.loginerror) {
            logerror= <div id = "loginerror">Username or password is wrong!</div>
        }
        return(
            <div id="login">
                <h1>LOG IN</h1>
               {logerror}
                <div>
                    <div>
                        {/* <p>User Name</p> */}
                        <div className = "input">
                            {/* <FaUserAlt/> */}
                            <input 
                                type="text" 
                                name = "username" 
                                placeholder = "User Name"
                                onChange={this.props.handleUsernameInput}
                                value ={this.props.user.username}
                              
                            />
                        </div>
                    </div>
                    <div>
                        {/* <p>Password</p> */}
                        <div className = "input">
                            {/* <FaLock/> */}
                            <input 
                                type="password" 
                                name = "username" 
                                placeholder="Password"
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
        );
    }
}

export default Login;