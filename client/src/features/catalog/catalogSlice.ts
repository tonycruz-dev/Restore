import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configStore";


const productsAdpter =  createEntityAdapter<Product>();

export const fetchProductsAsync =  createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
   async (_, thunkAPI) => {
    try {
        return await agent.Catalog.list();
    } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
    }
   }
)
export const fetchProductAsync =  createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
   async (productId, thunkAPI) => {
    try {
        return await agent.Catalog.details(productId);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
    }
   }
)

export const  cataloSlice =  createSlice({
    name: 'catalog',
    initialState: productsAdpter.getInitialState({
        productsLoaded: false,
        status: 'idel'
    }),
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdpter.setAll(state, action.payload)
            state.status = 'idel';
            state.productsLoaded =  true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idel';
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdpter.upsertOne(state, action.payload)
            state.status = 'idel';
        });
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = 'idel';
        });

    },
})
export const productSelecters =  productsAdpter.getSelectors((state: RootState) => state.catalog);