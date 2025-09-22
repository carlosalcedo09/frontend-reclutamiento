"use client";
export default function Filters({ filters, handleFilterClick }) {
  const experiencia = ["1 año", "2 años", "3 años"];
  const today = new Date();
  const fecha = [
    { label: "Últimos 3 días", value: new Date(today.setDate(new Date().getDate() - 3)).toISOString().split("T")[0] },
    { label: "Última semana", value: new Date(today.setDate(new Date().getDate() - 7)).toISOString().split("T")[0] },
    { label: "Último mes", value: new Date(today.setMonth(new Date().getMonth() - 1)).toISOString().split("T")[0] },
  ];
  const salario = ["1000", "1400", "1800"];
  const urgencia = ["Urgente", "No urgente"];

  const renderButtons = (arr, name) => arr.map((item) => {
    const value = item.value || item;
    const label = item.label || item;
    return (
      <button
        key={value}
        type="button"
        onClick={() => handleFilterClick(name, value)}
        className={`w-full px-3 py-2 rounded-2xl text-sm text-left transition ${
          filters[name] === value ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {label}{name === "salario"}
      </button>
    );
  });

  return (
    <aside className="bg-white p-6 rounded-2xl shadow-md lg:col-span-1 h-fit">
      <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">Filtros</h2>
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Años de experiencia</h3>
        <div className="flex flex-col gap-2">{renderButtons(experiencia, "experiencia")}</div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Fecha de publicación</h3>
        <div className="flex flex-col gap-2">{renderButtons(fecha, "fecha")}</div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Salario mínimo</h3>
        <div className="flex flex-col gap-2">{renderButtons(salario, "salario")}</div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Urgencia</h3>
        <div className="flex flex-col gap-2">{renderButtons(urgencia, "urgencia")}</div>
      </div>
    </aside>
  );
}
