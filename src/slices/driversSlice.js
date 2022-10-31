import {bindActionCreators, createSlice} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

const initialState = {
  dataDrivers: null,
  drivers: null,
  driverDetails: null,
  status: null,
};

export const driversSlice = createSlice({
  initialState,
  name: 'driversSlice',
  reducers: {
    setDrivers: (state, {payload}) => {
      const driver = [];
      payload.DriverTable.Drivers.map((i, index) =>
        driver.push({
          driverId: i.driverId ?? null,
          givenName: i.givenName ?? null,
          familyName: i.familyName ?? null,
          dateOfBirth: i.dateOfBirth ?? null,
          nationality: i.nationality ?? null,
          wiki: i.url ?? null,
          finishedStatus: '',
          permanentNumber: i.permanentNumber ?? null,
        }),
      );
      state.dataDrivers = payload;
      state.drivers = driver;
    },

    setDriversDetails: (state, {payload}) => {
      state.driverDetails = payload;
    },
    setDriversStatus: (state, {payload}) => {
      state.status = payload;
    },
  },
});

export const driversActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...driversSlice.actions,
    },
    dispatch,
  );
};
