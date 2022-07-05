import React, {Component} from 'react';
import Button from "@material-ui/core/Button";

export class LogoutButton extends Component {
    executeLogout = () => {
        this.props.eventBus.dispatch('logged-out', {})
    }
    render() {
        return (<Button id="logoutButton" variant="contained" color="secondary" onClick={this.executeLogout}>Logout</Button>);
    }
}