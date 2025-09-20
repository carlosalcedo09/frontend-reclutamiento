"use client";

import { useState } from "react";
import AddModal from "@/components/ui/AddModal";
import {
  Search,
  Briefcase,
  Building2,
  Building,
  BadgeCheck,
  House,
  Clock2,
  ClockFading,
  Gpu,
  SlidersHorizontal,
} from "lucide-react";

export default function OfertaLaboralesPage() {
  const [form, setForm] = useState({ cargo: "", modalidad: "" });
  const [search, setSearch] = useState({ cargo: "", modalidad: "" });
  const [filters, setFilters] = useState({
    experiencia: "",
    fecha: "",
    salario: "",
    urgencia: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const ofert = [
    {
      id: 1,
      title: "Backend Developer",
      company: "Pattern group S.A.C",
      description:
        "Buscamos un desarrollador Backend para nuestra startup; si tienes experiencia en el desarrollo y gestión de proyectos, esta es tu oportunidad.",
      location: "Lima, Lima",
      employment_type: "Tiempo Completo",
      mode: "Remoto",
      is_urgent: true,
      experiencia: "2 años",
      fecha: "2025-09-15",
      salary_min: "1500",
      salary_max: "1750",
      JobSkill: [
        {
          id: 1,
          skill: "Trabajo en Equipo"
        },
        {
          id: 2,
          skill: "Capacidad de Innovación"
        }
      ],
      JobRequirements: [
        {
          id: 1,
          description: "Conocimiento en ofimática xxxxxx xxxxxxxxxxx xxxxxxxxxxx xxxxxxxxxxx"
        },
        {
          id: 2,
          description: "Conocimiento en ofimática xxxxxx xxxxxxxxx xxxxxxx xxxxxx xxxx xxxxxxx"
        }
      ],
    },
    {
      id: 2,
      title: "UI / UX",
      company: "Pattern group S.A.C",
      description:
        "Buscamos un UI / UX para nuestra startup; si tienes experiencia en la maquetación, diseño y prototipado, esta es tu oportunidad.",
      location: "San Isidro, Lima",
      employment_type: "Medio Tiempo",
      mode: "Remoto",
      is_urgent: false,
      experiencia: "1 año",
      fecha: "2025-09-18",
      salary_min: "1500",
      salary_max: "1750",
         JobSkill: [
        {
          id: 1,
          skill: "Trabajo en Equipo"
        },
        {
          id: 2,
          skill: "Capacidad de Innovación"
        }
      ],
      JobRequirements: [
        {
          id: 1,
          description: "Conocimiento en ofimática xxxxxx xxxxxxxxx xxxxxxxxxxx xxxxx xxxxxxxx"
        },
        {
          id: 2,
          description: "Conocimiento en ofimática xxxxxx xxxxxxxxxxxx xxxxxxxxx xxxxxxxxxxxx"
        }
      ],
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Pattern group S.A.C",
      description:
        "Buscamos un desarrollador Backend para nuestra startup; si tienes experiencia en el desarrollo y gestión de proyectos, esta es tu oportunidad.",
      location: "Lima, Lima",
      employment_type: "Tiempo Completo",
      mode: "Remoto",
      is_urgent: true,
      experiencia: "2 años",
      fecha: "2025-09-15",
      salary_min: "1500",
      salary_max: "1750",
         JobSkill: [
        {
          id: 1,
          skill: "Trabajo en Equipo"
        },
        {
          id: 2,
          skill: "Capacidad de Innovación"
        }
      ],
      JobRequirements: [
        {
          id: 1,
          description: "Conocimiento en ofimática xxxxxxxxxxx xxxxxxxxx xxxxxxxxxxxxx xxxxxx"
        },
        {
          id: 2,
          description: "Conocimiento en ofimática xxxxxxxxx xxxxxxxxxx xxxxxxxx xxxxxxxxxxxx"
        }
      ],
    },
    {
      id: 4,
      title: "UI / UX",
      company: "Pattern group S.A.C",
      description:
        "Buscamos un UI / UX para nuestra startup; si tienes experiencia en la maquetación, diseño y prototipado, esta es tu oportunidad.",
      location: "San Isidro, Lima",
      employment_type: "Medio Tiempo",
      mode: "Remoto",
      is_urgent: false,
      experiencia: "1 año",
      fecha: "2025-09-18",
      salary_min: "2600",
      salary_max: "2750",
         JobSkill: [
        {
          id: 1,
          skill: "Trabajo en Equipo"
        },
        {
          id: 2,
          skill: "Capacidad de Innovación"
        }
      ],
      JobRequirements: [
        {
          id: 1,
          description: "Conocimiento en ofimática xxxxx xxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx"
        },
        {
          id: 2,
          description: "Conocimiento en ofimática xxxxx xxxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxxx"
        }
      ],
    },
  ];

  const filtered = ofert.filter(
    (o) =>
      o.title.toLowerCase().includes(search.cargo.toLowerCase()) &&
      o.mode.toLowerCase().includes(search.modalidad.toLowerCase()) &&
      (filters.experiencia ? o.experiencia === filters.experiencia : true) &&
      (filters.fecha ? new Date(o.fecha) >= new Date(filters.fecha) : true) &&
      (filters.salario
        ? parseInt(o.salary_min) <= parseInt(filters.salario) &&
          parseInt(o.salary_max) >= parseInt(filters.salario)
        : true) &&
      (filters.urgencia
        ? filters.urgencia === "Urgente"
          ? o.is_urgent
          : !o.is_urgent
        : true)
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(form);
  };

  const handleFilterClick = (name, value) => {
    setFilters({
      ...filters,
      [name]: filters[name] === value ? "" : value,
    });
  };

  return (
    <main className="w-full flex flex-col items-center bg-[#F6FBFF]">
      <div className="relative w-full h-[60vh] sm:h-[45vh] px-4 sm:px-8 lg:px-24 py-12 sm:py-20 overflow-hidden">
        <img
          src="https://s3.amazonaws.com/rtvc-assets-canalinstitucional.tv/s3fs-public/2022-05/ofertas%20trabajo%20sena%20aplicar.jpg"
          alt="Fondo"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4">
            ¡Ahora es el momento de cambiar!
          </h1>
          <p className="mb-6 text-sm sm:text-base md:text-lg">
            Encuentra el empleo que encaja contigo, más de{" "}
            <span className="font-bold">{ofert.length}</span> ofertas
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center bg-white rounded-xl sm:rounded-full overflow-hidden max-w-3xl w-full divide-y md:divide-y-0 md:divide-x"
          >
            <div className="flex items-center px-4 py-2 w-full md:w-1/2">
              <Briefcase className="text-gray-500 mr-2 w-5 h-5" />
              <input
                type="text"
                name="cargo"
                placeholder="Cargo"
                value={form.cargo}
                onChange={handleChange}
                className="w-full outline-none text-gray-700 text-sm md:text-base"
              />
            </div>

            <div className="flex items-center px-4 py-2 w-full md:w-1/2">
              <Building2 className="text-gray-500 mr-2 w-5 h-5" />
              <input
                type="text"
                name="modalidad"
                placeholder="Modalidad"
                value={form.modalidad}
                onChange={handleChange}
                className="w-full outline-none text-gray-700 text-sm md:text-base"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-800 transition w-full md:w-auto"
            >
              <Search className="w-5 h-5" />
              Buscar empleos
            </button>
          </form>
        </div>
      <svg className="absolute bottom-0 left-0 w-full h-[80px] -mb-[2px] sm:mb-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" > <path fill="#F6FBFF" d="M0,224L48,202.7C96,181,192,139,288,149.3C384,160,480,224,576,224C672,224,768,160,864,128C960,96,1056,96,1152,117.3C1248,139,1344,181,1392,202.7L1440,224L1440,320L0,320Z" /> </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-12 px-4 sm:px-6 lg:px-12 w-full max-w-7xl">
        <aside className="bg-white p-6 rounded-2xl shadow-md lg:col-span-1 h-fit">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <SlidersHorizontal className="w-5 h-5 text-blue-900" />
            Filtros
          </h2>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Años de experiencia
            </h3>
            <div className="flex flex-col gap-2">
              {["1 año", "2 años", "3 años"].map((exp) => (
                <button
                  key={exp}
                  type="button"
                  onClick={() => handleFilterClick("experiencia", exp)}
                  className={`w-full px-3 py-2 rounded-2xl text-sm text-left transition ${
                    filters.experiencia === exp
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Fecha de publicación
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Últimos 3 días", value: "2025-09-17" },
                { label: "Última semana", value: "2025-09-13" },
                { label: "Último mes", value: "2025-08-20" },
              ].map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => handleFilterClick("fecha", f.value)}
                  className={`w-full px-3 py-2 rounded-2xl text-sm text-left transition ${
                    filters.fecha === f.value
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Salario mínimo
            </h3>
            <div className="flex flex-col gap-2">
              {["1500", "1600", "1700"].map((sal) => (
                <button
                  key={sal}
                  type="button"
                  onClick={() => handleFilterClick("salario", sal)}
                  className={`w-full px-3 py-2 rounded-2xl text-sm text-left transition ${
                    filters.salario === sal
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  S/ {sal}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Urgencia
            </h3>
            <div className="flex flex-col gap-2">
              {["Urgente", "No urgente"].map((urg) => (
                <button
                  key={urg}
                  type="button"
                  onClick={() => handleFilterClick("urgencia", urg)}
                  className={`w-full px-3 py-2 rounded-2xl text-sm text-left transition ${
                    filters.urgencia === urg
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {urg}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3 grid grid-cols-1 gap-6">
          {filtered.map((ofert, index) => (
            <div
              key={ofert.id}
              onClick={() => {
                setModalData({ selectedIndex: index, all: filtered });
                setIsModalOpen(true);
              }}
              className="bg-white border p-6 sm:p-8 rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center gap-2">
                <h1 className="sm:text-lg font-semibold text-black">{ofert.title}</h1>
                {ofert.is_urgent && (
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    Urgente
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 py-2">
                <div className="bg-blue-900 w-7 h-7 flex items-center justify-center rounded-full">
                  <BadgeCheck className="w-4 h-4 text-white" />
                </div>
                <p className="text-black text-sm">{ofert.company}</p>
              </div>

              <p className="text-gray-600 text-sm">{ofert.location}</p>

              <p className="py-3 text-gray-700 text-sm">{ofert.description}</p>

              <div className="flex items-center gap-2 py-1">
                {ofert.mode === "Remoto" && <House className="w-4 h-4 text-gray-500" />}
                {ofert.mode === "Presencial" && <Building className="w-4 h-4 text-gray-500" />}
                {ofert.mode === "Híbrido" && <Gpu className="w-4 h-4 text-gray-500" />}
                <p className="text-gray-600 text-sm">{ofert.mode}</p>
              </div>

              <div className="flex items-center gap-2">
                {ofert.employment_type === "Tiempo Completo" && <Clock2 className="w-4 h-4 text-gray-500" />}
                {ofert.employment_type === "Medio Tiempo" && <ClockFading className="w-4 h-4 text-gray-500" />}
                <p className="text-gray-600 text-sm">{ofert.employment_type}</p>
              </div>
            </div>
          ))}

          {isModalOpen && (
            <AddModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              data={modalData}
            />
          )}
        </div>
      </div>
    </main>
  );
}
