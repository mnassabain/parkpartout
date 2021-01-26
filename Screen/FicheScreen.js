import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Card, CardItem, Text } from 'native-base';

class FicheScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.name,
      adress: this.props.route.params.adress,
      dist: this.props.route.params.dist,
      libre: this.props.route.params.libre,
  };
  }

  formatDistance = function(dist) {
    if (dist < 1000) {
      return Math.floor(dist) + ' m';
    } else {
      if (dist < 10000) {
        return Number.parseFloat(dist).toFixed(1) + ' km'
      } else {
        return Math.floor(dist / 1000) + ' km';
      }
    }
  };

  formatAddress = function(address) {
    return address.split(' 67')[0];
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        
        <Card style={styles.itemInfoContainer}>
          <CardItem style={styles.itemInfo}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{ this.state.name }</Text>
            </View>
            <Text style={{marginBottom: 5}}>{ this.formatAddress(this.state.adress) }</Text>
            <View style={styles.itemFooter}>
              <Text>{ this.formatDistance(this.state.dist) }</Text>
              { this.state.libre != undefined &&
              <Text style={styles.places}>{ this.state.libre } places</Text> }
            </View>
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
  itemFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  places: {
    color: '#67C23A',
    fontWeight: 'bold'
  },
  mapContainer: {
    width: '90%',
    height: 250
  }
});

export default FicheScreen;