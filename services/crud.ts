import { ITask } from "../models/ITask";
import axios from "axios";

const serviceUrl = "http://localhost:3000/tasks";

export const addTask = async (task: ITask) => {
  try {

    const response = await axios.post(serviceUrl, task);
    console.log(response.data);
  } catch (error) {
    console.error("Could not add task", error);
    throw error;
  }
};

const sortTasks = (tasks: ITask[]) => {
  tasks.sort((a, b) => {
    if (a.isDone && !b.isDone) {
      return 1;
    } else if (!a.isDone && b.isDone) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getTasks = async (setTasks: (tasks: ITask[]) => void) => {
  try {
    const response = await axios.get(serviceUrl);
    const sortedTasks = [...response.data];
    sortTasks(sortedTasks);
    setTasks(sortedTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const deleteTask = async (task: ITask) => {
  try {
    const response = await axios.delete(serviceUrl + "/" + task.id);
    console.log("deleted object:", response.data);
  } catch (error) {
    console.error("Could not delete task", error);
    throw error;
  }
};

export const editTask = async (task: ITask) => {
  try {
    const response = await axios.put(serviceUrl + "/" + task.id, task);
    console.log("updated object:", response.data);
  } catch (error) {
    console.error("Could not update task", error);
    throw error;
  }
};
