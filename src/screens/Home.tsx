import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
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
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.brandText}>Up-right Solutions</Text>
          <Text style={styles.tagline}>
            Excellence in Utility & Digital Services
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.imagePlaceholder}>
            <Icon name="building" size={wp('20%')} color={Colors.border} />
            <Text style={styles.placeholderText}>Company Overview Image</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Our Company</Text>
            <Text style={styles.description}>
              Up-right Solutions is your premier partner in navigating the
              complexities of modern utility and administrative services. We
              specialize in providing streamlined, efficient, and trustworthy
              solutions for all your documentation and payment needs.
            </Text>
            <Text style={styles.description}>
              With years of experience and a commitment to excellence, we bridge
              the gap between complex government procedures and our valued
              clients, ensuring peace of mind and professional results every
              time.
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>10k+</Text>
              <Text style={styles.statLabel}>Happy Clients</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Services</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('UtilityServices')}
            >
              <Icon
                name="th-large"
                size={wp('5%')}
                color={Colors.white}
                style={styles.buttonIcon}
              />
              <Text style={styles.primaryButtonText}>Our Utility Services</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('ContactUs')}
            >
              <Icon
                name="envelope"
                size={wp('5%')}
                color={Colors.primary}
                style={styles.buttonIcon}
              />
              <Text style={styles.secondaryButtonText}>
                Contact Us (Other Services)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  brandText: {
    color: Colors.secondary,
    fontSize: wp('8%'),
    fontWeight: 'bold',
  },
  tagline: {
    color: Colors.white,
    fontSize: wp('4%'),
    marginTop: Spacing.xs,
    opacity: 0.9,
  },
  content: {
    padding: Spacing.lg,
  },
  imagePlaceholder: {
    width: '100%',
    height: hp('25%'),
    backgroundColor: '#E9ECEF',
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    fontSize: wp('3.5%'),
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: wp('4%'),
    color: Colors.text,
    lineHeight: wp('6%'),
    marginBottom: Spacing.sm,
    textAlign: 'left',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: Colors.accent,
  },
  statLabel: {
    fontSize: wp('3%'),
    color: Colors.textSecondary,
    marginTop: 2,
  },
  buttonContainer: {
    gap: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: Spacing.sm,
  },
});

export default Home;
