function TaskCard({
  task,
  onDelete,
  onEdit,
}) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        <strong>Status:</strong>{" "}
        {task.status}
      </p>

      <p>
        <strong>Priority:</strong>{" "}
        {task.priority}
      </p>

      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No Due Date"}
      </p>

    <div className="task-actions">
      <button
        onClick={() => onEdit(task)}
      >
        Edit
      </button>

  <button
    onClick={() => onDelete(task._id)}
  >
    Delete
  </button>
</div>
    </div>
  );
}

export default TaskCard;