import { TopTrackService } from "@src/domain/service/topTrackService";
import { TopTracksRequest } from "@src/domain/model/topTrackRequestType";
import { SpotifyClient } from "@src/infrastructure/spotifyClient";

export class TopTrackApplication {
    private token: string;
    private topTracksRequest: TopTracksRequest;

    constructor(token: string, topTracksRequest: TopTracksRequest) {
        this.token = token;
        this.topTracksRequest = topTracksRequest
    }

    async get() {
        const spotifyClient = new SpotifyClient(this.token);
        const topTrackService = new TopTrackService(spotifyClient, this.topTracksRequest);
        return await topTrackService.get();
    }
}
