import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Spacing, BorderRadius } from '../theme/theme';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigation.navigate('Home');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Something went wrong. Please try again.';
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Icon
                name="user-lock"
                size={wp('10%')}
                color={Colors.secondary}
              />
            </View>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>
              Login to access your personalized services
            </Text>
          </View>

          <View style={styles.formContainer}>
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
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="lock"
                  size={16}
                  color={Colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? 'eye-slash' : 'eye'}
                    size={16}
                    color={Colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <>
                  <Text style={styles.buttonText}>Login</Text>
                  <Icon
                    name="sign-in-alt"
                    size={16}
                    color={Colors.white}
                    style={{ marginLeft: 10 }}
                  />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.footerLink}>Register Now</Text>
              </TouchableOpacity>
            </View>
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
    padding: Spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  logoContainer: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('9%'),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    color: Colors.white,
    fontSize: wp('6.5%'),
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.white,
    fontSize: wp('3.5%'),
    opacity: 0.85,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: Colors.cardBg,
    marginTop: -Spacing.xl,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.xl,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: wp('3.5%'),
    fontWeight: '600',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.white,
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: wp('3.8%'),
  },
  footerLink: {
    color: Colors.primary,
    fontSize: wp('3.8%'),
    fontWeight: 'bold',
  },
});

export default Login;
