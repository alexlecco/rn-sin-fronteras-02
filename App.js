import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const HomeScreen = ({ navigation }) =>  {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Pantalla principal</Text>
      <Button
        title="Ir a detalle"
        onPress={() => navigation.navigate('Details', { name: 'alex', id: 2 })}
      />
    </View>
  );
}

const DetailsScreen = ({ navigation }) => {
  const name = navigation.getParam('name', 'Usuario no encontrado')

  return (
    <View style={styles.container}>
      <Text>Detalles de {name}</Text>
      <Button
        title="Volver"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Details: {
    screen: DetailsScreen
  },
}, { initialRouteName: 'Home' })

export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
