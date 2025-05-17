import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import TaskItem from "./taskitem";
import { useCoins } from "../components/coinsContext";
import { useFocusEffect } from '@react-navigation/native';



interface Task {
  id: string;
  text: string;
  date: string;
  completed: boolean;
}

const ToDoScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { coins, addCoins, updateCoins } = useCoins(); // 👈 use context
  const [loading, setLoading] = useState<boolean>(true);
  
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
  
      const loadCoinsOnFocus = async () => {
        setLoading(true);
        await updateCoins();
        if (isActive) setLoading(false);
      };
  
      loadCoinsOnFocus();
  
      return () => {
        isActive = false; // Prevent setting state on unmounted screen
      };
    }, [])
  );

  const saveCoins = async (uid: string, newCoinAmount: number) => {
    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, { coins: newCoinAmount }, { merge: true });
    } catch (error) {
      console.error("Error saving coins:", error);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: newTask, date: date.toLocaleDateString(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const updatedTasks = tasks.map(task => {
      if (task.id === id && !task.completed) {
        const newCoinAmount = coins + 10;
        addCoins(10);
        saveCoins(user.uid, newCoinAmount);
        return { ...task, completed: true };
      } else if (task.id === id && task.completed) {
        return task;
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const editTask = (id: string) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setNewTask(taskToEdit.text);
      setDate(new Date(taskToEdit.date));
      deleteTask(id);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F3CA52" />
      </View>
    );
  }

  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.header}>To-Do</Text>
        <Text style={styles.coinText}>Coins: {coins}</Text>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem task={item} onEdit={editTask} onDelete={deleteTask} onToggle={toggleTask} />
          )}
          keyExtractor={(item) => item.id}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>Pick a Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  coinText: {
    fontSize: 20,
    color: "gold",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: "#F3CA52",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  dateButtonText: {
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#F3CA52",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    fontWeight: "bold",
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default ToDoScreen;
