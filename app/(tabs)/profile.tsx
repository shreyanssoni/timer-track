import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import db from '../../firebaseConfig'; // Assuming Firebase integration for persistence (optional)



export default function ReminderScreen() {
  const [inputValue, setInputValue] = useState('');
  const [expoPushToken, setExpoPushToken] = useState(null); // State to store Expo push token
  
  async function createNewTimeUserDoc(db, data) {
    try {
      const timeUserCollectionRef = collection(db, "time_user");
      const newDocRef = await addDoc(timeUserCollectionRef, data);
      console.log("Document written with ID:", newDocRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Failed to get notification permissions!');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token); // Store the retrieved token
    };

    requestPermissions(); // Call the function to request permissions
  }, []);

  const handleUpdate = async () => {
    const data = {
      input: inputValue,
      time: Date.now() 
    }
    try {
      createNewTimeUserDoc(db, data)
      alert('Reminder message sent!');
    } catch (error) {
      console.error('Error sending reminder:', error);
      alert('Failed to send reminder message.');
    }
  };

  const scheduleNotification = async () => {
    if (!expoPushToken) {
      console.warn('Expo push token not available. Requesting permissions...');
      // You can potentially request permissions again here if needed
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: "Input the details.",
      },
      trigger: {
        seconds: 10, // Adjust the notification delay as needed
        repeats: true,
      },
    });
  };

  return (
    <View style={{ padding: 20, maxHeight: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, padding: 10, borderColor: 'gray', width: 300, borderWidth: 1, borderRadius: 10, marginBottom: 10 }}
        onChangeText={text => setInputValue(text)}
        value={inputValue}
        placeholder="Type your reminder here..."
      />
      <Button title="Update" onPress={handleUpdate} />
      <Button title="Schedule Reminder" onPress={scheduleNotification} />
    </View>
  );
}
