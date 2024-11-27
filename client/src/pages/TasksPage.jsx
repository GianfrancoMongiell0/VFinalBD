import { useEffect, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { Link } from "react-router-dom";
import { ImFileEmpty } from "react-icons/im";
import { FaFilter } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import dayjs from "dayjs";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    date: "",
    orderByCreation: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Estado para mostrar/ocultar el filtro

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tasks, filters]);

  const applyFilters = () => {
    let result = tasks;

    // Filtro por nombre
    if (filters.search) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro por fecha
    if (filters.date) {
      result = result.filter(
        (task) =>
          dayjs(task.date).format("YYYY-MM-DD") === filters.date // Compara usando el formato del input[type="date"]
      );
    }

    // Ordenar por fecha de creación
    if (filters.orderByCreation) {
      result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredTasks(result);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen); // Cambia el estado del filtro
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Tus Tareas</h1>
        <div className="flex gap-4">
          <button
            onClick={toggleFilter}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
          >
            <FaFilter /> Filtros
          </button>
          <Link
            to="/add-task"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
          >
            <IoAddCircleOutline size={20} /> Nueva Tarea
          </Link>
        </div>
      </header>

      {/* Filtros Desplegables */}
      {isFilterOpen && (
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div>
              <label className="block font-bold mb-2" htmlFor="search">
                Buscar por nombre
              </label>
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Escribe el nombre de la tarea"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>

            <div>
              <label className="block font-bold mb-2" htmlFor="date">
                Filtrar por fecha
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.date}
                onChange={handleFilterChange}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="orderByCreation"
                name="orderByCreation"
                className="w-5 h-5 text-indigo-500 focus:ring-indigo-400"
                checked={filters.orderByCreation}
                onChange={handleFilterChange}
              />
              <label htmlFor="orderByCreation" className="font-bold">
                Ordenar por creación
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Sin Tareas */}
      {filteredTasks.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-20">
          <ImFileEmpty className="text-9xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            No se encontraron tareas con los filtros aplicados.
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
        {filteredTasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  );
}