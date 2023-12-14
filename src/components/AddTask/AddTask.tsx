import { PlusCircle } from "@phosphor-icons/react";
import styles from "./AddTask.module.css";
import { FormEvent, useState } from "react";

export function AddTask({ onAddTask }: { onAddTask: (task: string) => void }) {
  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    onAddTask(newTaskText);
    setNewTaskText("");
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleCreateNewTask(event as FormEvent);
    }
  }

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
    </div>
  );
}
