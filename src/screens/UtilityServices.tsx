import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Spacing, BorderRadius } from '../theme/theme';
import { SERVICES, Service } from '../constants/services';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'UtilityServices'
>;

const UtilityServices = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleServicePress = (service: Service) => {
    if (service.children && service.children.length > 0) {
      navigation.navigate('ServiceChildren', {
        parentTitle: service.title,
        parentIcon: service.icon,
        children: service.children,
      });
    } else {
      navigation.navigate('Booking', {
        serviceTitle: service.title,
      });
    }
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => handleServicePress(item)}
    >
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={wp('8%')} color={Colors.primary} />
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      {item.children && item.children.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.children.length} services</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.brandText}>Up-right Solutions</Text>
        <Text style={styles.tagline}>
          Your trusted partner for utility services
        </Text>
      </View>

      <FlatList
        data={SERVICES}
        renderItem={renderServiceItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  welcomeText: {
    color: Colors.white,
    fontSize: wp('4.5%'),
    opacity: 0.8,
  },
  brandText: {
    color: Colors.secondary,
    fontSize: wp('7.5%'),
    fontWeight: 'bold',
    marginTop: Spacing.xs,
  },
  tagline: {
    color: Colors.white,
    fontSize: wp('3.5%'),
    marginTop: Spacing.sm,
    opacity: 0.9,
  },
  listContainer: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    margin: Spacing.sm,
    flex: 1,
    minHeight: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    color: Colors.primary,
    fontSize: wp('3.8%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  badge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.round,
    marginTop: Spacing.xs,
  },
  badgeText: {
    color: Colors.white,
    fontSize: wp('2.5%'),
    fontWeight: '600',
  },
});

export default UtilityServices;
