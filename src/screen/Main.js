import React from 'react';
import {useSelector} from 'react-redux';
import {useGetDrivers} from '../hooks/useGetDrivers';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking, ActivityIndicator} from 'react-native';
import {Table, Row, TableWrapper} from 'react-native-table-component';
import {startCase} from 'lodash';
import PaginationDot from 'react-native-animated-pagination-dot';
import Error from './Error';

const Main = React.memo(({navigation}) => {
  const {fetch, status} = useGetDrivers();
  const drivers = useSelector(state => state.driversData.drivers);
  const dataDrivers = useSelector(state => state.driversData.dataDrivers);
  const [curPage, setCurPage] = React.useState(0);
  const [tableHead, setTableHead] = React.useState([]);
  const [widthArr, setWidthArr] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);

  function element(id, name, link) {
    return (
      <TouchableOpacity
        onPress={() =>
          link ? navigation.navigate(link, {id}) : Linking.openURL(id)
        }>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function table() {
    return (
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && {backgroundColor: '#F7F6E7'},
                    ]}
                    textStyle={styles.text}
                  />
                </TableWrapper>
              ))}
            </Table>
            <Table borderStyle={{borderColor: 'transparent'}}></Table>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }

  function pagination() {
    return (
      <>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text>
            {`page ${curPage + 1}/${Math.ceil(dataDrivers?.total / 20)}`}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => setCurPage(curPage - 1)}
            style={{paddingRight: 20}}
            disabled={curPage === 0}>
            <Text>{'prev'}</Text>
          </TouchableOpacity>
          <PaginationDot
            curPage={curPage}
            maxPage={10}
            sizeRatio={1.8}
            activeDotColor={'#5EB5CB'}
          />
          <TouchableOpacity
            onPress={() => setCurPage(curPage + 1 ? curPage + 1 : 1)}
            style={{paddingLeft: 20}}
            disabled={curPage === Math.ceil(dataDrivers?.total / 20) - 1}>
            <Text>{'next'}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  React.useEffect(() => {
    if (drivers) {
      const data = [];
      const widthArr = [];
      const tableHead = Object.keys(drivers[0]);
      tableHead.map((i, index) => tableHead.splice(index, 1, startCase(i)));
      drivers.map((i, index) => data.push(Object.values(drivers[index])));
      tableHead.map(() => widthArr.push(100));
      data.map(i => i.splice(1, 1, element(i[0], i[1], 'Details')));
      data.map(i => i.splice(5, 1, element(i[5], 'wiki', '')));
      data.map(i => i.splice(6, 1, element(i[0], 'status', 'FinishedStatus')));
      setTableHead(tableHead);
      setTableData(data);
      setWidthArr(widthArr);
    }
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
        <>{table()}</>
      ) : status === 'Failure' ? (
        <Error />
      ) : (
        <View style={{marginBottom: '100%'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {pagination()}
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
  btn: {backgroundColor: '#78B7BB', borderRadius: 2, marginHorizontal: 10},
  btnText: {textAlign: 'center', color: '#fff'},
});
