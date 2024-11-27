import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white flex flex-col items-center">
      
      {/* Hero Section */}
      <header className="w-full py-20 text-center">
        <h1 className="text-6xl font-extrabold tracking-wide mb-4">
          ¡Bienvenido a <span className="text-yellow-300">Task Manager</span>!
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed">
          Tu gestor personal de tareas. Organiza tus pendientes, aumenta tu
          productividad y mantente al tanto de tus metas, ya sea para el trabajo
          o tu vida personal.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-110"
            to="/register"
          >
            Comienza Ahora
          </Link>
          <Link
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-110"
            to="/tasks"
          >
            Ver Tareas
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white text-gray-800 w-full">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">¿Por qué usar React Tasks?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-blue-600">Organización</h3>
              <p className="mt-4 text-gray-700">
                Mantén todas tus tareas organizadas en un solo lugar. No pierdas
                el rastro de tus pendientes y prioriza lo que es importante.
              </p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-purple-600">Facilidad</h3>
              <p className="mt-4 text-gray-700">
                Una interfaz intuitiva que te permite agregar, editar y eliminar
                tareas rápidamente. Es simple y eficiente.
              </p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-pink-600">Productividad</h3>
              <p className="mt-4 text-gray-700">
                Incrementa tu productividad alcanzando tus metas a tiempo con un
                gestor de tareas diseñado para ti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-teal-500 text-white w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">¡Comienza Ahora!</h2>
          <p className="text-lg mb-8">
            Crea tu cuenta gratuita y comienza a gestionar tus tareas con
            React Tasks. La herramienta que necesitas para alcanzar tus metas.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-110"
              to="/register"
            >
              Crear Cuenta
            </Link>
            <Link
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-110"
              to="/login"
            >
              Inicia Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2024 React Tasks. Todos los derechos reservados.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link className="hover:text-white" to="/about">
              Sobre Nosotros
            </Link>
            <Link className="hover:text-white" to="/contact">
              Contacto
            </Link>
            <Link className="hover:text-white" to="/help">
              Ayuda
            </Link>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default HomePage;