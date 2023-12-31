import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ITask } from "../models/ITask";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Foundation,
} from "@expo/vector-icons";

interface ITaskHolderProps {
  taskTitle: string;
  task: ITask;
  handleDelete: (task: ITask) => void;
  completeTask: (task: ITask) => void;
  setCurrentTask: (task: ITask) => void;
  setIsEditing: (value: boolean) => void;
  setValueToEdit: (value: string) => void;
}

export const TaskHolder = ({
  taskTitle,
  task,
  handleDelete,
  completeTask,
  setCurrentTask,
  setIsEditing,
  setValueToEdit,
}: ITaskHolderProps) => {
  const handleEditing = () => {
    setValueToEdit(task.title);
    setCurrentTask(task);
    setIsEditing(true);
  };

  return (
    <View style={{ ...styles.items, opacity: task.isDone ? 0.5 : 1 }}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={() => completeTask(task)}>
          <View style={styles.checkBox}>
            <View style={styles.innerBox}>
              {task.isDone && (
                <FontAwesome5 name="check" size={15} color="#06D6A0" />
              )}
            </View>
          </View>
        </TouchableOpacity>

        <Text
          style={{
            ...styles.itemText,
            textDecorationLine: task.isDone ? "line-through" : "none",
          }}
        >
          {taskTitle}
        </Text>
      </View>

      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => handleDelete(task)}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={28}
            color="#FF66B3"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditing}>
          <Foundation name="page-edit" size={26} color="#FF66B3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  itemText: {
    maxWidth: "80%",
    fontSize: 18,
  },

  checkBox: {
    width: 24,
    height: 24,
    backgroundColor: "#FF66B3",
    borderRadius: 5,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  innerBox: {
    width: 18,
    height: 18,
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  iconWrapper: {
    width: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
