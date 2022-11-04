import React from 'react';
import {useSelector} from 'react-redux';
import {useGetDrivers} from '../hooks/useGetDrivers';
import { StyleSheet, View } from 'react-native';
import {startCase} from 'lodash';
import Error from '../components/Error';
import Pagination from '../components/Pagination';
import ElementTable from '../components/ElementTable';
import CustomTable from '../components/CustomTable';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

const Main = React.memo(({navigation}) => {
  const [curPage, setCurPage] = React.useState(0);
  const [tableHead, setTableHead] = React.useState([]); 
  const [tableData, setTableData] = React.useState([]);
  const drivers = useSelector(state => state.driversData.drivers);
  const dataDrivers = useSelector(state => state.driversData.dataDrivers);  
  const {fetch, status} = useGetDrivers();

  const changeCell = (data, item, id, name, link) => {
    data.map(i => i.splice(item,1,
        <ElementTable
          id={i[id]}
          name={typeof name === 'number' ? i[name] : name}
          link={link}
          navigation={navigation}
        />,
      ),
    );
  };
  
  const renderTable = () => {
    const data = drivers.map((i, index) => {return Object.values(drivers[index])});
    const tableHead = Object.keys(drivers[0]);
    tableHead.map((i, index) => tableHead.splice(index, 1, startCase(i)));    
    changeCell(data, 1, 0, 1, 'Details');
    changeCell(data, 5, 5, 'wiki', '');
    changeCell(data, 6, 0, 'status', 'FinishedStatus');
    setTableHead(tableHead);
    setTableData(data);
  };

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
      {status === 'Success' 
      ? <CustomTable tableHead={tableHead} tableData={tableData} /> 
      : status === 'Failure' 
      ? <Error /> 
      : <CustomActivityIndicator style={{marginBottom: '100%'}} />
      }
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
});
