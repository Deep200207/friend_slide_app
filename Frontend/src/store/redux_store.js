import {configureStore} from '@reduxjs/toolkit'
import  authReducer  from '../features/authSlice.js'
import frndReducer from '../features/frndSlice.js'
import searchReducer from "../features/searchSlice.js"
import updateReducer  from '../features/updateSlice.js'


export const store = configureStore({
    reducer: {
        auth : authReducer,
        friend : frndReducer,
        search : searchReducer,
        update : updateReducer
    },
})