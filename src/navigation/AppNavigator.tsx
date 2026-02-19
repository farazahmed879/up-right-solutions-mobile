import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../screens/Home';
import UtilityServices from '../screens/UtilityServices';
import ServiceChildren from '../screens/ServiceChildren';
import ContactUs from '../screens/ContactUs';
import Booking from '../screens/Booking';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { ChildService } from '../constants/services';
import { useAuth } from '../context/AuthContext';
import { Colors, Spacing } from '../theme/theme';

export type RootStackParamList = {
  Home: undefined;
  UtilityServices: undefined;
  ServiceChildren: {
    parentTitle: string;
    parentIcon: string;
    children: ChildService[];
  };
  ContactUs: undefined;
  Booking: { serviceTitle: string };
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthHeaderRight = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigation = useNavigation<any>();

  if (isLoggedIn) {
    return (
      <TouchableOpacity onPress={() => logout()} style={styles.headerButton}>
        <View style={styles.avatarContainer}>
          <Icon name="user-alt" size={16} color={Colors.primary} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Login')}
      style={styles.headerButton}
    >
      <Icon name="sign-in-alt" size={20} color={Colors.white} />
    </TouchableOpacity>
  );
};

const AppNavigator = () => {
  const { isLoading: isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#003366',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <AuthHeaderRight />,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Up-right Solutions' }}
      />
      <Stack.Screen
        name="UtilityServices"
        component={UtilityServices}
        options={{ title: 'Our Services' }}
      />
      <Stack.Screen
        name="ServiceChildren"
        component={ServiceChildren}
        options={({ route }) => ({ title: route.params.parentTitle })}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ title: 'Contact Us' }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{ title: 'Book Service' }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login', headerRight: () => null }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'Create Account', headerRight: () => null }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginRight: Spacing.md,
    padding: Spacing.xs,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
});

export default AppNavigator;
