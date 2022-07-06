export class ApiGateway {
  login (user, pass, serverlocation, callback) {
    if (pass === 'rody') callback('tokentje')
  }

  getAllTracksNotInPlaylist (token, playlistid, callback) {
    callback([
      {
        'id': 1,
        'title': 'Song for someone',
        'performer': 'The Frames',
        'duration': 350,
        'album': 'The cost',
        'playcount': undefined,
        'publicationDate': undefined,
        'description': undefined,
        'offlineAvailable': false
      },
      {
        'id': 2,
        'title': 'The cost',
        'performer': 'The Frames',
        'duration': 423,
        'album': undefined,
        'playcount': 37,
        'publicationDate': '10-01-2005',
        'description': 'Title song from the Album The Cost',
        'offlineAvailable': true
      },
      {
        'id': 4,
        'title': 'So Long, Marianne',
        'performer': 'Leonard Cohen',
        'duration': 546,
        'album': 'Songs of Leonard Cohen',
        'playcount': undefined,
        'publicationDate': undefined,
        'description': undefined,
        'offlineAvailable': false
      }
    ])
  }

  addTrackToPlaylist (token, playlistid, track, callback) {
    callback([
      {
        'id': 1,
        'title': 'Song for someone',
        'performer': 'The Frames',
        'duration': 350,
        'album': 'The cost',
        'playcount': undefined,
        'publicationDate': undefined,
        'description': undefined,
        'offlineAvailable': false
      },
      {
        'id': 2,
        'title': 'The cost',
        'performer': 'The Frames',
        'duration': 423,
        'album': undefined,
        'playcount': 37,
        'publicationDate': '10-01-2005',
        'description': 'Title song from the Album The Cost',
        'offlineAvailable': true
      },
      {
        'id': 4,
        'title': 'So Long, Marianne',
        'performer': 'Leonard Cohen',
        'duration': 546,
        'album': 'Songs of Leonard Cohen',
        'playcount': undefined,
        'publicationDate': undefined,
        'description': undefined,
        'offlineAvailable': false
      }
    ])
  }

}