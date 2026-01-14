import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateUser = createAsyncThunk(
    "updateUser",
    async ({ name, gender, relationship, dob, phone, email, notes }) => {
        const res = await fetch("http://localhost:3000/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials:"include",
            body: JSON.stringify({
                name,
                gender,
                relationship,
                dob,
                phone,
                email,
                notes
            })
        })
        if (!res.ok) {
            throw new Error("Failed to update")
        }
        return await res.json();
    }
)

const updateSlide=createSlice({
    name:"updateSlide",
    initialState:{
        loading:false,
        response:null,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(updateUser.pending, (state)=>{
            state.loading=true;
        })
        .addCase(updateUser.fulfilled, (state,action)=>{
            state.loading=false;
            state.response=action.payload;
            // localStorage.setItem("slide_user",JSON.stringify(action.payload))
            state.error=null;
        })
        .addCase(updateUser.rejected, (state)=>{
            state.loading=false;
            state.error="Error Occur";
        })
    }
})
export default updateSlide.reducer;