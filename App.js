import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import UpdateScreen from './screens/UpdateScreen';
import AddScreen from './screens/AddScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Tasks" component={HomeScreen} />
        <Stack.Screen name="Add Task" component={AddScreen} />
        <Stack.Screen name="Update Task" component={UpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
