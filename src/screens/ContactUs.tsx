import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Spacing, BorderRadius } from '../theme/theme';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !message) {
      Alert.alert(
        'Missing Information',
        'Please provide at least your name and message.',
      );
      return;
    }
    Alert.alert(
      'Success',
      'Your inquiry has been sent. We will contact you soon.',
    );
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Icon name="headset" size={wp('15%')} color={Colors.secondary} />
          <Text style={styles.headerTitle}>Contact Us</Text>
          <Text style={styles.headerSubtitle}>
            For services outside our usual domain
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="john@example.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Subject (Desired Service)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Legal Consulting"
            value={subject}
            onChangeText={setSubject}
          />

          <Text style={styles.label}>Message / Details</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your requirement here..."
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Send Inquiry</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Other Ways to Reach Us</Text>
          <View style={styles.infoRow}>
            <Icon
              name="phone"
              size={wp('5%')}
              color={Colors.primary}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>+1 (123) 456-7890</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon
              name="map-marker-alt"
              size={wp('5%')}
              color={Colors.primary}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>
              123 Business Avenue, City Center
            </Text>
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
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: wp('7%'),
    fontWeight: 'bold',
    marginTop: Spacing.sm,
  },
  headerSubtitle: {
    color: Colors.white,
    fontSize: wp('3.5%'),
    opacity: 0.8,
    marginTop: 4,
  },
  form: {
    padding: Spacing.lg,
    marginTop: Spacing.md,
  },
  label: {
    fontSize: wp('3.8%'),
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
    marginLeft: 2,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: wp('4%'),
    marginBottom: Spacing.md,
    color: Colors.text,
  },
  textArea: {
    height: hp('15%'),
  },
  submitButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    elevation: 3,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  infoSection: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.md,
  },
  infoTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  infoIcon: {
    width: wp('8%'),
  },
  infoText: {
    fontSize: wp('4%'),
    color: Colors.textSecondary,
  },
});

export default ContactUs;
