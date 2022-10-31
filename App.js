import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import Main from './src/screen/Main';
import {Provider} from 'react-redux';
import {store} from './src/store';
import Details from './src/screen/Details';
import FinishedStatus from './src/screen/FinishedStatus';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Main" component={Main} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="FinishedStatus" component={FinishedStatus} options={{headerTitle: 'Finished status'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
