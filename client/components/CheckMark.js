import { Pressable, StyleSheet } from "react-native";

export default function CheckMark({ id, completed, toggleTodo }) {
  async function toggle() {
    const response = await fetch(`http://192.168.1.86:8080/todos/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        value: completed ? false : true,
      }),
    });
    const data = await response.json();
    toggleTodo(id);
    console.log(data);
  }
  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.checkMark,
        { backgroundColor: completed === 0 ? "#E9E9EF" : "#86ba90" },
      ]}
    ></Pressable>
  );
}

const styles = StyleSheet.create({
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 7,
  },
});
