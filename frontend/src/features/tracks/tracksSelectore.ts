import type {RootState} from "../../app/store.ts";

export const selectTracks = (state: RootState) => state.track.tracks;
export const selectLoading = (state: RootState) => state.track.loading;