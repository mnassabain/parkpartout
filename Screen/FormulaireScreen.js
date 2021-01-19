import { View } from 'native-base';
import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';

class FormulaireScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        voie: "",
        rue: "",
        codepostal: "",
        environ: "1000",
        addresses: [],
        x: "",
        y: "",
    };
  }

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
   * 
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
    });

  }

  /**
   * Retourne les suggestions à afficher sur le DOM 
   */
  getSuggestions()
  {
    var suggestions = []; 
    for (let i = 0 ; i < this.state.addresses.length ; i++)
      {
        suggestions.push(
          <Button style={{ backgroundColor: '#263194' }} full key={this.state.addresses[i].properties.name}
                  onPress={evt => this.selectSuggestion( 
                                                        evt, 
                                                        this.state.addresses[i].properties.name, 
                                                        this.state.addresses[i].geometry.coordinates[0], 
                                                        this.state.addresses[i].geometry.coordinates[1],
                                                      )}>

            <Text style={{color: "#fff"}}>{this.state.addresses[i].properties.name}</Text>
          </Button>
        );
      }

      // On doit vérifier si le champ de recherche n'a pas bougé entre temps 
      if (this.state.rue.length < 3)
        return [];
      else 
        return suggestions;
  }

  render() {

    // Selection des suggestions par rapport à l'adresse renseignée
    // var suggestions = []; 
    // for (let i = 0 ; i < this.state.addresses.length ; i++)
    //   {
    //     suggestions.push(
    //       <Button style={{ backgroundColor: '#263194' }} full key={this.state.addresses[i].properties.name}
    //               onPress={evt => this.selectSuggestion( 
    //                                                     evt, 
    //                                                     this.state.addresses[i].properties.name, 
    //                                                     this.state.addresses[i].geometry.coordinates[0], 
    //                                                     this.state.addresses[i].geometry.coordinates[1],
    //                                                   )}>

    //         <Text style={{color: "#fff"}}>{this.state.addresses[i].properties.name}</Text>
    //       </Button>
    //     );
    //   }

    var suggestions = this.getSuggestions();

    return (
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Voie</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({voie: text})} value={this.state.voie} />
        </View> */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Rue</Text>
          <TextInput id='inputRue' style={styles.textInput} value={this.state.rue} onChangeText={value => this.predictionAddress(value)}/>
        </View>
        <View style={{ position: 'absolute', zIndex: 1000, width: '100%', bottom: 0 }}>
          { suggestions }
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Code postal</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({codepostal: text})} value={this.state.codepostal} />
        </View> */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Environ (m)</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({environ: text})} value={this.state.environ} /> 
          {/* TODO: slider? */}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Liste', {
              voie: this.state.voie,
              rue: this.state.rue,
              codepostal: this.state.codepostal,
              environ: this.state.environ,
              x: this.state.x,
              y: this.state.y,
            })}
          >
            <Text style={styles.buttonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 270, // TODO: relative size?
    borderColor: '#C9C9C9',
    marginTop: 5
  },
  inputContainer: {
    marginBottom: 25
  },
  label: {
    color: '#5E5F6F',
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
  },
  suggestionButton: {
    color: 'red',
  }
});

export default FormulaireScreen;