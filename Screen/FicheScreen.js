import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Card, CardItem, Text } from 'native-base';

class FicheScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        
        <Card style={styles.itemInfoContainer}>
          <CardItem style={styles.itemInfo}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>Parking Gambetta</Text>
              <Text>50 places</Text>
            </View>
            <Text style={{marginBottom: 5}}>1 Parc de l'Etoile</Text>
            <Text>1 km</Text>
          </CardItem>
        </Card>

        <Card style={styles.mapContainer}>
        </Card>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemInfoContainer: {
    marginTop: 50,
    width: '90%',
    shadowOpacity: 0,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 25,
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#f0f0f0',
  },
  itemHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mapContainer: {
    width: '90%',
    height: 250
  }
});

export default FicheScreen;