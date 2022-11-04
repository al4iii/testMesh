import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import { API_URL } from '../constants/api';
import {callAPI} from '../lib/axiosAPI';

const getDrivers = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `drivers.json?limit=20&offset=${args.page * 20}`,
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      ...args,
    },
  });
};

const getDriversDetails = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `drivers/${args.driverId}.json`,
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      ...args,
    },
  });
};

const getDriversStatus = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `drivers/${args.driverId}/status.json`,
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      ...args,
    },
  });
};

export const APIs = {
  getDrivers,
  getDriversDetails,
  getDriversStatus,
};

export const driversApi = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
