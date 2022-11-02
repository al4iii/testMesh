import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PaginationDot from 'react-native-animated-pagination-dot';

const Pagination = memo(({curPage, setCurPage, dataDrivers}) => {
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
});

export default Pagination;
