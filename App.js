import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screen/HomeScreen';
import FormulaireScreen from './Screen/FormulaireScreen';
import ListeScreen from './Screen/ListeScreen';
import FicheScreen from './Screen/FicheScreen';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Formulaire"
            component={FormulaireScreen}
          />
          <Stack.Screen
            name="Liste"
            component={ListeScreen}
          />
          <Stack.Screen
            name="Fiche"
            component={FicheScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;