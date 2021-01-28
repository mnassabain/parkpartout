import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';

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
          <Text style={styles.findText}>Trouver un parking près de moi</Text>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => this.props.navigation.navigate('Formulaire')}
          >
            <Image source={require('../assets/map-marker-alt-solid.png')} style={styles.imageStyle}/>
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
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#4152F2',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 11.14,
    elevation: 7,
  },
  titleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color: 'white',
  },
  findContainer: {
    flex: 4,
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
    paddingTop: 30,
    marginBottom: 20,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  findText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    // fontWeight: 'bold',
  },
  bigButton: {
    backgroundColor: 'white',
    backgroundColor: '#4152F2',
    height: 200,
    width: 200,
    marginTop: 20,
    borderRadius: 150,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 11.14,
    elevation: 7,
  },
  imageStyle: {
    width: '40%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flex: 3,
    marginBottom: 50,
    width: '100%',
    alignItems: 'center',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonTitle: {
    marginBottom: 15,
    fontFamily: 'Montserrat',
    fontSize: 14,
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
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  }
});

export default HomeScreen;