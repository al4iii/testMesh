import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useGetDriverDetails} from '../hooks/useGetDriverDetails';
import Error from './Error';

const Details = React.memo(({route}) => {
  const {id} = route.params;
  const driverDetails = useSelector(state => state.driversData.driverDetails);
  const {fetch, status} = useGetDriverDetails();

  React.useEffect(() => {
    fetch(id);
  }, [id]);
  
  return (
    <View style={styles.container}>
      {status === 'Success' && driverDetails ? (
        <View>
          <Text style={styles.text}>
            {`driver Id : ${driverDetails[0]?.driverId}`}
          </Text>
          <Text style={styles.text}>
            {`Date of birth : ${driverDetails[0]?.dateOfBirth}`}
          </Text>
          <Text style={styles.text}>
            {`Family name : ${driverDetails[0]?.familyName}`}
          </Text>
          <Text style={styles.text}>
            {`Given name : ${driverDetails[0]?.givenName}`}
          </Text>
          <Text style={styles.text}>
            {`Nationality : ${driverDetails[0]?.nationality}`}
          </Text>
          <Text style={styles.text}>{`Link : ${driverDetails[0]?.url}`}</Text>
        </View>
      ) : status === 'Failure' ? <Error/> :  (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
});

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {margin: 6, fontSize: 16},
});
