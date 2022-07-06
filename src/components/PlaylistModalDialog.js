import React, {Component} from 'react';
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

export class PlaylistModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: this.props.playlistName
        };
    }

    onInputchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (<Dialog open={this.props.open} onClose={this.props.handleCancel}>
            <DialogTitle>{this.props.action} Playlist</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To {this.props.action} a playlist enter the new name for the playlist and press Save
                </DialogContentText>
                <TextField autoFocus margin="dense" id="name" name="playlistName" label="Name" type="text"
                           variant="standard" value={this.state.playlistName}
                           onChange={this.onInputchange}
                />
                <input type="hidden" name="playlistId" value={this.props.playlistId}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.props.handleCancel()}>Cancel</Button>
                <Button
                    onClick={() => this.props.handleSave(this.props.playlistId, this.state.playlistName)}>Save</Button>
            </DialogActions>
        </Dialog>);
    }
}