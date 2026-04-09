import type {RootState} from "../../app/store.ts";

export  const selectTrackHistory = (state: RootState) => state.trackHistory.trackHistory;
export  const selectLoading = (state: RootState) => state.trackHistory.loading;