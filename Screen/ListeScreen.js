import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class ListeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Here is your research's result(s)!</Text>

        <Button
          title="look for details information about this parking"
          onPress={() =>
            this.props.navigation.navigate('Fiche')
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

export default ListeScreen;