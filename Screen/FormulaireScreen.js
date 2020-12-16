import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class FormulaireScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Fill up your informations!</Text>

        <Button
          title="look for parkings with these informations"
          onPress={() =>
            this.props.navigation.navigate('Liste')
          }
        />
      </View>
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
});

export default FormulaireScreen;