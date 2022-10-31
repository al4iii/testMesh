import axios from 'axios';

const baseURL = 'http://ergast.com/api/f1/'

export const APIStatus = {
  Initial: 'Initial',
  Loading: 'Loading',
  Success: 'Success',
  Failure: 'Failure',
};

export const getCallAPI = () => props => async () => {
  const {
    url,
    payload,   
    onError,
    config,    
    customBaseUrl,  
  } = props;
  let response;
  // console.log(props, 'props');
  try {
    const method = config?.method;
    if (method && method.toLowerCase() === 'put') {
      response = await axios.put(
        (customBaseUrl || baseURL) + url,
        payload,
        config,
      );
    } else if (method && method.toLowerCase() === 'get') {      
      response = await axios.get((customBaseUrl || baseURL) + url, config);
    } else if (method && method.toLowerCase() === 'delete') {
      response = await axios.delete((customBaseUrl || baseURL) + url, config);
    } else {
      response = await axios.post(
        (customBaseUrl || baseURL) + url,
        payload,
        config,
      );
    }
    if (props.config.onSuccess) {
      // console.log('success call api', response.data);
      props.config.onSuccess(response.data);
    } else {      
      // console.log(response, 'error!!');
      props.config.onError(response);
    }
  } catch (err) {    
    props.config.onError(response);
    if (onError) {
      props.config.onError(err);
      // console.log(err, 'Error err');
    }
  }
};

export const callAPI = getCallAPI();
