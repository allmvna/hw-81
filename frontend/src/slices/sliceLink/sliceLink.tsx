import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export interface ILink {
    originalUrl: string;
    shortUrl: string;
}

interface LinkState {
    links: ILink[];
    isLoading: boolean;
    error: boolean;
}

const initialState: LinkState = {
    links: [],
    isLoading: false,
    error: false,
};

export const getLink = createAsyncThunk(
    'links/getLink',
    async () => {
        const { data } = await axiosAPI.get('/links');
        return data;
    }
);

export const postLink = createAsyncThunk(
    'links/postLink',
    async (url: string) => {
        const { data } = await axiosAPI.post('/links', { url });
        return data;
    }
);

export const sliceLink = createSlice({
    name: 'links',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLink.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getLink.fulfilled, (state, action) => {
                state.isLoading = false;
                state.links = action.payload;
            })
            .addCase(getLink.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(postLink.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(postLink.fulfilled, (state, action) => {
                state.isLoading = false;
                state.links.push(action.payload);
            })
            .addCase(postLink.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const linksReducer = sliceLink.reducer;
