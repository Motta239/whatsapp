import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput, Image } from 'react-native';

export default function Communities() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.text}>Communities Screen</Text>
        <TextInput style={styles.input} placeholder="Search Communities" />
        <Button title="Join Community" onPress={() => {}} />
        <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/150' }} />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Community 1</Text>
          <Text style={styles.cardDescription}>Description of Community 1</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Community 2</Text>
          <Text style={styles.cardDescription}>Description of Community 2</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Community 3</Text>
          <Text style={styles.cardDescription}>Description of Community 3</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});
