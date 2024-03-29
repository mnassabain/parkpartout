import React from 'react';
import { StyleSheet, View, SafeAreaView, Button } from 'react-native';
import { Card, CardItem, Text } from 'native-base';
import { createOpenLink } from 'react-native-open-maps';

class FicheScreen extends React.Component {
  // init class
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.name,
      adress: this.props.route.params.adress,
      dist: this.props.route.params.dist,
      libre: this.props.route.params.libre,
  };
  }

  /**
   * Fonction pour formater une adresse
   * @param {string} address l'adresse
   */
  formatAddress = function(address) {
    return address.split(' 67')[0];
  }

  render() {
    const destination = { query: this.state.adress };
    const openDestination = createOpenLink(destination);

    return (
      <SafeAreaView style={styles.container}>
        
        <Card style={styles.itemInfoContainer}>
          <CardItem style={styles.itemInfo}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{ this.state.name }</Text>
            </View>
            <Text style={{marginBottom: 5, fontFamily: 'Rubik'}}>
              { this.formatAddress(this.state.adress) }
            </Text>
            <View style={styles.itemFooter}>
              <Text style={{fontFamily: 'Rubik'}}>
                { this.state.dist }
              </Text>
              { this.state.libre != undefined &&
              <Text style={[styles.places, (this.state.libre === 0) ? styles.full : null ]}>
                { this.state.libre } places
              </Text> }
            </View>
          </CardItem>
        </Card>

        <Button 
          color={'#bdc3c7'}
          onPress={openDestination}
          title="Click To Open Maps"
        >
        </Button>

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
    borderRadius: 10,
    borderColor: '#f0f0f0',
    marginBottom: 25,
    elevation: 0,
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
    fontFamily: 'Rubik-Medium',
    marginBottom: 5,
  },
  itemFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  places: {
    color: '#67C23A',
    fontFamily: 'Rubik-Bold',
  },
  full: {
    color: '#F56C6C',
  },
  mapContainer: {
    width: '90%',
    height: 250
  }
});

export default FicheScreen;