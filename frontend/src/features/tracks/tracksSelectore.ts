import type {RootState} from "../../app/store.ts";

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectLoading = (state: RootState) => state.tracks.loading;