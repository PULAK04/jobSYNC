import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savedJobs: JSON.parse(localStorage.getItem("savedJobs")) || []
};

const savedJobSlice = createSlice({

    name: "savedJobs",

    initialState,

    reducers: {

        saveJob: (state, action) => {

            const exists = state.savedJobs.find(
                job => job._id === action.payload._id
            );

            if (!exists) {

                state.savedJobs.push(action.payload);

                localStorage.setItem(
                    "savedJobs",
                    JSON.stringify(state.savedJobs)
                );
            }
        },

        removeSavedJob: (state, action) => {

            state.savedJobs =
                state.savedJobs.filter(
                    job => job._id !== action.payload
                );

            localStorage.setItem(
                "savedJobs",
                JSON.stringify(state.savedJobs)
            );
        }
    }
});

export const {
    saveJob,
    removeSavedJob
} = savedJobSlice.actions;

export default savedJobSlice.reducer;