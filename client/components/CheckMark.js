import { Pressable, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

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
      style={completed === 1 ? styles.checked : styles.unChecked}
    >
      {completed === 1 && <Entypo name="check" size={15} color="#FAFAFA" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checked: {
    width: 20,
    height: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
    marginLeft: 15,
    backgroundColor: "#86ba90",
  },
  unChecked: {
    width: 20,
    height: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
    marginLeft: 15,
    backgroundColor: "#E9E9EF",
  },
});
