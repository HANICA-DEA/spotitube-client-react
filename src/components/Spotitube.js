import React from 'react';
import {AppHeader} from "./AppHeader";
import Login from "./Login";
import {ApiGateway} from "../api/apigateway";
import EventBus from "../eventbus/event-bus";
import {PlaylistsOverview} from "./PlaylistsOverview";
import {TracksOverview} from "./TracksOverview";

const apiGateway = new ApiGateway();
const eventBus = new EventBus();

export class Spotitube extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            token: ''
        }
    }

    componentDidMount() {
        eventBus.on('token-set', token => {
            this.setState({token : token})
        })
        eventBus.on('playlist-selected', ($id) => {
            this.setState({playlistId : $id});
        })
        eventBus.on('logged-out', () => {
            this.setState({token:'', playlistId : ''});
        })
    }

    render() {
        return (
            <div id="app">
                <AppHeader eventBus={eventBus} class="header flex-item"></AppHeader>
                <div className="overview flex-container">
                    { this.state.token !== '' && <PlaylistsOverview apiGateway={apiGateway} eventBus={eventBus} class="flex-item playlists"/> }
                    { this.state.playlistId !== '' && <TracksOverview apiGateway={apiGateway} eventBus={eventBus} class="flex-item tracks" /> }
                </div>
                <Login apiGateway={apiGateway} eventBus={eventBus} class="flex-item"/>
            </div>
        )
    }
}