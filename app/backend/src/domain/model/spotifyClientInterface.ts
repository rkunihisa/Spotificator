import { TopTracksResponse } from './topTracksResponseType';
import { TopTracksRequest } from './topTracksRequestType';
export interface SpotifyClientInterface {
  getTopTracks(TopTracksRequest: TopTracksRequest): Promise<TopTracksResponse>;
}
