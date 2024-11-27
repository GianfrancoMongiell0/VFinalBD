import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg py-4 px-6 rounded-lg flex justify-between items-center">
      {/* Título del Navbar */}
      <h1 className="text-3xl font-bold text-center flex-grow">
        <Link to={isAuthenticated ? "/tasks" : "/"} className="hover:text-yellow-400 transition">
          Task Manager
        </Link>
      </h1>

      {/* Menú dinámico */}
      <ul className="flex gap-x-4 items-center">
        {isAuthenticated ? (
          <>
            {/* Si está autenticado */}
            <li className="text-lg font-medium">Hola, {user.username} 👋</li>
            
            {location.pathname !== "/tasks" && (
              <li>
                {/* Botón "Add Task" solo si no está en la vista de tareas */}
                <ButtonLink to="/add-task" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium transition-transform transform hover:scale-105">
                  Nueva Tarea
                </ButtonLink>
              </li>
            )}

            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="text-red-400 hover:text-red-500 font-medium transition"
              >
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* Si no está autenticado */}
            {/* <li>
              <ButtonLink to="/login" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition-transform transform hover:scale-105">
                Iniciar Sesión
              </ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium transition-transform transform hover:scale-105">
                Registrarse
              </ButtonLink>
            </li> */}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;