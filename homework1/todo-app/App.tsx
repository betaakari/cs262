import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";

type Todo = {
  id: string;
  title: string;
  done: boolean;
  editing?: boolean;
};

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // Create
  const addTodo = () => {
    const t = task.trim();
    if (!t) return;
    const newItem: Todo = { id: Date.now().toString(), title: t, done: false };
    setTodos([newItem, ...todos]);
    setTask("");
  };

  // Check/uncheck
  const toggleTodo = (id: string) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  // Start editing
  const beginEdit = (id: string) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, editing: true } : t)));

  // Save edit
  const saveEdit = (id: string, newTitle: string) =>
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, title: newTitle.trim() || t.title, editing: false } : t
      )
    );

  // Delete
  const deleteTodo = (id: string) =>
    setTodos(prev => prev.filter(t => t.id !== id));

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.row}>
      {/* checkbox */}
      <Pressable onPress={() => toggleTodo(item.id)} style={[styles.check, item.done && styles.checked]} />

      {/* title OR editor */}
      {item.editing ? (
        <TextInput
          style={[styles.titleInput]}
          defaultValue={item.title}
          onSubmitEditing={e => saveEdit(item.id, e.nativeEvent.text)}
          onBlur={e => saveEdit(item.id, e.nativeEvent.text)}
          autoFocus
        />
      ) : (
        <Pressable
          style={{ flex: 1 }}
          onLongPress={() => beginEdit(item.id)}     // long-press to edit
        >
          <Text style={[styles.title, item.done && styles.done]}>{item.title}</Text>
        </Pressable>
      )}

      {/* delete */}
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My To-Do List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={task}
          onChangeText={setTask}
          returnKeyType="done"
          onSubmitEditing={addTodo}
        />
        <Button title="Add Task" onPress={addTodo} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0", padding: 20, paddingTop: 80 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  inputRow: { flexDirection: "row", gap: 8, marginBottom: 12, alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, backgroundColor: "#fff" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#eee",
    borderWidth: 1,
  },

  check: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: "#777" },
  checked: { backgroundColor: "#4caf50", borderColor: "#4caf50" },

  title: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#8a8a8a" },

  titleInput: {
    flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, paddingHorizontal: 10, backgroundColor: "#fff",
  },

  delete: { fontSize: 18, color: "red", paddingHorizontal: 6 },
});
