import { TopTracksResponse } from '../domain/model/topTrackResponseType';
import { SpotifyClientInterface } from '../domain/model/spotifyClientInterface';

export class SpotifyClient implements SpotifyClientInterface {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getTopTracks(term: string, limit: number, offset: number): Promise<TopTracksResponse> {
    const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=${limit}&offset=${offset}`;
    const headers = {
      'Authorization': `Bearer ${this.token}`,
    };
    const res = await fetch(url, { headers });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`Failed to fetch top tracks: ${res.status} ${res.statusText}`);
    }
  }
}

// if (require.main === module) {
//   const token = 'your_access_token_here';
//   const client = new SpotifyClient(token);
//   client.getTopTracks('short_term', 10, 0)
//     .then(response => console.log(response))
//     .catch(error => console.error(error));
// }
