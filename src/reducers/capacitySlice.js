import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import warehouseService from '../services/WarehouseService';

const initialState = {
    warehouseinfo: [],
    status: 'idle'
}

export const getWarehouseInfo = createAsyncThunk(
    'capacity/getCapacity',
    async () => {
        const response = await warehouseService.getCapacity();
        return response.data;
    }
)

export const capacitySlice = createSlice({
    name:'capacity',
    initialState,
    reducers:{ 
        updateShed: (state,action) => {
            state.warehouseinfo = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase( getWarehouseInfo.pending, (state) =>{
            state.status = 'loading'
        })
        .addCase(getWarehouseInfo.fulfilled,(state,action)=>{
            state.status = 'idle'
            state.warehouseinfo = action.payload
        })
    }
})

export const { updateShed } = capacitySlice.actions;

export const selectCapacityInfo = (state) => state.capacity.warehouseinfo;

export const appendNewBoxAsync = (shedid,body) => async (dispatch,_) => {
    await warehouseService.appendNewBox(shedid,body);
    const response = await warehouseService.getCapacity();
    dispatch(updateShed(response.data));
}

export const takeboxAsync = (shedid,body) => async (dispatch,_) => {
    await warehouseService.takeBox(shedid,body);
    const response = await warehouseService.getCapacity();
    dispatch(updateShed(response.data));
}

export const appendBoxAsync = (shedid,body) => async (dispatch,_) => {
    await warehouseService.appendBox(shedid,body);
    const response = await warehouseService.getCapacity();
    dispatch(updateShed(response.data));
}

export const deleteBoxAsync = (shedid,boxid) => async (dispatch, _) => {
    await warehouseService.deleteBox(shedid,boxid);
    const response = await warehouseService.getCapacity();
    dispatch(updateShed(response.data));
}

export default capacitySlice.reducer;