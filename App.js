import { useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  function addTask() {
    const title = taskText.trim();
    if (!title) return;

    setTasks((currentTasks) => [
      { id: Date.now().toString(), title, completed: false },
      ...currentTasks,
    ]);
    setTaskText('');
    Keyboard.dismiss();
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f2" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>MY DAY</Text>
          <Text style={styles.title}>Things to do</Text>
          <Text style={styles.subtitle}>
            {remainingTasks} {remainingTasks === 1 ? 'task' : 'tasks'} left
          </Text>
        </View>

        <View style={styles.entryRow}>
          <TextInput
            accessibilityLabel="New task"
            onChangeText={setTaskText}
            onSubmitEditing={addTask}
            placeholder="Add a task..."
            placeholderTextColor="#8b9189"
            returnKeyType="done"
            style={styles.input}
            value={taskText}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add task"
            onPress={addTask}
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(task) => task.id}
          contentContainerStyle={tasks.length === 0 ? styles.emptyList : styles.list}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <View style={styles.taskRow}>
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: item.completed }}
                accessibilityLabel={`Mark ${item.title} ${item.completed ? 'incomplete' : 'complete'}`}
                onPress={() => toggleTask(item.id)}
                style={[styles.checkbox, item.completed && styles.checkboxDone]}
              >
                {item.completed ? <Text style={styles.checkmark}>✓</Text> : null}
              </Pressable>
              <Text style={[styles.taskTitle, item.completed && styles.taskTitleDone]}>
                {item.title}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Delete ${item.title}`}
                onPress={() => deleteTask(item.id)}
                hitSlop={8}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>A clear start</Text>
              <Text style={styles.emptySubtitle}>Add a task above to get going.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f6f2',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 42,
    paddingBottom: 28,
  },
  eyebrow: {
    color: '#53775b',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  title: {
    color: '#202820',
    fontSize: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: '#737b73',
    fontSize: 15,
    marginTop: 7,
  },
  entryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    minHeight: 54,
    backgroundColor: '#ffffff',
    borderColor: '#e1e6df',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#202820',
    fontSize: 16,
  },
  addButton: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#386b46',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '400',
  },
  pressed: {
    opacity: 0.78,
  },
  list: {
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 76,
  },
  emptyTitle: {
    color: '#303a31',
    fontSize: 19,
    fontWeight: '600',
  },
  emptySubtitle: {
    color: '#737b73',
    fontSize: 14,
    marginTop: 8,
  },
  taskRow: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 9,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e8ebe6',
    borderRadius: 8,
  },
  checkbox: {
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#aab4aa',
    borderRadius: 7,
    marginRight: 13,
  },
  checkboxDone: {
    backgroundColor: '#386b46',
    borderColor: '#386b46',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  taskTitle: {
    flex: 1,
    color: '#303a31',
    fontSize: 15,
  },
  taskTitleDone: {
    color: '#8b9189',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    paddingVertical: 8,
    paddingLeft: 10,
  },
  deleteText: {
    color: '#a34d43',
    fontSize: 13,
    fontWeight: '600',
  },
});