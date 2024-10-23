import { createSlice } from "@reduxjs/toolkit";
import { HealthAndLeaveBalanceType } from "@root/libs/types/leave-and-health";

export interface HealthLeaveReportState {
  healthLeaveReports: any[];
  healthLeaveReport: any;
  healthAndLeaveBalance: HealthAndLeaveBalanceType;
  loading: boolean;
  error: unknown;
}

const initialState = {
  healthLeaveReports: [],
  healthLeaveReport: {},
  healthAndLeaveBalance: {},
  loading: false,
  error: null,
};

const healthLeaveReportSlice = createSlice({
  name: "healthLeaveReport",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setHealthLeaveReport(state, action) {
      state.healthLeaveReports = action.payload;
    },
    setHealthLeaveReportDetail(state, action) {
      state.healthLeaveReport = action.payload;
    },
    setHealthAndLeaveBalance(state, action) {
      state.healthAndLeaveBalance = action.payload;
    },
  },
});

export const healthLeaveReportActions = healthLeaveReportSlice.actions;
export default healthLeaveReportSlice.reducer;
