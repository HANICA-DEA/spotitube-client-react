import React, {Component} from 'react';
import Button from "@mui/material/Button";
import {Card, CardContent} from "@mui/material";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { user: '',
            pass: '',
            serverlocation: '',
            token: ''
        }
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }
    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onSubmitForm() {
        this.props.apiGateway.login(this.state.user, this.state.pass, this.state.serverlocation, this.setToken)
    }
    setToken = (token) => {
        this.setState({token : token});
        this.props.eventBus.dispatch('token-set', {'token': token, 'user': this.state.user, 'serverlocation': this.state.serverlocation})
        localStorage.setItem('token', token)
    }
    componentDidMount() {
        this.props.eventBus.on('logged-out', () => {
            this.setState({token:'', user:'',serverlocation:''});
        })
    }

    render() {
        return (
            this.state.token === '' &&
            <div id="login">
                <Card>
                    <CardContent>
                        <div className="form-control">
                                <label className="form-label">
                                    Server URL
                                    <input name="serverlocation" data-testid="urlInput" className="form-control" placeholder="Server URL"
                                           value={this.state.serverlocation}
                                           pattern="http://[a-zA-Z0-9:/.\-]+"
                                           required
                                           onChange={this.onInputchange}/>
                                </label>
                                <label className="form-label">
                                    User
                                    <input name="user" data-testid="userInput" placeholder="User" className="form-control"
                                           value={this.state.user}
                                           required
                                           onChange={this.onInputchange} />
                                </label>
                                <label className="form-label">
                                    Password
                                    <input name="pass" data-testid="passInput" type="password" className="form-control" placeholder="Password"
                                           value={this.state.pass}
                                           required
                                           onChange={this.onInputchange}/>
                                </label>
                                <Button data-testid="loginButton" variant="contained" color="primary" type={"submit"} onClick={this.onSubmitForm}>Login</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Login;