import { View } from 'native-base';
import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, TouchableOpacity } from 'react-native';

class FormulaireScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        voie: "",
        rue: "",
        codepostal: "",
        environ: "1000",
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Voie</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({voie: text})} value={this.state.voie} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Rue</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({rue: text})} value={this.state.rue} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Code postal</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({codepostal: text})} value={this.state.codepostal} />
        </View>

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
  }
});

export default FormulaireScreen;