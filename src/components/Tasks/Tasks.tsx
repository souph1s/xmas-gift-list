// Tasks.tsx
import {
  Circle,
  CheckCircle,
  Trash,
  ClipboardText,
} from "@phosphor-icons/react";
import styles from "./Tasks.module.css";
import { useState, useEffect } from "react";

interface Task {
  name: string;
  completed: boolean;
  deleted: boolean;
}

interface TasksProps {
  taskItems: string[];
}

export function Tasks({ taskItems }: TasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTaskCount, setCompletedTaskCount] = useState<number>(0);

  useEffect(() => {
    const newTasks = taskItems.map((task) => ({
      name: task,
      completed: false,
      deleted: false,
    }));
    setTasks(newTasks);
  }, [taskItems]);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => !task.deleted);
    const completedTasksCount = filteredTasks.filter(
      (task) => task.completed
    ).length;
    setCompletedTaskCount(completedTasksCount);
  }, [tasks]);

  const handleTaskToggle = (clickedTask: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.name === clickedTask && !task.deleted
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDeleteTask = (deletedTask: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.name === deletedTask ? { ...task, deleted: true } : task
      )
    );
  };

  const rearrangeTasks = () => {
    return tasks.filter((task) => !task.deleted);
  };

  return (
    <>
      <div className={styles.centeredContainer}>
        <div className={styles.taskHeader}>
          <p className={styles.taskCreated}>
            Gifts to receive:
            <span className={styles.counter}>{rearrangeTasks().length}</span>
          </p>
          <p className={styles.taskCompleted}>
            Received from Santa Claus:
            <span className={styles.counter}>
              {completedTaskCount} of {rearrangeTasks().length}
            </span>
          </p>
        </div>
      </div>

      {rearrangeTasks().length > 0 || completedTaskCount > 0 ? (
        <div className={styles.centeredTasks}>
          <div className={styles.taskList}>
            {rearrangeTasks().map((task, index) => (
              <p
                key={index}
                className={`${styles.tasksAdded} ${
                  task.completed ? styles.completedTask : ""
                }`}
              >
                <button
                  className={styles.checkButton}
                  onClick={() => handleTaskToggle(task.name)}
                >
                  {task.completed ? (
                    <CheckCircle size={32} color="#fff" weight="fill" />
                  ) : (
                    <Circle size={24} color="#fff" />
                  )}
                </button>
                {task.name}
                <button
                  className={styles.trashButton}
                  onClick={() => handleDeleteTask(task.name)}
                >
                  <Trash size={18} color="#fff" />
                </button>
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.centeredNoTasks}>
          <div className={styles.clipboardContainer}>
            <ClipboardText size={68} color="#8a8a8a" weight="fill" />
          </div>
          <p className={styles.noTask}>
            You don't have any registered gift yet!
          </p>
          <p className={styles.noTaskThin}>Go check your wishlist.</p>
        </div>
      )}
    </>
  );
}
