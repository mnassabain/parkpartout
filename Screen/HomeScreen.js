import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';

class HomeScreen extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>ParkPartout</Text>
        </View>

        <View style={styles.findContainer}>
          <Text style={styles.findText}>Trouvez un parking!</Text>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => this.props.navigation.navigate('Formulaire')}
          >
            <Text>&nbsp;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <Text style={styles.buttonTitle}>Cherchez par rapport à une adresse</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Formulaire')}
          >
            <Text style={styles.buttonText}>Chercher</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  findContainer: {
    flex: 4,
    alignItems: 'center'
  },
  findText: {
    fontSize: 14
  },
  bigButton: {
    marginTop: 20,
    backgroundColor: '#4152F2',
    height: 200,
    width: 200,
    paddingRight: 80,
    borderRadius: 150,
    alignItems: 'center'
  },
  buttonsContainer: {
    flex: 2
  },
  buttonTitle: {
    marginBottom: 8
  },
  button: {
    backgroundColor: '#4152F2',
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 80,
    paddingRight: 80,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
  }
});

export default HomeScreen;