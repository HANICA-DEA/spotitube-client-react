import React, {Component} from 'react';
import {Button, Card, CardContent} from "@material-ui/core";
import {Edit, PlaylistAdd, RemoveCircle} from "@material-ui/icons";

export class PlaylistsOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            id: '',
            name: '',
            minutes: ''
        }
    }

    componentDidMount() {
        this.props.apiGateway.getPlaylists(localStorage.getItem('token'), this.setPlaylists)
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
    executeUpdate = (id, name) => {
        console.log(id + " " + name)
    }
    executeDelete = (id) => {
        console.log(id)
    }
    openDialog = (newPlaylist) => {
        console.log(newPlaylist)
    }

    render() {
        const playlist_items = this.state.playlists.map((playlist, id) =>
            <li className="flex-item flex-container" id={id}>
                <a href="/#" onClick={() => {
                    this.showTracks(playlist.id);
                }} className="playlist-name">{playlist.name}</a>
                <Button onClick={() => {
                    this.executeUpdate(playlist.id, playlist.name)
                }}>
                    <Edit></Edit>
                </Button>
                <Button onClick={() => {
                    this.executeDelete(playlist.id)
                }}>
                    <RemoveCircle color="secondary"/>
                </Button>
            </li>)
        return (
            <div id="playlists-overview" className="modal-header">
                <h3>Playlists</h3>

                <Card class="flex-item">
                    <CardContent>
                        <ul>
                            {playlist_items}
                        </ul>
                    </CardContent>
                </Card>
                <Card class="flex-item">
                    <CardContent class="flex-container">
                    <span className="length">
                    Total length: {this.state.minutes}
                    </span>
                        <Button onClick={() => {
                            this.openDialog('newPlaylist')
                        }} class="add-button" id="openNewPlaylistButton">
                            <PlaylistAdd/>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}