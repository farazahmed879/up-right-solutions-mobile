import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Spacing, BorderRadius } from '../theme/theme';
import { RootStackParamList } from '../navigation/AppNavigator';

type BookingRouteProp = RouteProp<RootStackParamList, 'Booking'>;

const Booking = () => {
  const route = useRoute<BookingRouteProp>();
  const navigation = useNavigation();
  const { serviceTitle } = route.params as { serviceTitle: string };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: '',
  });

  const handleBooking = () => {
    if (!formData.name || !formData.phone) {
      Alert.alert(
        'Incomplete Form',
        'Please provide at least your name and phone number.',
      );
      return;
    }

    Alert.alert(
      'Success',
      `Your request for ${serviceTitle} has been received. Our representative will contact you shortly on ${formData.phone}.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceLabel}>Selected Service:</Text>
              <Text style={styles.serviceName}>{serviceTitle}</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Contact Details</Text>
            <Text style={styles.formSubtitle}>
              Please fill in your details and we will get back to you.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="user"
                  size={16}
                  color={Colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChangeText={text =>
                    setFormData({ ...formData, name: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="envelope"
                  size={16}
                  color={Colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={text =>
                    setFormData({ ...formData, email: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number *</Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="phone"
                  size={16}
                  color={Colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your mobile number"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={text =>
                    setFormData({ ...formData, phone: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Additional Details</Text>
              <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Any specific requirements?"
                  multiline
                  numberOfLines={4}
                  value={formData.details}
                  onChangeText={text =>
                    setFormData({ ...formData, details: text })
                  }
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleBooking}>
              <Text style={styles.buttonText}>Confirm Booking</Text>
              <Icon
                name="arrow-right"
                size={16}
                color={Colors.white}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingBottom: Spacing.xl,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  serviceInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  serviceLabel: {
    color: Colors.white,
    fontSize: wp('3.5%'),
    opacity: 0.8,
  },
  serviceName: {
    color: Colors.white,
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: Colors.cardBg,
    marginTop: -Spacing.md,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  formTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: wp('3.5%'),
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: wp('3.8%'),
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: '#F1F3F5',
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    height: 50,
    color: Colors.text,
    fontSize: wp('4%'),
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
});

export default Booking;
