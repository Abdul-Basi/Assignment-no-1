import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView, // Added for better mobile layout
} from 'react-native';
// Note: You must ensure 'react-native-gesture-handler' is imported first in your root file if not using Expo Managed Workflow
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, Button } from 'react-native-paper'; // Using Card and Button from Paper

// --- Navigation Setup ---
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- New Color Palette (Deep Blue/Purple Theme) ---
const colors = {
  primary: '#6200EE', // Deep Purple
  secondary: '#03DAC6', // Teal Accent
  background: '#F5F5F5', // Light Gray Background
  cardBackground: '#FFFFFF', // White Cards
  text: '#212121', // Dark Text
  lightText: '#616161', // Medium Gray Text
  placeholder: '#BDBDBD', // Light Gray Placeholder
  buttonText: '#FFFFFF',
  error: '#B00020', // Red Error
};

// ================== Login Screen ==================
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Simple validation logic
    if (email.trim() && password.trim()) {
      // Replace navigation to prevent going back to login
      navigation.replace('MainTabs');
    } else {
      setError('Please enter your email and password.');
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <View style={styles.authContent}>
        <Text style={styles.title}>SkillSwap</Text>
        <Text style={styles.subtitle}>Peer-to-Peer Skill Exchange</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.placeholder}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Don’t have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ================== Signup Screen ==================
function SignupScreen({ navigation }) {
  const handleSignup = () => {
    // Mock signup logic
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <View style={styles.authContent}>
        <Text style={styles.title}>SkillSwap</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          placeholderTextColor={colors.placeholder}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.placeholder}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already a member? Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Dummy Data ---
const dummyOffers = [
  {
    id: '1',
    title: 'Data Structures Tutoring',
    tutor: 'M Ali .',
    rating: 4.8,
    category: 'Tech',
  },
  {
    id: '2',
    title: 'Poster Design for Club Event',
    tutor: 'Raheel Nawaz.',
    rating: 4.5,
    category: 'Design',
  },
  {
    id: '3',
    title: 'Public Speaking Coaching',
    tutor: 'Mahad.',
    rating: 4.9,
    category: 'Communication',
  },
  {
    id: '4',
    title: 'Introduction to Web Design (HTML/CSS)',
    tutor: 'M Rameez.',
    rating: 4.7,
    category: 'Tech',
  },
];

// ================== Home Screen (Explore/Feed) ==================
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.pageTitle}>Explore Available Skills</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for Python, Design, Music..."
          placeholderTextColor={colors.placeholder}
        />

        {dummyOffers.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.ratingText}>{item.rating} ★</Text>
              </View>
              <Text style={styles.cardSubtitle}>Offered by: {item.tutor}</Text>
              <Text style={styles.cardTag}>{item.category}</Text>
              <Button
                mode="contained"
                onPress={() => alert(`View details for ${item.title}`)}
                style={styles.actionButton}
                labelStyle={styles.actionButtonLabel}>
                View Offer
              </Button>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('PostSkill')}>
        <Icon name="add" size={24} color={colors.buttonText} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ================== Post Skill Screen (New Stack Screen) ==================
function PostSkillScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handlePost = () => {
    if (title && description) {
      console.log('Posted Skill:', title, description);
      alert('Skill posted successfully!');
      navigation.goBack();
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.pageTitle}>Offer Your Skill</Text>

        <TextInput
          style={styles.input}
          placeholder="Skill Title (e.g., Python Basics)"
          placeholderTextColor={colors.placeholder}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Detailed Description (what you offer and what you seek in return)"
          placeholderTextColor={colors.placeholder}
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Category (e.g., Coding, Design, Music)"
          placeholderTextColor={colors.placeholder}
        />

        <TouchableOpacity style={styles.button} onPress={handlePost}>
          <Text style={styles.buttonText}>CREATE SWAP OFFER</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================== Swaps Screen (My Bookings) ==================
function SwapsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>My Active Swaps</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Data Structures Session</Text>
          <Text style={styles.cardSubtitle}>
            Status: Booked for Tuesday, 4 PM
          </Text>
          <Text style={styles.cardSubtitle}>You are giving: Logo Design</Text>
          <Button
            mode="outlined"
            color={colors.primary}
            style={{ marginTop: 10 }}>
            Cancel Session
          </Button>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Public Speaking Practice</Text>
          <Text style={styles.cardSubtitle}>Status: Pending Confirmation</Text>
          <Text style={styles.cardSubtitle}>
            You are receiving: Speaking Coach
          </Text>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}

// ================== Messages Screen ==================
function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Messages</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Ali K.</Text>
          <Text style={styles.cardSubtitle}>
            "Are you free next week for the coding swap?"
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>System Notifications</Text>
          <Text style={styles.cardSubtitle}>
            "Your Graphic Design offer was viewed 5 times."
          </Text>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}

// ================== Profile Screen ==================
function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Icon name="person-circle-outline" size={80} color={colors.primary} />
        <Text style={styles.profileName}>M Abdul Basit</Text>
        <Text style={styles.profileInfo}>
          j.basit@skillswap.com | Avg Rating: 4.6
        </Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        <Text style={styles.sectionHeader}>Skills Offered (Tutor)</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.skillTag}>Graphic Design</Text>
          <Text style={styles.skillTag}>Creative Writing</Text>
        </View>

        <Text style={styles.sectionHeader}>Skills I Want (Learner)</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.skillTagLight}>Data Science</Text>
          <Text style={styles.skillTagLight}>Yoga</Text>
        </View>

        <Button
          mode="contained"
          color={colors.secondary}
          style={styles.editButton}>
          Edit Profile
        </Button>
        <Button mode="text" color={colors.text} style={styles.logoutButton}>
          Log Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================== Tab Navigator ==================
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightText,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.placeholder,
        },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Feed') iconName = 'search-circle-outline';
          else if (route.name === 'Swaps') iconName = 'swap-horizontal-outline';
          else if (route.name === 'Messages') iconName = 'mail-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="Swaps" component={SwapsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ================== App Entry (Stack Navigator) ==================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        {/* New screen for posting a skill, accessible from the Feed/Home screen */}
        <Stack.Screen
          name="PostSkill"
          component={PostSkillScreen}
          options={{ title: 'Offer a Skill Swap' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ================== Styles (Re-styled) ==================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  scrollContent: { paddingVertical: 16 },

  // --- Auth Styles ---
  authContainer: { flex: 1, backgroundColor: colors.background, padding: 20 },
  authContent: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 350,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.lightText,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 8,
    backgroundColor: colors.cardBackground,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
    elevation: 3,
  },
  buttonText: { color: colors.buttonText, fontWeight: '700', fontSize: 16 },
  link: {
    color: colors.primary,
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  errorText: { color: colors.error, textAlign: 'center', marginBottom: 10 },

  // --- Card/Feed Styles ---
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginVertical: 15,
  },
  searchBar: {
    height: 45,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: colors.cardBackground,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  ratingText: { fontSize: 16, fontWeight: 'bold', color: colors.secondary },
  cardSubtitle: { fontSize: 14, color: colors.lightText, marginBottom: 8 },
  cardTag: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    opacity: 0.7,
  },
  actionButton: { marginTop: 15, borderRadius: 20 },
  actionButtonLabel: { fontWeight: 'bold' },

  // --- Post Skill Styles ---
  textArea: { height: 120, textAlignVertical: 'top', paddingVertical: 15 },

  // --- Profile Styles ---
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.placeholder,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
  },
  profileInfo: { fontSize: 14, color: colors.lightText, marginBottom: 20 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 15,
    marginBottom: 8,
  },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  skillTag: {
    backgroundColor: colors.primary,
    color: colors.buttonText,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    fontWeight: '600',
    overflow: 'hidden',
  },
  skillTagLight: {
    backgroundColor: colors.secondary,
    color: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    fontWeight: '600',
    opacity: 0.8,
  },
  editButton: { marginVertical: 20 },
  logoutButton: { marginTop: 10 },

  // --- FAB (Floating Action Button) ---
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 75, // Adjusting for the Tab Bar height
    backgroundColor: colors.secondary,
    borderRadius: 28,
    elevation: 6,
    zIndex: 10,
  },
});
