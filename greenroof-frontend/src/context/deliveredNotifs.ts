import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notif } from "../services/Types";

interface NotifState {
    notifs: Notif[];
    notifToastList: Notif[];
}

const initialState: NotifState = {
    notifs: [],
    notifToastList: [],
};

export const deliveredNotifsSlice = createSlice({
    name: "deliveredNotifs",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<{ newNotifs: Notif[] }>) => {
            state.notifs = [...state.notifs, ...action.payload.newNotifs];
            state.notifToastList = [
                ...state.notifToastList,
                ...action.payload.newNotifs,
            ];
        },
        clear: (state) => {
            state.notifs = [];
        },
        removeFromToastList: (
            state,
            action: PayloadAction<{ notifID: number }>
        ) => {
            state.notifToastList = state.notifToastList.filter(
                (x) => x.id !== action.payload.notifID
            );
        },
    },
});

export const { add, clear, removeFromToastList } = deliveredNotifsSlice.actions;
export default deliveredNotifsSlice.reducer;
