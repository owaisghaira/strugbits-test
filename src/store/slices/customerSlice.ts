import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCustomers } from "../../api/customer.api";
import { ICustomer } from "../../types/customer";

export interface CustomerSliceState {
  customer_data: ICustomer[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: CustomerSliceState = {
  customer_data: [],
  loading: false,
  error: null,
};

export const doGetCustomers = createAsyncThunk(
  "customer/doGetCustomers",
  async () => {
    try {
      const storedData = localStorage.getItem("customer_data");

      if (storedData) {
        return JSON.parse(storedData) as ICustomer[];
      } else {
        let response = await fetchCustomers(1);
        response = response.data.map((item: ICustomer) => ({ ...item, name: item.first_name + ' ' + item.last_name }))
        return response;
      }
    } catch (error) {
      throw error;
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<ICustomer>) => {
      state.customer_data = [...state.customer_data, action.payload];
      localStorage.setItem("customer_data", JSON.stringify(state.customer_data));
    },
    updateCustomer: (state, action: PayloadAction<ICustomer>) => {
      const updatedCustomer = action.payload;
      const index = state.customer_data.findIndex((c) => c.id === updatedCustomer.id);
      if (index !== -1) {
        state.customer_data[index] = updatedCustomer;
        localStorage.setItem("customer_data", JSON.stringify(state.customer_data));
      }
    },
    deleteCustomer: (state, action: PayloadAction<number>) => {
      const deletedCustomerId = action.payload;
      state.customer_data = state.customer_data.filter((c) => c.id !== deletedCustomerId);
      localStorage.setItem("customer_data", JSON.stringify(state.customer_data));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doGetCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doGetCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customer_data = action.payload;
        state.error = null;
        localStorage.setItem("customer_data", JSON.stringify(action.payload));
      })
      .addCase(doGetCustomers.rejected, (state, action) => {
        state.loading = false;
        state.customer_data = [];
        state.error = action.error.message;
      });
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions;

export default customerSlice.reducer;
