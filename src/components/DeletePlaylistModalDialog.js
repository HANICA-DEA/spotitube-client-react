import React, {Component} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

export class DeletePlaylistModalDialog extends Component {
    render() {
        return (<Dialog
            open={this.props.open}
            onClose={this.props.handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Do you really want to delete this playlist?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    When you click "Yes" the playlist is removed permanently.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.props.handleCancel()} autoFocus>No</Button>
                <Button onClick={() => this.props.handleDelete(this.props.playlistId)}>Yes</Button>
            </DialogActions>
        </Dialog>)
    }
}