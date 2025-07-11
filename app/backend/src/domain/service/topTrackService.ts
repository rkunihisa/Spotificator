import { SpotifyClientInterface } from "../model/spotifyClientInterface";
import { TopTracksResponse } from "../model/topTrackResponseType";
import { TopTracksRequest } from "../model/topTrackRequestType";

export class TopTrackService {
    private spotifyClient: SpotifyClientInterface;
    private topTracksRequest: TopTracksRequest;

    constructor(spotifyClient: SpotifyClientInterface, topTracksRequest: TopTracksRequest) {
        this.spotifyClient = spotifyClient;
        this.topTracksRequest = topTracksRequest;
    }

    async get(): Promise<TopTracksResponse> {
        try {
            const response = await this.spotifyClient.getTopTracks(this.topTracksRequest);
            return response;
        } catch (error) {
            console.error("Error fetching top tracks:", error);
            throw new Error("Failed to fetch top tracks");
        }
    }
}
