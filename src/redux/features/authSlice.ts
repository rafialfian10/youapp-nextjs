import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { API } from "@/app/api/api";
// -----------------------------------------------------

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ data }: { data: any }, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const formData = {
        username: data?.username,
        email: data?.email,
        password: data?.password,
      };

      const body = JSON.stringify(formData);

      const response = await API.post("/api/login", body, config);
      if (response.status === 201) {
        const user = await response.data;
        localStorage.setItem("token", JSON.stringify(user?.access_token));
        
        return user;
      }
    } catch (error: any) {
      return rejectWithValue((error as Error).message || "Failed to login");
    }
  }
);

type AuthState = {
  user: null | any;
  isLogin: boolean;
  loading: boolean;
  error: null | any;
};

const initialState: AuthState = {
  user: null,
  isLogin: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLogin = true; 
    },
    ClearUser: (state) => {
      state.user = null;
      state.isLogin = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { SetUser, ClearUser } = authSlice.actions;
export default authSlice.reducer;
