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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Spacing, BorderRadius } from '../theme/theme';
import { ChildService } from '../constants/services';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'ServiceChildren'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ServiceChildren'>;

const ServiceChildren = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { parentTitle, parentIcon, children } = route.params;

  const renderChildItem = ({
    item,
    index,
  }: {
    item: ChildService;
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('Booking', {
          serviceTitle: `${parentTitle} — ${item.title}`,
        })
      }
    >
      <View style={styles.cardLeft}>
        <View style={styles.iconContainer}>
          <Icon name={item.icon} size={wp('5.5%')} color={Colors.primary} />
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>Tap to book this service</Text>
        </View>
      </View>
      <Icon name="chevron-right" size={wp('4%')} color={Colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
          <Icon name={parentIcon} size={wp('10%')} color={Colors.white} />
        </View>
        <Text style={styles.headerTitle}>{parentTitle}</Text>
        <Text style={styles.headerSubtitle}>
          {children.length} services available
        </Text>
      </View>

      <FlatList
        data={children}
        renderItem={renderChildItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerIconContainer: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('9%'),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    color: Colors.secondary,
    fontSize: wp('6.5%'),
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: Colors.white,
    fontSize: wp('3.5%'),
    marginTop: Spacing.xs,
    opacity: 0.85,
  },
  listContainer: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    color: Colors.text,
    fontSize: wp('4.2%'),
    fontWeight: '600',
  },
  cardSubtitle: {
    color: Colors.textSecondary,
    fontSize: wp('3%'),
    marginTop: 2,
  },
  separator: {
    height: Spacing.sm,
  },
});

export default ServiceChildren;
