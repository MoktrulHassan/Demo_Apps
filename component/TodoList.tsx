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

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  function addTask(): void {
    const title = taskText.trim();
    if (!title) return;

    setTasks((currentTasks) => [
      { id: Date.now().toString(), title, completed: false },
      ...currentTasks,
    ]);
    setTaskText('');
    Keyboard.dismiss();
  }

  function toggleTask(taskId: string): void {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId: string): void {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>My TodoList</Text>
          <Text style={styles.subtitle}>Keep your daily tasks listed.</Text>
        </View>

        <View style={styles.entryRow}>
          <TextInput
            accessibilityLabel="New task"
            onChangeText={setTaskText}
            onSubmitEditing={addTask}
            placeholder="Add new task..."
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
            <Text style={styles.addButtonText}>Add</Text>
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
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 54,
    paddingBottom: 30,
  },
  title: {
    color: '#10b981',
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: '#737b73',
    fontSize: 15,
    marginTop: 6,
  },
  entryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },
  input: {
    flex: 1,
    minHeight: 56,
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 18,
    color: '#202820',
    fontSize: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  addButton: {
    minWidth: 80,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#10b981',
    paddingHorizontal: 18,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
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
    borderRadius: 12,
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
    backgroundColor: '#10b981',
    borderColor: '#10b981',
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
