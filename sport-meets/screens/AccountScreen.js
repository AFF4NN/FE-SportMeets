import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { UserContext } from '../UserContext';
import { useContext } from 'react';

export default function AccountScreen({ navigation }) {
  const {user} = useContext(UserContext)
  if (user.username) {
      return navigation.navigate('UserProfile')
  }else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    )
  } 
}  





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    marginBottom: 200,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});


