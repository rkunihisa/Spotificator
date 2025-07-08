import { TopTracksResponse } from './topTrackResponseType';

export interface SpotifyClientInterface {
  getTopTracks(term: string, limit: number, offset: number): Promise<TopTracksResponse>;
}
