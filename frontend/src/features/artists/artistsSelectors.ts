import type {RootState} from "../../app/store.ts";

export const selectArtist = (state: RootState) => state.artists.artists;
export const selectLoading = (state: RootState) => state.artists.loading;