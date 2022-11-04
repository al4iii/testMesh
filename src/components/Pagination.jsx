import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PaginationDot from 'react-native-animated-pagination-dot';

const Pagination = memo(({curPage, setCurPage, dataDrivers}) => {
  return (
    <>
      <View style={styles.container}>
        <Text>
          {`page ${curPage + 1}/${Math.ceil(dataDrivers?.total / 20)}`}
        </Text>
      </View>
      
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setCurPage(curPage - 1)}
          style={styles.arrowRight}
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
          style={styles.arrowLeft}
          disabled={curPage === Math.ceil(dataDrivers?.total / 20) - 1}>
          <Text>{'next'}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
});

export default Pagination;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  arrowRight: {
    paddingRight: 20,
  },
  arrowLeft: {
    paddingLeft: 20,
  },
});
