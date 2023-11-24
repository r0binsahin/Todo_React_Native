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
import { TaskHolder } from "./components/TaskHolder";
import { useEffect, useState } from "react";
import { ITask } from "./models/ITask";
import { addTask, deleteTask, editTask, getTasks } from "./services/crud";
import { AlreadyExistingTask } from "./components/AlreadyExistingTask";
import { NoTaskToDisplay } from "./components/NoTaskToDisplay";
import Modal from "react-native-modal";

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

  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<ITask>({
    title: "",
    isDone: false,
  });
  const [valueToEdit, setValueToEdit] = useState("");

  const editingCompleted = () => {
    const updatedTasks = tasks.map((task) =>
      task === currentTask ? { ...task, title: valueToEdit } : task
    );
    setTasks(updatedTasks);
    editTask({ ...currentTask, title: valueToEdit });

    setIsEditing(false);
    setValueToEdit("");
    console.log(valueToEdit);
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={isEditing}>
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={valueToEdit}
            onChangeText={(valueToEdit) => setValueToEdit(valueToEdit)}
          />
          <TouchableOpacity onPress={() => editingCompleted()}>
            <View style={styles.doneBtn}>
              <Text>Done</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

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
                setIsEditing={setIsEditing}
                setCurrentTask={setCurrentTask}
                setValueToEdit={setValueToEdit}
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
  editContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    Width: "80%",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  editInput: {
    width: "70%",
    fontSize: 18,
  },

  doneBtn: {
    backgroundColor: "#57CC99",
    padding: 10,
    borderRadius: 8,
  },
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
