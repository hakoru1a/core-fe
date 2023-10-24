import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./redux/slice/location.slice";
import userReducer from "./redux/slice/user.slice";
import { socket } from "./socket";
import propertyReducer from "./redux/slice/property.slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
    property: propertyReducer,
  },
});

// Lấy RootState và AppDispatch từ store của chúng taz
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

function initSocket() {
  const user = store.getState().user;
  if (user.id) {
    socket.connect();
    socket.emit("init-user", { ...user, role: "CUSTOMER" });
  }
}
initSocket();
