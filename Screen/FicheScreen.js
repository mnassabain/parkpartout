import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class FicheScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>More informations about your parking!</Text>

        <Button
          title="Go back to your list result"
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

export default FicheScreen;