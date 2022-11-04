import React, {memo} from 'react';
import {View, ActivityIndicator} from 'react-native';

const CustomActivityIndicator = memo(({style}) => {
  return (
    <View style={style}>
      <ActivityIndicator size="large" />
    </View>
  );
});

export default CustomActivityIndicator;
