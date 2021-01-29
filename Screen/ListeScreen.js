import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Card, CardItem, Text } from 'native-base';

class ListeScreen extends React.Component {
  // init class
  constructor(props) {
    super(props);
    this.state = {
      listePar: this.props.route.params.listeParking,
    };
  }

  /**
   * Fonction pour formater l'affichage des distances
   * @param {float} dist la distance en mètres
   */
  formatDistance = function(dist) {
    if (dist < 1000) {
      return Math.floor(dist) + ' m';
    } else {
      if (dist < 10000) {
        return (Number.parseFloat(dist) / 1000).toFixed(1) + ' km'
      } else {
        return Math.floor(dist / 1000) + ' km';
      }
    }
  };

  render() {
    var liste = [];
    var message = "";

    // Formatage du résultat qu'on affiche
    if (this.state.listePar.nhits != 0) {
      var message = "Parkings trouvés ("+ this.state.listePar.nhits +")";
      var liste = this.state.listePar.records.map((item) => {
        return (
          <Card
            key={item.fields.idsurfs}
            style={styles.listItem}
          >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Fiche', {
                name: item.fields.name,
                adress: item.fields.address,
                dist: item.fields.dist,
                libre: item.libre,
              })
            }
          >
            {/* Affichage du nom, ainsi que de la distance qui sépare chaque parking de notre point de recherche */}
            <CardItem style={styles.listItemInfo}>
              <View>
                <Text style={{fontFamily: 'Rubik-Medium'}}>
                  { item.fields.name }
                </Text>
              </View>
              <View style={styles.listItemInfoBottom}>
                <Text style={{fontFamily: 'Rubik'}}>
                  { this.formatDistance(item.fields.dist) }
                </Text>
              </View>
            </CardItem>
            </TouchableOpacity>
          </Card>
        );
      });
    }
    else {
      var message = "Aucun parking trouvé.";
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.listInfo}>
          <Text style={styles.total}>{ message }</Text>
        </View>
        {/* Si on trouve au moins un parking, on affiche la liste. */}
        { liste != [] &&
          <View style={styles.listContainer}>
            { liste }
          </View>
        }

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
    fontFamily: 'Rubik',
  },
  listContainer: {
    width: '90%',
  },
  listItem: {
    width: '100%',
    shadowOpacity: 0,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    marginLeft: 0,
    borderRadius: 10,
    borderColor: '#f0f0f0',
    elevation: 0,
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
    fontFamily: 'Montserrat',
  }
});

export default ListeScreen;