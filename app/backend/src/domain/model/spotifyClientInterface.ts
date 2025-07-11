import { TopTracksResponse } from './topTrackResponseType';
import { TopTracksRequest } from './topTrackRequestType';
export interface SpotifyClientInterface {
  getTopTracks(TopTracksRequest: TopTracksRequest): Promise<TopTracksResponse>;
}
