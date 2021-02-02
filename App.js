import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screen/HomeScreen';
import FormulaireScreen from './Screen/FormulaireScreen';
import ListeScreen from './Screen/ListeScreen';
import FicheScreen from './Screen/FicheScreen';
import * as Font from 'expo-font';
import { Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik';
import Constants from 'expo-constants';

const Stack = createStackNavigator();

class App extends React.Component {

  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      Rubik: Rubik_400Regular,
      'Rubik-Medium': Rubik_500Medium,
      'Rubik-Bold': Rubik_700Bold,
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <View style={{height: Constants.statusBarHeight, backgroundColor: '#2F399B' }}>
            <StatusBar translucent barStyle={'light-content'} />
          </View>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
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
    } else {
      return null;
    }
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