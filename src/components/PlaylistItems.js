import {Button} from "@mui/material";
import {Edit, RemoveCircle} from "@mui/icons-material";
import React, {Component} from 'react';
import {UpdatePlaylistModalDialog} from "./UpdatePlaylistModalDialog";
import {DeletePlaylistModalDialog} from "./DeletePlaylistModalDialog";

export class PlaylistItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatePlaylistModalDialogOpen: false,
            deletePlaylistModalDialogOpen: false,
            playlistId: null,
            playlistName: ''
        }
    }
    showTracks = (id) => {
        this.props.eventBus.dispatch('playlist-selected', id);
    }
    executeDelete = (id) => {
        this.setState({updatePlaylistModalDialogOpen: false, deletePlaylistModalDialogOpen: true, playlistId: id})
    }
    executeUpdate = (id, name) => {
        this.setState({updatePlaylistModalDialogOpen: true, deletePlaylistModalDialogOpen: false, playlistId: id, playlistName: name})
    }
    handleCancel = () => {
        this.setState({updatePlaylistModalDialogOpen: false, deletePlaylistModalDialogOpen: false, playlistId: '', playlistName: ''});
    }
    handleDeletePlaylist = (id) => {
        this.setState({updatePlaylistModalDialogOpen: false, deletePlaylistModalDialogOpen: false, playlistId: id});
        this.props.apiGateway.deletePlaylist(localStorage.getItem('token'), id, this.updatePlaylists);
    }
    handleModifyPlaylist = (id, playlistName) => {
        this.setState({updatePlaylistModalDialogOpen: false, deletePlaylistModalDialogOpen: false, playlistId: id, playlistName: playlistName});
        this.props.apiGateway.updatePlaylist(localStorage.getItem('token'), id, playlistName, this.updatePlaylists)
    }
    updatePlaylists = (playlists, length) => {
        this.props.eventBus.dispatch('playlists-updated', {'playlists': playlists, 'length': length})
    }

    render() {
        return (
            <div className="">
                <ul>
                    {
                        this.props.playlists.map((playlist, id) =>
                            <li className="flex-item flex-container" id={id} key={id}>
                                <a href="/#" onClick={() => {
                                    this.showTracks(playlist.id);
                                }} className="playlist-name">{playlist.name}</a>
                                <Button onClick={() => {
                                    this.executeUpdate(playlist.id, playlist.name)
                                }}>
                                    <Edit color="error"></Edit>
                                </Button>
                                <Button onClick={() => {
                                    this.executeDelete(playlist.id)
                                }}>
                                    <RemoveCircle color="error"/>
                                </Button>
                            </li>
                        )
                    }
                </ul>
                {this.state.updatePlaylistModalDialogOpen &&
                    <UpdatePlaylistModalDialog open={this.state.updatePlaylistModalDialogOpen} handleCancel={this.handleCancel}
                                               playlistName={this.state.playlistName}
                                               playlistId={this.state.playlistId}
                                               handleSave={this.handleModifyPlaylist}/>
                }
                {this.state.deletePlaylistModalDialogOpen &&
                    <DeletePlaylistModalDialog open={this.state.deletePlaylistModalDialogOpen} handleCancel={this.handleCancel}
                                               playlistId={this.state.playlistId}
                                               handleDelete={this.handleDeletePlaylist}/>
                }
            </div>
        )
    }
}