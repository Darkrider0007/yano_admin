// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "axios";

// // export const loginUser = createAsyncThunk(
// //   "auth/signin",
// //   async (userCredentials) => {
// //     const request = await axios.post(
// //       "https://yano-backend.onrender.com/api/userdoctor/login",
// //       userCredentials
// //     );
// //     const response = await request.data;
// //     localStorage.setItem("user", JSON.stringify(response));
// //     return response;
// //   }
// // );
// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState: {
// //     loading: false,
// //     user: null,
// //     error: null,
// //   },
// //   reducers: {
// //     logout(state) {
// //       localStorage.removeItem("user");
// //       state.user = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(loginUser.pending, (state) => {
// //         (state.loading = true), (state.user = null), (state.error = null);
// //       })
// //       .addCase(loginUser.fulfilled, (state, action) => {
// //         (state.loading = false),
// //           (state.user = action.payload),
// //           (state.error = null);
// //       })
// //       .addCase(loginUser.rejected, (state, action) => {
// //         (state.loading = false),
// //           (state.user = null),
// //           (state.error = action.error.message);
// //       });
// //   },
// // });
// // export const { logout } = authSlice.actions;
// // export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const loginUser = createAsyncThunk(
//   "auth/signin",
//   async (userCredentials) => {
//     const request = await axios.post(
//       "https://yano-backend.onrender.com/api/userdoctor/login",
//       userCredentials
//     );
//     const response = await request.data;
//     localStorage.setItem("user", JSON.stringify(response));
//     return response;
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     loading: false,
//     user: JSON.parse(localStorage.getItem("user")) || null,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.user = null;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.user = null;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// auth/Settings/adminList/createAdmin
// Thunk to handle signup
export const signupUser = createAsyncThunk(
  "auth/Settings/adminList/createAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://yano-backend.onrender.com/api/userdoctor/signup",
        adminData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/signin",
  async (userCredentials, { rejectWithValue }) => {
    console.log(userCredentials);
    try {
      const request = await axios.post(
        "https://yano-backend.onrender.com/api/userdoctor/login",
        userCredentials
      );

      console.log(request);
      const response = await request.data;
      localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signup actions
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || action.error.message;
      })

      // Handle login actions
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
