import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask, tasks } = useTasks(); // Obtén las tareas existentes
  const navigate = useNavigate();
  const params = useParams();
  const [titleError, setTitleError] = useState(""); // Estado para errores de título
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Verifica si ya existe una tarea con el mismo nombre
      const isDuplicate = tasks.some(
        (task) =>
          task.title.toLowerCase() === data.title.toLowerCase() &&
          task._id !== params.id
      );

      if (isDuplicate) {
        setTitleError("Ya existe una tarea con este título. Elige un nombre diferente.");
        return; // Evita enviar el formulario
      }

      setTitleError(""); // Limpia el error si no hay duplicados

      if (params.id) {
        // Actualiza la tarea existente
        await updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        // Crea una nueva tarea
        await createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/tasks"); // Redirige al menú de tareas después de guardar
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, [params.id, getTask, setValue]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center p-10">
      <Card className="w-full max-w-xl bg-white text-gray-800 shadow-lg p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          {params.id ? "Editar Tarea" : "Crear Tarea"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              type="text"
              name="title"
              placeholder="Escribe el título"
              {...register("title", { required: "El título es obligatorio." })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              autoFocus
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
            {titleError && (
              <p className="text-red-500 text-sm mt-1">{titleError}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              name="description"
              id="description"
              rows="3"
              placeholder="Escribe una descripción"
              {...register("description")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></Textarea>
          </div>

          <div>
            <Label htmlFor="date">Fecha</Label>
            <Input
              type="date"
              name="date"
              {...register("date")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition-transform transform hover:scale-105">
            {params.id ? "Actualizar Tarea" : "Guardar Tarea"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/tasks")}
            className="text-sm text-indigo-500 hover:underline"
          >
            Volver a la lista de tareas
          </button>
        </div>
      </Card>
    </div>
  );
}