import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fecthData();
  }, [])

  async function fecthData() {
    const response = await fetch("http://192.168.1.86:8080/todos/1")
    const data = await response.json();
    setTodos(data);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
        data = {todos}
        keyExtractor={(todo) => todo.id}
        renderItem={({item}) => <Task {...item}/>}
        ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
        contentContainerStyle={styles.contentContainerStyle}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbf2',
  },
  contentContainerStyle: {
    padding: 15
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15
  },
});
