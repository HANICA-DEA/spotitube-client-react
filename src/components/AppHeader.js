import React, {Component} from 'react';
import {AppBar, Box, Toolbar, Typography} from "@material-ui/core";
import {LogoutButton} from "./LogoutButton";
import {QueueMusic} from "@material-ui/icons";

export class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            token: '',
            user: '',
            serverlocation: ''
        })
    }
    componentDidMount() {
        this.props.eventBus.on('token-set', userCredentials => {
            this.setState({token:userCredentials.token, user:userCredentials.user,serverlocation:userCredentials.serverlocation});
        })
        this.props.eventBus.on('logged-out', () => {
            this.setState({token:'', user:'',serverlocation:''});
        })
    }

    render() {
        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar position={"static"}>
                    <Toolbar>
                        <div id="app-header">
                            <QueueMusic/>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Welkom bij Spotitube!
                            </Typography>
                            <div className="mat-body-2">
                                {this.state.token !== '' && this.state.user + "@" + this.state.serverlocation}
                            </div>
                            {this.state.token !== '' && <LogoutButton eventBus={this.props.eventBus}></LogoutButton>}
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}