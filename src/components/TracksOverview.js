import {Component} from 'react';
import {Card, CardContent} from "@mui/material";

export class TracksOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: []
        }
    }

    componentDidMount() {
        this.props.eventBus.on('playlist-selected', (id) => {
            this.props.apiGateway.getTracks(localStorage.getItem('token'), id, this.setTracks)
        })
    }

    setTracks = (tracks) => {
        this.setState({tracks: tracks});
    }

    render() {
        return (
            <div id="tracks-overview" className="flex-item">
                <Card >
                    <h3>Tracks</h3>
                    <CardContent>

                    <ul className="tracks">
                        {this.state.tracks.map((track, id) =>
                            <li className="flex-item flex-container" key={id}>
                                <span className="playlist-name">{track.title}</span>
                            </li>)
                        }
                    </ul>
                    </CardContent>
                </Card>
            </div>
        );
    }
}