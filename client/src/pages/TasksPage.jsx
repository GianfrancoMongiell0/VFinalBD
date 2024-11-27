import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { Link } from "react-router-dom";
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Tus Tareas</h1>
      </header>

      {/* Sin Tareas */}
      {tasks.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-20">
          <ImFileEmpty className="text-9xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            No tienes tareas aún. ¡Crea tu primera tarea ahora!
          </h2>
          <Link
            to="/add-task"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Crear Tarea
          </Link>
        </div>
      )}

      {/* Lista de Tareas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  );
}