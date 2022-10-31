import React from 'react';
import {View, Text} from 'react-native';

const Error = React.memo(() => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{'Something wrong'}</Text>
    </View>
  );
});

export default Error;
