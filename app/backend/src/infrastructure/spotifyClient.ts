import { TopTracksResponse } from '../domain/model/topTrackResponseType';
import { SpotifyClientInterface } from '../domain/model/spotifyClientInterface';

export class SpotifyClient implements SpotifyClientInterface {
  async getTopTracks(token: string, term: string, limit: number, offset: number): Promise<TopTracksResponse> {
    const url = `https://api.spotify.com/v1/me/top/tracks?time_range${term}?limit=${limit}&offset=${offset}`;
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const res = await fetch(url, { headers });
    if (res.ok) {
      return await res.json()
    } else {
      throw new Error(`Failed to fetch top tracks: ${res.status} ${res.statusText}`);
    }
  }
}

// if (require.main === module) {
//   const client = new SpotifyClient();
//   const token = 'your_access_token_here';
//   client.getTopTracks(token, 'short_term', 10, 0)
//     .then(response => console.log(response))
//     .catch(error => console.error(error));
// }