import { TopTracksResponse } from '../domain/model/topTracksResponseType';
import { TopTracksRequest } from '../domain/model/topTracksRequestType';
import { SpotifyClientInterface } from '../domain/model/spotifyClientInterface';

export class SpotifyClient implements SpotifyClientInterface {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getTopTracks(TopTracksRequest: TopTracksRequest): Promise<TopTracksResponse> {
    const params = new URLSearchParams({
      time_range: TopTracksRequest.term,
      limit: TopTracksRequest.limit.toString(),
      offset: TopTracksRequest.offset.toString(),
    });
    const url = `https://api.spotify.com/v1/me/top/tracks?${params.toString()}`;
    const headers = {
      'Authorization': `Bearer ${this.token}`,
    };
    const res = await fetch(url, { headers });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`Failed to fetch top tracks: ${res.status} ${res.statusText} `);
    }
  }
}

// if (require.main === module) {
//   const token = 'your token here';
//   const client = new SpotifyClient(token);
//   const topTracksRequest: TopTracksRequest = {
//     term: 'short_term',
//     limit: 10,
//     offset: 0,
//   };
//   client.getTopTracks(topTracksRequest)
//     .then(response => console.log(response))
//     .catch(error => console.error(error));
// }
