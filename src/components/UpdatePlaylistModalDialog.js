import React, {Component} from 'react';
import {PlaylistModalDialog} from "./PlaylistModalDialog";

export class UpdatePlaylistModalDialog extends Component {
    render() {
        return <PlaylistModalDialog open={this.props.open} action={"Update"}
                                    handleCancel={this.props.handleCancel}
                                    handleSave={this.props.handleSave}
                                    playlistName={this.props.playlistName}
                                    playlistId={this.props.playlistId}>
        </PlaylistModalDialog>
    }
}
