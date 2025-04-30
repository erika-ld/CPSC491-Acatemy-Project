import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface TaskItemProps {
  task: { id: string; text: string; date: string; completed: boolean };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <View style={styles.taskContainer}>
        {/* Checkbox /}
      <TouchableOpacity onPress={() => onToggle(task.id)}>
        <Icon name={task.completed ? "check-square" : "square-o"} size={20} color="white" />
      </TouchableOpacity>

      {/ Task Text /}
      <Text style={[styles.taskText, task.completed && styles.completedTask]}>
        {task.text}
      </Text>

      {/ Date /}
      <Text style={styles.dateText}>{task.date}</Text>

      {/ Edit Button /}
      <TouchableOpacity onPress={() => onEdit(task.id)}>
        <Icon name="pencil" size={18} color="white" />
      </TouchableOpacity>

      {/ Delete Button */}
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Icon name="trash" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#69306D",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    width: "100%",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  taskText: {
    color: "white",
    flex: 1,
    fontSize: 16,
    marginLeft: 20
  },
  dateText: {
    color: "white",
    marginRight: 10,
    padding: 10,
    fontSize: 14,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },
});

export default TaskItem; 