import { TopTracksResponse } from './topTrackResponseType';

export interface SpotifyClientInterface {
  getTopTracks(tokne: string, term: string, limit: number, offset: number): Promise<TopTracksResponse>;
}
