import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  // SafeAreaView,
  // ScrollView,
  // StatusBar,
  Text,
  View,
} from 'react-native';
import TaskScreen from '../Screens/TaskScreen';
import HomeScreen from '../Screens/HomeScreen';
import {ToDoContextProvider} from '../store/toDoContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell, faHamburger, faSearch} from '@fortawesome/free-solid-svg-icons';
import styles from './styles';

const Stack = createNativeStackNavigator();

const Header: React.FC<{
  title: string;
}> = ({title}) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const StackNav = () => (
  <ToDoContextProvider>
    <NavigationContainer>
      {/* <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}> */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerBackTitle: '',
          headerTintColor: 'black',
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <Header title="To-Do App" />,
            headerRight: () => (
              <View style={styles.icons}>
                <View style={styles.icon}>
                  <FontAwesomeIcon icon={faSearch} color="gray" />
                </View>
                <View style={styles.icon}>
                  <FontAwesomeIcon icon={faBell} color="gray" />
                </View>
                <View style={styles.icon}>
                  <FontAwesomeIcon icon={faHamburger} color="gray" />
                </View>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Task"
          component={TaskScreen}
          options={{
            headerTitle: () => <Header title="Add Task" />,
          }}
        />
      </Stack.Navigator>
      {/* </View>
        </ScrollView>
      </SafeAreaView> */}
    </NavigationContainer>
  </ToDoContextProvider>
);

export default StackNav;
