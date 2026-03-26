import type {RootState} from "../../app/store.ts";

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectLoading = (state: RootState) => state.albums.loading;