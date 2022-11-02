import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';

const ElementTable = memo(({navigation, id, name, link}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        link ? navigation.navigate(link, {id}) : Linking.openURL(id)
      }>
      <View
        style={{
          backgroundColor: '#78B7BB',
          borderRadius: 2,
          marginHorizontal: 10,
        }}>
        <Text style={{textAlign: 'center', color: '#fff'}}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default ElementTable;
