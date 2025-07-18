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
