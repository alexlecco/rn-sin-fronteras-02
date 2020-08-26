import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const Logo = () =>
  <Image
    source={{
      uri: 'https://www.syncspider.com/wp-content/uploads/2019/10/twilio_thumb.png',
      width: 50,
      height: 50
    }}
  />

const HomeScreen = ({ navigation }) =>  {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Pantalla principal</Text>
      <Button
        title="Ir a detalle"
        onPress={() => navigation.navigate('Details', { name: 'alex', id: 1 })}
      />
    </View>
  );
}

HomeScreen.navigationOptions = {
  headerTitle: () => <Logo />
}

const DetailsScreen = ({ navigation }) => {
  const name = navigation.getParam('name', 'Usuario no encontrado')

  return (
    <View style={styles.container}>
      <Text>Detalles de {name}</Text>
      <Button
        title="Volver"
        onPress={() => navigation.setParams({ title: 'Usuario 1' })}
      />
    </View>
  );
}

DetailsScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  return {
    title: navigation.getParam('title', 'Cargando...')
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Details: {
    screen: DetailsScreen
  },
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#fec'
    },
    headerTintColor: '#555',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
})

export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
