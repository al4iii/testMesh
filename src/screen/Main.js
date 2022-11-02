import React from 'react';
import {useSelector} from 'react-redux';
import {useGetDrivers} from '../hooks/useGetDrivers';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import {startCase} from 'lodash';
import Error from './Error';
import Pagination from './Pagination';
import ElementTable from './ElementTable';
import CustomTable from './CustomTable';

const Main = React.memo(({navigation}) => {
  const [curPage, setCurPage] = React.useState(0);
  const [tableHead, setTableHead] = React.useState([]);
  const [widthArr, setWidthArr] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const drivers = useSelector(state => state.driversData.drivers);
  const dataDrivers = useSelector(state => state.driversData.dataDrivers);
  const {fetch, status} = useGetDrivers();

  const renderTable =()=> {
    const data = [];
    const widthArr = [];
    const tableHead = Object.keys(drivers[0]);
    tableHead.map((i, index) => tableHead.splice(index, 1, startCase(i)));
    drivers.map((i, index) => data.push(Object.values(drivers[index])));
    tableHead.map(() => widthArr.push(100));
    data.map(i => i.splice(1, 1, <ElementTable id={i[0]} name={i[1]} link={'Details'} navigation={navigation}/>));
    data.map(i => i.splice(5, 1, <ElementTable id={i[5]} name={'wiki'} link={''} navigation={navigation}/>));
    data.map(i => i.splice(6, 1, <ElementTable id={i[0]} name={'status'} link={'FinishedStatus'} navigation={navigation}/>));
    setTableHead(tableHead);
    setTableData(data);
    setWidthArr(widthArr);
  }

  React.useEffect(() => {
    drivers && renderTable();
  }, [drivers]);

  React.useEffect(() => {
    fetch(curPage);
  }, [curPage]);

  React.useEffect(() => {
    fetch(curPage);
  }, []);

  return (
    <View style={styles.container}>
      {status === 'Success' ? (
        <CustomTable
          tableHead={tableHead}
          widthArr={widthArr}
          tableData={tableData}
        />
      ) : status === 'Failure' ? (
        <Error />
      ) : (
        <View style={{marginBottom: '100%'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <Pagination
        curPage={curPage}
        setCurPage={setCurPage}
        dataDrivers={dataDrivers}
      />
    </View>
  );
});

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  header: {height: 50, backgroundColor: '#808B97'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1', width: 800},
});
