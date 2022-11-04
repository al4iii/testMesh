import React, {memo} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Table, Row, TableWrapper} from 'react-native-table-component';

const CustomTable = memo(({tableHead, tableData}) => {
  return (
    <ScrollView horizontal={true}>
      <View>
        <Table borderStyle={styles.borderStyle}>
          <Row
            data={tableHead}
            widthArr={tableHead.map(() => 100)}
            style={styles.header}
            textStyle={styles.text}
          />
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={styles.borderStyle}>
            {tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                <Row
                  key={index}
                  data={rowData}
                  widthArr={tableHead.map(() => 100)}
                  style={[
                    styles.row,
                    index % 2 && {backgroundColor: '#F7F6E7'},
                  ]}
                  textStyle={styles.text}
                />
              </TableWrapper>
            ))}
          </Table>
          <Table borderStyle={styles.table}/>
        </ScrollView>
      </View>
    </ScrollView>
  );
});

export default CustomTable;

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#808B97',
  },
  text: {
    margin: 6,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF1C1',
    width: 800,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
  table: {
    borderColor: 'transparent',
  },
});
