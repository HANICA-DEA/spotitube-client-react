import React, {Component} from 'react';
import {PlaylistModalDialog} from "./PlaylistModalDialog";

export class NewPlaylistModalDialog extends Component {
   render() {
        return <PlaylistModalDialog open={this.props.open} action={"Add"} handleCancel={this.props.handleCancel} handleSave={this.props.handleSave}></PlaylistModalDialog>
    }
}
