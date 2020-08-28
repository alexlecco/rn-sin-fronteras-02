import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

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
        onPress={() => navigation.navigate('Details', { name: 'alex', id: 1 })}
      />
    </View>
  );
}

HomeScreen.navigationOptions = {
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

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen
  },
  Details: {
    screen: DetailsScreen
  },
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state
      let iconName
      if(routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : 'outline'}`
      } else {
        iconName = `ios-options`
      }
      return <Ionicons name={iconName} size={20} tintColor={tintColor} />
    },
    tabBarOptions: {
      activeTintColor: navigation.state.routeName === 'Home' ? '#e91e63' : 'orange',
      inactiveTintColor: '#a3a3a3',
      labelStyle: {
        fontSize: 16
      },
      style: {
        backgroundColor: '#fec'
      }
    }
  })
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
