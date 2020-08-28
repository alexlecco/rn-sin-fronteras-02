import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

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
      <StatusBar style='auto' />
      <Text>Pantalla principal</Text>
      <Button
        title='Ir a detalle'
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
}

HomeScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => {
    return <Ionicons name='ios-information-circle' size={25} color={tintColor} />
  },
  headerTitle: () => <Logo />,
  headerRight: (
    <TouchableOpacity
        onPress={() => alert('presionado')}
        style={{ marginRight: 10 }}
      >
        <Text>presionar</Text>
    </TouchableOpacity>
  )
}

const DetailsScreen = ({ navigation }) => {
  const name = navigation.getParam('name', 'Usuario no encontrado')
  const [ count, setCount ] = useState(0)
  const incrementar = () => setCount(count + 1)

  useEffect(
    () => {
      navigation.setParams({ incrementar })
    }, [ count ]
  )
  
  return (
    <View style={styles.container}>
      <Text>Detalles de {name}</Text>
      <Text>{count}</Text>
      <Button
        title='Abrir modal'
        onPress={() => navigation.navigate('customModal')}
      />
    </View>
  );
}

DetailsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('title', 'Cargando...'),
    headerRight: (
      <TouchableOpacity
        onPress={navigation.getParam('incrementar')}
        style={{ marginRight: 10 }}
      >
        <Text>incrementar</Text>
      </TouchableOpacity>
    )
  }
}

const AppNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Details: {
    screen: DetailsScreen
  },
}, {
  initialRouteName: 'Home',
})

const RootStack = createStackNavigator({
  MainStack: AppNavigator,
  customModal: () => <View style={styles.container}><Text>Modal</Text></View>
}, {
  mode: 'modal',
  headerMode: 'none'
})

export default createAppContainer(RootStack)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
