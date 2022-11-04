import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useGetDriverStatus} from '../hooks/useGetDriverStatus';
import {Table, Row, Rows} from 'react-native-table-component';
import Error from '../components/Error'
import CustomActivityIndicator from '../components/CustomActivityIndicator';

const FinishedStatus = React.memo(({route}) => {
  const {id} = route.params;
  const [tableData, setTableData] = React.useState([]);
  const finishedStatus = useSelector(state => state.driversData.status);  
  const {fetch, status} = useGetDriverStatus();  

  React.useEffect(() => {
    fetch(id);
  }, [id]);

  React.useEffect(() => {
    if (finishedStatus) {
      const data = finishedStatus.StatusTable.Status.map((i, index) => {
        return Object.values(finishedStatus.StatusTable.Status[index]);
      });
      setTableData(data);
    }
  }, [finishedStatus]);

  return (
    <>
      {status === 'Success' ? (
        <ScrollView>
          <View style={styles.main}>
            <Text style={styles.text}>{`Series: ${finishedStatus?.series}`}</Text>
            <Text style={styles.text}>{`DriverId : ${finishedStatus?.StatusTable?.driverId}`}</Text>
            <Text style={styles.text}>{`Results : ${finishedStatus?.StatusTable?.Status?.length}`}</Text>
          </View>
          <View style={styles.container}>
            <Table borderStyle={styles.borderStyle}>
              <Row
                data={['StatusId', 'Status', 'Count']}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={tableData} textStyle={styles.text} />
            </Table>
          </View>
        </ScrollView>
      ) : status === 'Failure' ? (
        <Error />
      ) : (
        <CustomActivityIndicator style={styles.activityIndicator} />
      )}
    </>
  );
});

export default FinishedStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  main: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  borderStyle:{
    borderWidth: 2,
    borderColor: '#c8e1ff'
  }
});
