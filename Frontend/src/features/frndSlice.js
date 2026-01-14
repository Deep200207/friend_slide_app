// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const addfrnd = createAsyncThunk(
//     "user/friendadd",
//     async ({ address, name, relationship, gender, dob, phone, email, notes }, { rejectWithValue }) => {
//         try {
//             const res = await fetch("http://localhost:3000/add",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ address, name, relationship, gender, dob, phone, email, notes })
//                 }
//             );
//             const data = await res.json();
//             if (!res.ok) {
//                 return rejectWithValue({ error: data.error });
//             }
//             return data;
//         } catch (err) {
//             return rejectWithValue({ error: "Network Error" });
//         }
//     }
// )
// const frndSlice = createSlice({
//     name: "friendSlide",
//     initialState: {
//         frnd: null,
//         loading: false,
//         error: null,
//         response: null,
//         isCreate: false,
//         message: null
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(addfrnd.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//                 state.response = null;
//             })
//             .addCase(addfrnd.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // state.frnd=action.meta.arg;
//                 state.frnd = action.meta.arg
//                 state.response = action.payload.message;
//                 state.isCreate = true;
//             })
//             .addCase(addfrnd.rejected, (state, action) => {
//                 state.error = action.payload?.error;
//                 // state.message=action.payload.message;
//                 state.loading = false;
//                 state.isCreate = false;
//             })
//     }
// })
// export default frndSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const searchFrnds = createAsyncThunk(
    "user/searchFrnds",
    async (name, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("slide_token")
            console.log(token)
            const res = await fetch(`http://localhost:3000/api/friends/search?search=${encodeURIComponent(name)}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue({ error: data.error });
            }
            return data;
        }
        catch (err) {
            return rejectWithValue({ error: "Network Error" })
        }
    }
)
export const getFriends = createAsyncThunk(
    "user/getFriends",
        async (_,{ rejectWithValue }) => {
            try {
                const token = localStorage.getItem("slide_token")
                const res = await fetch("http://localhost:3000/api/friends/get", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!res.ok) {
                    return rejectWithValue({ error: data.error });
                }
                const data = await res.json();
                return data;
            } catch (err) {
                return rejectWithValue({ error: "Network Error" })
            }
        }
)
const frndSlice = createSlice({
    name: "friendSlice",
    initialState: {
        frndsList: [],
        frnds: [],
        loading: false,
        error: null,
        response: null
    },
    //reducer--> help to handle own slice action
    //extrareducer Help to handle the action external action
    extraReducers: (builder) => {
        builder//->>> builder is helper object in redux that allows defining reducer for external action using 
        // methods like .addCase inside extra reducer
            //action search friends
            .addCase(searchFrnds.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.response = null;
            })
            .addCase(searchFrnds.fulfilled, (state, action) => {
                state.loading = false;
                state.frnds = action.payload;
                // state.frnds = action.payload;
                // console.log(frnds);
                console.log(state.frnds)
                state.error = null;
            })
            .addCase(searchFrnds.rejected, (state, action) => {
                state.loading = false;
                console.log(action)
                state.error = action.payload?.error;
                state.frnds = [];
            })
            // action of getFriends
            .addCase(getFriends.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.loading = false;
                // console.log(action.payload)
                state.frndsList = action.payload;
                state.error = null;
            })
            .addCase(getFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error;
                // console.log("error")
                // console.log(action.payload);

            })
    }
})
export default frndSlice.reducer;