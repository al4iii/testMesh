import React from 'react';
import {driversApi} from '../api/driversApi';
import {APIStatus} from '../lib/axiosAPI';
import {driversActionCreators} from '../slices/driversSlice';

export const useGetDriverStatus = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const {getDriversStatus} = driversApi();
  const {setDriversStatus} = driversActionCreators();

  const fetch = React.useCallback(driverId => {
    setStatus(APIStatus.Loading);
    getDriversStatus({
      onSuccess: response => {
        setDriversStatus(response.MRData);
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
