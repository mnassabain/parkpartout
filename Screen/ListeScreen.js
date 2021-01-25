import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Card, CardItem, Text } from 'native-base';

class ListeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listePar: this.props.route.params.listeParking,
  };
  }

  render() {
    var liste = [];
    var message = "";
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
            <CardItem style={styles.listItemInfo}>
              <View>
                <Text style={{fontWeight: 'bold'}}>
                  { item.fields.name }
                </Text>
              </View>
              <View style={styles.listItemInfoBottom}>
                <Text>{ item.fields.dist } mètre(s)</Text>
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