'use client';

import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import authSlice from './slices/auth.slice';
import employeeSlice from './slices/employee.slice';
import masterdataSlice from './slices/masterdata.slice';
import roleSlice from './slices/role.slice';
import companySlice from './slices/company.slice';
import divisionSlice from './slices/division.slice';
import teamSlice from './slices/team.slice';
import directorateSlice from './slices/directorate.slice';
import departmentSlice from './slices/department.slice';
import sectionSlice from './slices/section.slice';
import positionSlice from './slices/position.slice';
import levelSlice from './slices/level.slice';
import absentgroupSlice from './slices/absentgroup.slice';
import relationSlice from './slices/relation.slice';
import healthLeaveReportSlice from './slices/health-leave-report.slice';
import permissionSlice from './slices/permission.slice';
import claimSlice from './slices/claim.slice';
import evaluationSlice from './slices/evaluation.slice';
import attendProblemSlice from './slices/attend-problem.slice';
import moduleSlice from './slices/module.slice';
import rasiteSlice from './slices/rasite.slice';
import functionSlice from './slices/function.slice';
import userRoleSlice from './slices/user-role.slice';

export const makeStore = (extraMiddlewares: any = []) =>
  configureStore({
    reducer: {
      auth: authSlice,
      employee: employeeSlice,
      masterdata: masterdataSlice,
      role: roleSlice,
      company: companySlice,
      division: divisionSlice,
      team: teamSlice,
      directorate: directorateSlice,
      department: departmentSlice,
      section: sectionSlice,
      position: positionSlice,
      level: levelSlice,
      absentgroup: absentgroupSlice,
      relation: relationSlice,
      healthLeaveReport: healthLeaveReportSlice,
      permission: permissionSlice,
      claim: claimSlice,
      evaluation: evaluationSlice,
      attendProblem: attendProblemSlice,
      module: moduleSlice,
      function: functionSlice,
      rasiteGroup: rasiteSlice,
      userRole: userRoleSlice,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(extraMiddlewares);
    },
    devTools: process.env.NEXT_PUBLIC_APP_ENV !== 'production',
  });

export const store = (extraMiddlewares: any) => makeStore(extraMiddlewares);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NEXT_PUBLIC_APP_ENV !== 'production',
});
