import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { postUser } from '../api';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatarURL, setAvatarURL] = useState('');

  const {setUser} =  useContext(UserContext)
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const avatars = [
    { id: 1, uri: 'https://upload.wikimedia.org/wikipedia/en/c/c5/ImmortanJoeMadMax.jpeg' },
    { id: 2, uri: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2019/06/Rictus-Erectus-from-Mad-Max-Fury-Road.jpg' },
    { id: 3, uri: 'https://upload.wikimedia.org/wikipedia/en/0/02/Stewie_Griffin.png' },
    { id: 4, uri: 'https://www.shareicon.net/data/2016/06/30/788952_people_512x512.png' },
    { id: 5, uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH5x9yOZg5OmuSSvncz8R9BXvi9sZ0rhtlgw&s' },
  ];

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar.id)
    setAvatarURL(avatar.uri)
  };

  const handleSetName = (localname) => {
    setName(localname)
  }

  const handleSetUsername = (localusername) => {
    setUsername(localusername)
  }

  const handleSetPassword = (localpassword) => {
    setPassword(localpassword)
  }
  const handleRegister = () => {


    newUser = {
      "avatar_url": avatarURL,
      "name": name,
      "password": password,
      "username": username
    }

    postUser(newUser).then(() => {
      setUser(newUser)
      navigation.navigate('Account')
    })
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={handleSetName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={handleSetUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={handleSetPassword}
        secureTextEntry
      />
      <Text style={styles.avatartitle}>Choose an Avatar</Text>

<View style={styles.avatarContainer}>
        {avatars.map((avatar) => (
          <TouchableOpacity key={avatar.id} onPress={() => handleAvatarSelect(avatar)}>
            <Image
              source={{ uri: avatar.uri }}
              style={[
                styles.avatar,
                selectedAvatar === avatar.id && styles.selectedAvatar,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      {selectedAvatar ? (
        <Text style={styles.selectedText}>
          Selected Avatar: {selectedAvatar}
        </Text>
      ) : <Text style={styles.selectedText}></Text>}

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  avatartitle: {
    fontSize: 24,
    marginTop: "100px",
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: "100px"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedAvatar: {
    borderColor: '#fff',
  },
  selectedText: {
    marginBottom: "100px",
    marginLeft: "35%",
    fontSize: 18,
    color: 'black',
  },
});


