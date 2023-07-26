// import {configureStore } from "@reduxjs/toolkit";
// import authslice from "../Slice/Loginslice";

// // const reducers = combineReducers({
// //   Logins : authslice,
// // });
// const Store = configureStore({
//    reducer:{
//     Logins : authslice,
//    }
// });

// export default Store;

import { configureStore } from "@reduxjs/toolkit";
import authslice from "../Slice/Loginslice";
import friendslice  from "../Slice/FriendChatSlice";

const stors = configureStore({
    reducer:{
        logins: authslice,
        friendChat:friendslice,
    }
});


export default stors;