import { createSlice } from "@reduxjs/toolkit";

const trainerSlice = createSlice({
    name: 'Trainer',
    initialState: '',
    reducers: {
        setTrainerGlobal:(state, action) => action.payload
    }
})
export const { setTrainerGlobal} = trainerSlice.actions


export default trainerSlice.reducer

