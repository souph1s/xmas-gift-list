// AddTasks.tsx
import { PlusCircle } from "@phosphor-icons/react";
import styles from "./AddTask.module.css";
import { FormEvent, useState } from "react";
import Modal from "../Modal/Modal"; // Create a Modal component

interface AddTaskProps {
  onAddTask: (task: string) => void;
}

export function AddTask({ onAddTask }: AddTaskProps) {
  const [newTaskText, setNewTaskText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();

    if (newTaskText.trim() === "") {
      setError("Please enter a task before adding.");
      return;
    }

    onAddTask(newTaskText);
    setNewTaskText("");
    setError(null);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleCreateNewTask(event);
    }
  };

  const closeModal = () => {
    setError(null);
  };

  return (
    <div className={styles.taskForm}>
      <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
        <textarea
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Write here..."
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.button}>
          <span>Add</span>
          <PlusCircle size={22} className={styles.img} />
        </button>
      </form>
      {error && <Modal message={error} onClose={closeModal} />}
    </div>
  );
}
