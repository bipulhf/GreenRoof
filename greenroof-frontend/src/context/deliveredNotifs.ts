import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

 interface Notif {
  value: string;
}

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
    removeFromToastList: (state, action: PayloadAction<{ notif: Notif }>) => {
      state.notifToastList = state.notifToastList.filter(
        (x) => x.value !== action.payload.notif.value
      );
    },
  },
});
   

export const { add, clear, removeFromToastList } = deliveredNotifsSlice.actions;
export default deliveredNotifsSlice.reducer;
 

 