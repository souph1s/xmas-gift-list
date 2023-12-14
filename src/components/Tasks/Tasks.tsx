import {
  Circle,
  CheckCircle,
  Trash,
  ClipboardText,
} from "@phosphor-icons/react";
import styles from "./Tasks.module.css";
import { useState, useEffect } from "react";

interface TasksProps {
  taskItems: string[];
}

export function Tasks({ taskItems }: TasksProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [totalCreatedTasks, setTotalCreatedTasks] = useState<number>(0);
  const [deletedTasks, setDeletedTasks] = useState<string[]>([]);

  useEffect(() => {
    setTotalCreatedTasks(taskItems.length);
  }, [taskItems]);

  const handleTaskToggle = (clickedTask: string) => {
    const isTaskCompleted = completedTasks.includes(clickedTask);

    if (isTaskCompleted) {
      setCompletedTasks((prevCompletedTasks) =>
        prevCompletedTasks.filter((task) => task !== clickedTask)
      );
    } else {
      setCompletedTasks((prevCompletedTasks) => [
        ...prevCompletedTasks,
        clickedTask,
      ]);
    }
  };

  const handleDeleteTask = (deletedTask: string) => {
    setDeletedTasks((prevDeletedTasks) => [...prevDeletedTasks, deletedTask]);

    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.filter((task) => task !== deletedTask)
    );

    setTotalCreatedTasks(totalCreatedTasks - 1);
  };

  const rearrangeTasks = () => {
    const tasksNotCompleted = taskItems.filter(
      (task) => !completedTasks.includes(task) && !deletedTasks.includes(task)
    );
    const rearrangedTasks = [...tasksNotCompleted, ...completedTasks];
    return rearrangedTasks;
  };

  return (
    <>
      <div className={styles.centeredContainer}>
        <div className={styles.taskHeader}>
          <p className={styles.taskCreated}>
            Listed gifts
            <span className={styles.counter}>{totalCreatedTasks}</span>
          </p>
          <p className={styles.taskCompleted}>
            Received from Santa Claus
            <span className={styles.counter}>
              {completedTasks.length} of {totalCreatedTasks}
            </span>
          </p>
        </div>
      </div>

      {taskItems.length > 0 || completedTasks.length > 0 ? (
        <div className={styles.centeredTasks}>
          <div className={styles.taskList}>
            {rearrangeTasks().map((task, index) => (
              <p
                key={index}
                className={`${styles.tasksAdded} ${
                  completedTasks.includes(task) ? styles.completedTask : ""
                }`}
              >
                <button
                  className={styles.checkButton}
                  onClick={() => handleTaskToggle(task)}
                >
                  {completedTasks.includes(task) ? (
                    <CheckCircle size={32} color="#fff" weight="fill" />
                  ) : (
                    <Circle size={24} color="#fff" />
                  )}
                </button>
                {task}
                <button
                  className={styles.trashButton}
                  onClick={() => handleDeleteTask(task)}
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
