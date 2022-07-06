import React, {Component} from 'react';
import {Button, Card, CardContent} from "@mui/material";
import {PlaylistAdd} from "@mui/icons-material";
import {PlaylistItems} from "./PlaylistItems";
import {NewPlaylistModalDialog} from "./NewPlaylistModalDialog";

export class PlaylistsOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            id: '',
            name: '',
            minutes: '',
            open: false
        }
    }

    componentDidMount() {
        this.props.apiGateway.getPlaylists(localStorage.getItem('token'), this.setPlaylists)
        this.props.eventBus.on('playlists-updated', (playlistsUpdate) => {
            this.setPlaylists(playlistsUpdate.playlists, playlistsUpdate.length)
        })
    }

    setPlaylists = (playlists, length) => {
        this.setState({playlists: playlists, minutes: this.toMinutes(length)});
    }
    toMinutes = (length) => {
        const date = new Date(null)
        date.setSeconds(length)
        return date.toISOString().substr(11, 8)
    }
    showTracks = (id) => {
        console.log(id)
    }
    executeDelete = (id) => {
        console.log(id)
    }
    openDialog = () => {
        this.setState({open: true})
    }
    handleCancel = () => {
        this.setState({open: false});
    }
    handleAddNewPlaylist = (id, playlistName) => {
        this.props.apiGateway.addPlaylist(localStorage.getItem('token'), playlistName, this.setPlaylists)
        this.setState({open: false});
    }

    render() {
        return (
            <div id="playlists-overview" className="modal-header">
                <h3>Playlists</h3>

                <Card className="flex-item">
                    <CardContent>
                        <PlaylistItems playlists={this.state.playlists} apiGateway={this.props.apiGateway} eventBus={this.props.eventBus}/>
                    </CardContent>
                </Card>
                <Card className="flex-item">
                    <CardContent className="flex-container">
                    <span className="length">
                    Total length: {this.state.minutes}
                    </span>
                        <Button onClick={ this.openDialog } className="add-button" id="openNewPlaylistButton">
                            <PlaylistAdd/>
                        </Button>
                    </CardContent>
                </Card>
                { this.state.open && <NewPlaylistModalDialog open={this.state.open} handleCancel={this.handleCancel} handleSave={this.handleAddNewPlaylist}/> }
            </div>
        );
    }
}