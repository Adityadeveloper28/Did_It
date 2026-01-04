import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'

const AddActionScreen = ({ route,navigation }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addAction } = route.params;

  const handleSave = () => {
    if(!title.trim()) {
      return;
    }
    console.log("Saving Action:", { title, description });
    addAction({ title, description });
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>AddActionScreen</Text> */}
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter action title"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input,styles.TextArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter action description"
        multiline
      />
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Action</Text>
      </Pressable>
      
    </View>
  )
}

export default AddActionScreen

const styles= StyleSheet.create({
  container: {  
    flex: 1,
    padding:16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label:{
    fontSize:14,
    fontWeight:'600',
    marginBottom:6,
    marginTop:12,
  },
  input:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:4,
    padding:8,
    fontSize:16,
  },
  TextArea:{
    height:100,
    textAlignVertical:'top',
  },
  button:{
    marginTop:24,
    backgroundColor:"#2563eb",
    paddingVertical:14,
    borderRadius:8,
    alignItems:'center',
  },
  buttonText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'600',
  }
})