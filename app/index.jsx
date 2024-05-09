import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, TextInput } from 'react-native';
import { FIRESTORE_APP } from '../firebaseConfig';
import { addDoc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import ToastManager, { Toast } from 'toastify-react-native'


export default function App() {
  const [text, setText] = useState('');
  const [date, setDate] = useState('')
  const today = new Date();

  const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = dd + '/' + mm + '/' + yyyy;

    let hour = today.getHours();
    const minutes = today.getMinutes();

    if (hour > 12) {
    hour -= 12; // Convert to 12-hour format for PM
    }

    if (hour < 10) hour = '0' + hour;

    const formattedTime = hour + ':' + minutes;



    const addToDb = async () => {
        if(text == ''){
            Toast.error('Cannot be empty.')
            return 
        }

        try{
            const doc = await addDoc(collection(FIRESTORE_APP, 'user_time'), {
                time: `${formattedTime}`,
                date: `${formattedDate}`,
                input: text
            })
            Toast.success('Posted!', position='top')
        } catch (error) {
            Toast.error('Error in puploading.')
        }
        setText('')
    }

    const handleChangeText = (newText) => {
        setText(newText);
      };

  return (
    <View className="flex-1 justify-center items-center bg-white">
        <ToastManager className='rounded-lg' height='40' textStyle={{ fontSize: 14 }} />
      <Text className="text-2xl m-2" >Time Tracker</Text>
      <TextInput
        value={text}
        onChangeText={handleChangeText}
        placeholder="Enter your text here"
        className="my-2 p-2 rounded bg-gray-100 w-1/2  text-black focus:bg-white focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
      <TouchableOpacity className="bg-blue-500 text-white py-2 px-6 my-2 rounded-lg" title='Add Item' onPress={addToDb}>
        <Text className="text-white">Update</Text> 
    </TouchableOpacity>
    </View>
  );
}


