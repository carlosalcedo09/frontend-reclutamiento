"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Search, Briefcase, Building2 } from "lucide-react";
import api from '@/lib/axios';
import AddModal from "@/components/ui/AddModal";
import ModalConfirmation from "@/components/ui/ModalConfirmation";
import JobCard from "./JobCard/JobCard";
import Filters from "./JobFilter/JobFilter";

export default function OfertaLaboralesPage() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [ofertData, setOfertData] = useState([]);

  const [form, setForm] = useState({ cargo: "", modalidad: "" });
  const [search, setSearch] = useState({ cargo: "", modalidad: "" });
  const [filters, setFilters] = useState({ experiencia: "", fecha: "", salario: "", urgencia: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [modalConfirmContent, setModalConfirmContent] = useState({ title: "", textbutton: "", description: "", icon: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/joboffers/');
        setOfertData(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error al cargar los datos de las postulaciones', error);
      }
    };
    fetchData();
  }, []);

  const filtered = ofertData.filter(
    (o) =>
      (o.title || "").toLowerCase().includes((search.cargo || "").toLowerCase()) &&
      (o.mode || "").toLowerCase().includes((search.modalidad || "").toLowerCase()) &&
      (filters.experiencia ? o.experiencia === filters.experiencia : true) &&
      (filters.fecha ? new Date(o.start_date) >= new Date(filters.fecha) : true) &&
      (filters.salario 
  ? parseInt(o.salary_max) >= parseInt(filters.salario) 
  : true
)&&
      (filters.urgencia ? (filters.urgencia === "Urgente" ? o.is_urgent : !o.is_urgent) : true)
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSearch(form); };
  const handleOpenModal = (job) => { setModalData(job); setIsModalOpen(true); };
  const handleFilterClick = (name, value) => setFilters({ ...filters, [name]: filters[name] === value ? "" : value });

  return (
    <main className="w-full flex flex-col items-center bg-[#F6FBFF]">

      {/* Hero y Formulario */}
      <div className="relative w-full h-[60vh] sm:h-[45vh] px-4 sm:px-8 lg:px-24 py-12 sm:py-20 overflow-hidden">
        <img
          src="https://s3.amazonaws.com/rtvc-assets-canalinstitucional.tv/s3fs-public/2022-05/ofertas%20trabajo%20sena%20aplicar.jpg"
          alt="Fondo"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4">¡Ahora es el momento de cambiar!</h1>
          <p className="mb-6 text-sm sm:text-base md:text-lg">
            Encuentra el empleo que encaja contigo, más de <span className="font-bold">{ofertData.length}</span> ofertas
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center bg-white rounded-xl sm:rounded-full overflow-hidden max-w-3xl w-full divide-y md:divide-y-0 md:divide-x">
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

            <button type="submit" className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-800 transition w-full md:w-auto">
              <Search className="w-5 h-5" />
              Buscar empleos
            </button>
          </form>
        </div>
        <svg className="absolute bottom-0 left-0 w-full h-[80px] -mb-[2px] sm:mb-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" > <path fill="#F6FBFF" d="M0,224L48,202.7C96,181,192,139,288,149.3C384,160,480,224,576,224C672,224,768,160,864,128C960,96,1056,96,1152,117.3C1248,139,1344,181,1392,202.7L1440,224L1440,320L0,320Z" /> </svg>

      </div>

      {/* Ofertas y filtros */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-12 px-4 sm:px-6 lg:px-12 w-full max-w-7xl">
        <Filters filters={filters} handleFilterClick={handleFilterClick} />

        <div className="lg:col-span-3 grid grid-cols-1 gap-6">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              ofert={job}
              isLoggedIn={isLoggedIn}
              setModalConfirmContent={setModalConfirmContent}
              setIsModalConfirmOpen={setIsModalConfirmOpen}
              onOpenModal={handleOpenModal}
            />
          ))}

          {isModalOpen && <AddModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={modalData} />}

          <ModalConfirmation
            isOpen={isModalConfirmOpen}
            onClose={() => setIsModalConfirmOpen(false)}
            icon={modalConfirmContent.icon}
            title={modalConfirmContent.title}
            description={modalConfirmContent.description}
            textbutton={modalConfirmContent.textbutton}
            onAction={modalConfirmContent.onAction}
          />
        </div>
      </div>
    </main>
  );
}
