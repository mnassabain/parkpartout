import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Card, CardItem, Text } from 'native-base';

class ListeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voie: this.props.route.params.voie,
      rue: this.props.route.params.rue,
      codepostal: this.props.route.params.codepostal,
      environ: this.props.route.params.environ,
      x: this.props.route.params.x,
      y: this.props.route.params.y,
  };
  }

  render() {
    var listItems = ['La rotonde', 'Gambetta', 'Parking 3', 'Parking 4', 'a', 'b', 'c', 'd'].map((item) => {
      return (
        <Card
          key={item}
          style={styles.listItem}
        >
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Fiche')
          }
        >
          <CardItem style={styles.listItemInfo}>
            <View>
              <Text style={{fontWeight: 'bold'}}>
                { item }
              </Text>
            </View>
            <View style={styles.listItemInfoBottom}>
              <Text>11 places</Text>
              <Text>1 km</Text>
            </View>
          </CardItem>
          </TouchableOpacity>
        </Card>
      );
    });

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>

        <View style={styles.listInfo}>
          <Text style={styles.total}>Avenue rentrée: { this.state.voie }</Text>
          <Text style={styles.total}>Rue rentrée: { this.state.rue }</Text>
          <Text style={styles.total}>Code Postal rentré: { this.state.codepostal }</Text>
          <Text style={styles.total}>Distance max rentrée: { this.state.environ }</Text>
          <Text style={styles.total}>Coord x rentrée: { this.state.x }</Text>
          <Text style={styles.total}>Coord y rentrée: { this.state.y }</Text>
        </View>

        <View style={styles.listInfo}>
          <Text style={styles.total}>Liste résultats(15)</Text>
        </View>        

        { listItems }

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 70,
  },
  listInfo: {
    marginTop: 50,
    width: '90%',
    marginBottom: 15,
  },
  total: {
    color: '#868793',
  },
  listItem: {
    width: '90%',
    shadowOpacity: 0,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },
  listItemInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#f0f0f0',
  },
  listItemInfoBottom: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  }
});

export default ListeScreen;