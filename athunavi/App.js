/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';



type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer/>
    );
  }
}


//WelCome Screen
class WelcomeScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button  title='Login' onPress={()=> this.props.navigation.navigate('Dashbord')}/>
        <Button  title='SignUp' onPress={()=> alert('Button Pressed')}/>
      </View>
    );
  }
}

//Dashbord Component

class DashbordScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Dashbord Screen</Text> 
      </View>
    );
  }
}

class Feed extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button title='GO TO DETAIL SCREEN' onPress={()=>this.props.navigation.navigate('Detail')}/> 
      </View>
    );
  }
}

class Profile extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Profile</Text> 
      </View>
    );
  }
}

class Settings extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Settings</Text> 
      </View>
    );
  }
}

class Detail extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Detail</Text> 
      </View>
    );
  }
}


const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: ({navigation})=> {
      return {
        headerTitle: 'Feed',
        headerLeft : (
          <TouchableOpacity onPress={()=> navigation.openDrawer()} style={{paddingLeft: 10}}>
            <Text>Menu</Text>
          </TouchableOpacity>
        )
      }
    }
  },
  Detail: {
    screen: Detail
  }
},
//Thease options will be applied to entire stack
{
  defaultNavigationOptions: {
    gesturesEnabled: false
}
})


const ProfileStack = createStackNavigator({
  profile: {
    screen: Profile,
    navigationOptions: ({navigation})=> {
      return {
        headerTitle: 'Profile',
        headerLeft : (
          <TouchableOpacity onPress={()=> navigation.openDrawer()} style={{paddingLeft: 10}}>
            <Text>Menu</Text>
          </TouchableOpacity>
        )
      }
    }
  }
})

const SettingsStack = createStackNavigator({
  settings: {
    screen: Settings,
    navigationOptions: ({navigation})=> {
      return {
        headerTitle: 'Settings',
        headerLeft : (
          <TouchableOpacity onPress={()=> navigation.openDrawer()} style={{paddingLeft: 10}}>
            <Text>Menu</Text>
          </TouchableOpacity>
        )
      }
    }
  }
})

//getting Header on Tabs
const DashbordTabNavigator = createBottomTabNavigator({
  FeedStack,
  ProfileStack,
  SettingsStack
}, {
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    return{
      header: null,
      headerTitle: routeName
    };
  }
})

const DashbordStackNavigator = createStackNavigator({
  DashbordTabNavigator: DashbordTabNavigator
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={()=> navigation.openDrawer()} style={{paddingLeft: 10}}>
          <Text>Menu</Text>
        </TouchableOpacity>
      )
    };
  }
}

)

//It will accessed by Switch Navigator
const AppDrawerNavigator = createDrawerNavigator({
  Dashbord: {screen: DashbordStackNavigator}
})

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {screen: WelcomeScreen},
  Dashbord: {screen: AppDrawerNavigator} 
})

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  }
});
