import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import { Content, Spinner } from 'native-base';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      location: '',
      listeParking: {
        records: []
      },
      detailsParking: {
        records: []
      }
    };
  }

    findNearMe() {
    this.setState({'loading' : true});
    navigator.geolocation.getCurrentPosition(info => {
      // console.log(info['coords'].latitude);
      this.getParking(info['coords'].longitude, info['coords'].latitude);
    });
  };


    /**
   * Fonction pour synchroniser les données des 2 api appelées précédemment
   */
  async syncData()
  {
    // on n'update pas le state directement, mais on passe par une variable externe, car update un state 
    // très régulièrement est coûteux sur le long terme
    var listeParking = this.state.listeParking;
    var detail = this.state.detailsParking;
    
    for (let j = 0; j < detail.records.length; j++)
    {
      // on regarde si on a des informations sur un parking donnée sur les 2 jeux de données
      var index = listeParking.records.findIndex(el => el.fields.idsurfs == detail.records[j].fields.idsurfs);
      if (index != -1) // element not found if index == -1
      {
        // si on trouve, on ajoute alors à notre premier jeu de données les infos du second jeu de données
        listeParking.records[index] = {...listeParking.records[index], libre: detail.records[j].fields.libre};
      }
    }

    // on peut setState, car c'est une seule variable, bien moins coûteux que d'update dans une boucle 
    this.setState({listeParking});

    // puis on transmet les informations à notre écran suivant, qui s'occupe d'afficher la liste des parkings résultats
    await this.props.navigation.navigate('Liste', {
      listeParking: this.state.listeParking,
    });
    this.setState({
      'loading': false,
    });
  }

   /**
   * Function qui récupère les informations détaillées de chaque parking, ainsi que l'occupation en temps réel
   */
  async getParking(x, y)
  {
    var uriinfos = "https://data.strasbourg.eu/api/records/1.0/search/?dataset=parkings&q=&geofilter.distance=" + y + "%2C" + x + "%2C" + "1000";
    var urilive = "https://data.strasbourg.eu/api/records/1.0/search/?dataset=occupation-parkings-temps-reel&q=&rows=30&facet=etat_descriptif";
    // console.log(uriinfos);
    // appel à l'api pour récupérer la liste des parkings
    await fetch(uriinfos).then(res => res.json()).then(data => {
      this.setState({
        listeParking: data
      });
    });

    // Sécurité si on ne se trouve pas dans la ville de Strasbourg 
    if (typeof this.state.listeParking.error != "undefined")
    {
      // console.log("trt terminé car localisation invalide");
      return;
    }

    // appel à l'api pour récupérer l'occcupation en temps réel des parkings
    await fetch(urilive).then(res => res.json()).then(data => {
      this.setState({
        detailsParking: data
      });
      // puis on synchronise les données entre nos 2 réponses d'api
      this.syncData();
    })
  };
  
  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView>
          <View style={styles.container}>
            <Text style={styles.titleText}>Localisation...</Text>
            <Spinner />
          </View>
        </SafeAreaView>
      );
    }
    else {
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>ParkPartout</Text>
            </View>

            <View style={styles.findContainer}>
              <Text style={styles.findText}>Trouver un parking près de moi</Text>
              <TouchableOpacity
                style={styles.bigButton}
                onPress={() => this.findNearMe()}
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
    fontFamily: 'Rubik-Bold',
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
    fontFamily: 'Rubik',
  },
  bigButton: {
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
    fontFamily: 'Rubik',
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
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
  }
});

export default HomeScreen;