import React from 'react';
import { driversApi } from '../api/driversApi';
import {APIStatus} from '../lib/axiosAPI';
import {driversActionCreators} from '../slices/driversSlice';

export const useGetDriverDetails = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const {getDriversDetails} = driversApi();
  const {setDriversDetails} = driversActionCreators();

  const fetch = React.useCallback(driverId => {
    setStatus(APIStatus.Loading);
    getDriversDetails({
      onSuccess: response => {
        setDriversDetails(response.MRData.DriverTable.Drivers);
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      driverId: driverId,
    });
  });
  return {fetch, status};
};
