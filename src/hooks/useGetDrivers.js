import React from 'react';
import {driversApi} from '../api/driversApi';
import {APIStatus} from '../lib/axiosAPI';
import {driversActionCreators} from '../slices/driversSlice';

export const useGetDrivers = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const {getDrivers} = driversApi();
  const {setDrivers} = driversActionCreators();

  const fetch = React.useCallback(page => {
    setStatus(APIStatus.Loading);
    getDrivers({
      onSuccess: response => {
        setDrivers(response.MRData);
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      page: page,
    });
  });
  return {fetch, status};
};
