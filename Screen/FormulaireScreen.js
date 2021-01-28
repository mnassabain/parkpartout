import { View } from 'native-base';
import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AutoComplete from 'native-base-autocomplete';
import { Button, ListItem } from 'native-base';

class FormulaireScreen extends React.Component {
  // init class
  constructor(props) {
    super(props);
    this.state = {
        grise: true,
        rue: "",
        environ: "1000",
        addresses: [],
        x: "",
        y: "",
        listeParking: {
          records: []
        },
        detailsParking: {
          records: []
        }
    };
  }

  /**
   * Fonction qui sert à l'autocomplétion pour la recherche de l'utilisateur
   * @param {*} address ce qu'il est en train d'écrire dans le champs "Rue" du formulaire
   */
  async predictionAddress(address)
  {
    await this.setState({
      rue: address,
    });

    // Si l'adresse est inférieure à 3 chars, on ne doit pas faire de recherche
    if (address.length < 3)
    {
      await this.setState({
        addresses: [],
      });

      return;
    }

      // Formatage de l'url de l'api 
      var uri = "https://api-adresse.data.gouv.fr/search/?q=" + address;
      uri += "&citycode=67482&limit=3";
      uri = uri.replace(/\s/g, '+');

      // appel à l'api pour récupérer l'adresse 
      await fetch(uri).then(res => res.json()).then(data => {
        this.setState({
          addresses: data.features,
        });
    })
  }

  /**
   * Fonction qui sauvegarde les informations de l'adresse suggérée seléctionnée par l'utilisateur
   * @param {event} evt 
   * @param {string} address / adresse où l'on veut les coordonnées  
   * @param {float} x / Correspond à la longitude
   * @param {float} y / Correspond à la latitude
   */
  async selectSuggestion(evt, address, x, y)
  {
    await this.setState({
      rue: address,
      addresses: [],
      x: x,
      y: y,
      grise: false,
    });

  }

  /**
   * Function qui récupère les informations détaillées de chaque parking, ainsi que l'occupation en temps réel
   */
  async getParking()
  {
    var uriinfos = "https://data.strasbourg.eu/api/records/1.0/search/?dataset=parkings&q=&geofilter.distance=" + this.state.y + "%2C" + this.state.x + "%2C" + this.state.environ;
    var urilive = "https://data.strasbourg.eu/api/records/1.0/search/?dataset=occupation-parkings-temps-reel&q=&rows=30&facet=etat_descriptif";
    // appel à l'api pour récupérer la liste des parkings
    await fetch(uriinfos).then(res => res.json()).then(data => {
      this.setState({
        listeParking: data
      });
    })
    // appel à l'api pour récupérer l'occcupation en temps réel des parkings
    await fetch(urilive).then(res => res.json()).then(data => {
      this.setState({
        detailsParking: data
      });
      // puis on synchronise les données entre nos 2 réponses d'api
      this.syncData();
    })
  }

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
      listeParking: this.state.listeParking
    })
  }

  /**
   * Fonction qui permet simplement de désactiver le clic sur le bouton de recherche tant qu'une sélection n'est pas choisie
   */
  disabledButton()
  {
    this.setState({
      grise:true
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>Chercher parkings près d'une adresse</Text>
            </View>
            
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Rue</Text>
              <View style={styles.autocompleteContainer}>
                <AutoComplete
                  style={styles.textInput}
                  inputContainerStyle={styles.inputContainerStyle}
                  listStyle={styles.listStyle}
                  defaultValue={ this.state.rue }
                  data={ this.state.addresses }
                  onChangeText={ value => { this.disabledButton(); this.predictionAddress(value); }}
                  renderItem={data => (
                    <ListItem
                      style={styles.listItemStyle}
                      onPress={evt => this.selectSuggestion( 
                      evt,
                      data.properties.name, 
                      data.geometry.coordinates[0], 
                      data.geometry.coordinates[1],
                    )}>
                      <Text style={styles.listeItemText}>{ data.properties.name }</Text>
                    </ListItem>
                  )}>
                </AutoComplete>
              </View>
            </View>

            <View style={styles.environInputContainer}>
              <Text style={styles.label}>Environ (m)</Text>
              <TextInput style={styles.textInput} onChangeText={(text) => this.setState({environ: text})} value={this.state.environ} />
            </View>

            <View style={styles.buttonsContainer}>
              <Button
                style={styles.button}
                disabled={this.state.grise}
                onPress={() => this.getParking()}
              >
                <Text style={styles.buttonText}>Rechercher</Text>
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    padding: '15%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',    
  },
  titleContainer: {
    width: '100%',
  },
  title: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
  },
  autocompleteContainer: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 15,
    width: '100%',
  },
  listStyle: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  listItemStyle: {
    marginLeft: 0,
    paddingLeft: 10,
  },
  listeItemText: {
    fontFamily: 'Rubik',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    borderColor: '#C9C9C9',
    marginTop: 5,
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: 'Rubik'
  },
  inputContainer: {
    marginBottom: 25,
    position: 'relative',
    marginTop: 40,
    zIndex: (Platform.OS === 'android') ? undefined : 5,
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  environInputContainer: {
    marginTop: 40,
    marginBottom: 25,
    width: '100%',
  },
  label: {
    color: '#5E5F6F',
    fontFamily: 'Rubik',
  },
  button: {
    backgroundColor: '#4152F2',
    width: '100%',
    height: 'auto',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonsContainer: {
    zIndex: 0,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
  },
  suggestionButton: {
    color: 'red',
  }
});

export default FormulaireScreen;