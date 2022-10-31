import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {callAPI} from '../lib/axiosAPI';

const API_URL = 'http://ergast.com/api/f1/';

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
