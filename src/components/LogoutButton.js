import React, {Component} from 'react';
import Button from "@mui/material/Button";

export class LogoutButton extends Component {
    executeLogout = () => {
        this.props.eventBus.dispatch('logged-out', {})
    }
    render() {
        return (<Button id="logoutButton" variant="contained" color="error" onClick={this.executeLogout}>Logout</Button>);
    }
}