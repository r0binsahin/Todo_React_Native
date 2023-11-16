import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TaskHolder } from "./components/Task";
import { useEffect, useState } from "react";
import { ITask } from "./models/ITask";
import { addTask, deleteTask, editTask, getTasks } from "./services/crud";
import { AlreadyExistingTask } from "./components/AlreadyExistingTask";
import { NoTaskToDisplay } from "./components/NoTaskToDisplay";

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [existingTask, setExistingTask] = useState(false);

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  const handleAddTask = async () => {
    Keyboard.dismiss();

    const taskAlreadyExists = tasks.some((task) => {
      return task.title === inputValue && task.isDone === false;
    });

    const newtask: ITask = {
      title: inputValue,
      isDone: false,
    };

    if (taskAlreadyExists) {
      setExistingTask(true);
      return;
    }

    if (inputValue === "") {
      setExistingTask(false);
      console.warn("you need to write a task first");
    } else {
      setTasks((tasks) => [...tasks, newtask]);
      addTask(newtask);
      getTasks(setTasks);

      console.log(tasks);
      setInputValue("");
      setExistingTask(false);
    }
  };

  const removeTask = (task: ITask) => {
    deleteTask(task);
    getTasks(setTasks);
    setExistingTask(false);
  };

  const completeTask = (completedTask: ITask) => {
    completedTask.isDone = !completedTask.isDone;
    editTask(completedTask);
    getTasks(setTasks);
    setExistingTask(false);
  };

  return (
    <View style={styles.container}>
      {/* Todays tasks */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}> Today's tasks</Text>

        {tasks.length === 0 ? (
          <NoTaskToDisplay />
        ) : (
          <View style={styles.items}>
            {tasks.map((task: ITask, index: number) => (
              <TaskHolder
                key={index}
                handleDelete={() => removeTask(task)}
                completeTask={() => completeTask(task)}
                task={task}
                taskTitle={task.title}
              />
            ))}
          </View>
        )}
      </View>
      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <View style={styles.inputContainer}>
          {existingTask ? <AlreadyExistingTask /> : null}
          <View style={styles.inputAndBtn}>
            <TextInput
              style={styles.input}
              placeholder="write a task"
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
            />
            <TouchableOpacity onPress={() => handleAddTask()}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9B9C3",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#69306D",
  },
  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputAndBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 300,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginRight: 10,

    fontSize: 18,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 12,
  },
});
