import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Task from "./components/Task";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InputTask from "./components/InputTask";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fecthTodos();
  }, []);

  async function fecthTodos() {
    const response = await fetch("http://192.168.1.86:8080/todos/1");
    const data = await response.json();
    setTodos(data);
  }

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id == id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }

  return (
    <GestureHandlerRootView flex={1}>
      <BottomSheetModalProvider>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <FlatList
            data={todos}
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={(todo) => todo.id}
            renderItem={({ item }) => (
              <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo} />
            )}
            ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
          />
          <InputTask todos={todos} setTodos={setTodos} />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fbf2",
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
});
