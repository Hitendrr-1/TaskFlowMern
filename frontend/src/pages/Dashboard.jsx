import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

const [editId, setEditId] = useState(null);

  const [taskData, setTaskData] =
    useState({
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      dueDate: "",
    });

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchTasks = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(
        error.response?.data
      );
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        "/tasks",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Task Created Successfully"
      );

      setTaskData({
        title: "",
        description: "",
        status: "Todo",
        priority: "Medium",
        dueDate: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(
        error.response?.data
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await API.delete(
        `/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Task Deleted Successfully"
      );

      fetchTasks();
    } catch (error) {
      console.log(
        error.response?.data
      );
    }
  };

 const editTask = (task) => {
  setEditId(task._id);

  setTaskData({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "Todo",
    priority: task.priority || "Medium",
    dueDate: task.dueDate
      ? task.dueDate.split("T")[0]
      : "",
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const updateTask = async (e) => {
  e.preventDefault();

  try {
    const token =
      localStorage.getItem("token");

    await API.put(
      `/tasks/${editId}`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Task Updated Successfully");

    setEditId(null);

    setTaskData({
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      dueDate: "",
    });

    fetchTasks();
  } catch (error) {
    console.log(
      error.response?.data
    );
  }
};

  const filteredTasks =
    tasks.filter((task) =>
      task.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  const todoTasks = tasks.filter(
    (task) =>
      task.status === "Todo"
  ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    ).length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Dashboard</h1>

        <div className="stats">
          <div className="stat-card">
            <h2>{tasks.length}</h2>
            <p>Total</p>
          </div>

          <div className="stat-card">
            <h2>{todoTasks}</h2>
            <p>Todo</p>
          </div>

          <div className="stat-card">
            <h2>{inProgressTasks}</h2>
            <p>In Progress</p>
          </div>

          <div className="stat-card">
            <h2>{completedTasks}</h2>
            <p>Completed</p>
          </div>
        </div>

          <h3>
            {editId
            ? "Edit Task"
            : "Create New Task"}
          </h3>
       <form
                onSubmit={
                  editId
                    ? updateTask
                    : createTask
                }
              >
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title || ""}
              onChange={handleChange}
              required
            />

          <br />
          <br />

          <textarea
            name="description"
            placeholder="Task Description"
            value={taskData.description}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <label>Status</label>

          <br />

          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
          >
            <option value="Todo">
              Todo
            </option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Completed">
              Completed
            </option>
          </select>

          <br />
          <br />

          <label>Priority</label>

          <br />

          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
          >
            <option value="Low">
              Low
            </option>
            <option value="Medium">
              Medium
            </option>
            <option value="High">
              High
            </option>
          </select>

          <br />
          <br />

         <label>Due Date</label>

         <br/>

          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate || ""}
            onChange={handleChange}
          />

          <br />
          <br />

          <div className="form-buttons">
          <button type="submit">
            {editId
              ? "Update Task"
              : "Create Task"}
          </button>

  {editId && (
    <button
      type="button"
      className="cancel-btn"
      onClick={() => {
        setEditId(null);

        setTaskData({
          title: "",
          description: "",
          status: "Todo",
          priority: "Medium",
          dueDate: "",
        });
      }}
    >
      Cancel Edit
    </button>
  )}
</div>
        </form>

        <hr />

        <input
          className="search-box"
          type="text"
          placeholder="Search Task..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <h3>
          Total Tasks: {tasks.length}
        </h3>

        <p>
          Showing{" "}
          {filteredTasks.length} of{" "}
          {tasks.length} tasks
        </p>

        {filteredTasks.length ===
        0 ? (
          <div className="empty-state">
            <h2>
              📋 No Tasks Yet
            </h2>
            <p>
              Create your first
              task.
            </p>
          </div>
        ) : (
          filteredTasks.map(
            (task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            )
          )
        )}
      </div>
    </>
  );
}

export default Dashboard;