"use client";
import api from '@/lib/axios';
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Building,
  BadgeCheck,
  House,
  MailWarning,
  Clock2,
  ClockFading,
  Gpu,
  Banknote,
  MailCheck,
  HatGlasses,
  TriangleAlert,
} from "lucide-react";
import ModalConfirmation from "@/components/ui/ModalConfirmation";

export default function AddModal({ isOpen, onClose, data }) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  if (!data) return null; 

  const selectedOffer = data;

  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [modalConfirmContent, setModalConfirmContent] = useState({
    title: "",
    textbutton: "",
    description: "",
    icon: "",
    onAction: null,
  });

  const handlePostularme = async () => {
                  if (!isLoggedIn) {
                  setModalConfirmContent({
                    icon: <HatGlasses className="w-6 h-6 text-blue-900" />,
                    title: "Debes iniciar sesión",
                    description: "Para enviar tu postulación, primero debes iniciar sesión en el sistema.",
                    textbutton: "Ir a iniciar sesión",
                    onAction: () => (window.location.href = "/usuario/login"),
                  });
                  setIsModalConfirmOpen(true);
                  return;
                }
                try {
                  const res = await api.post("/jobaplications/", {
                  joboffers_id: selectedOffer.id, 
                  });
                
                  if (res.status === 201 || res.status === 200) {
                    setModalConfirmContent({
                    icon: <MailCheck className="w-6 h-6 text-blue-900" />,
                                      title: "Postulación enviada",
                                      description:
                                        "Tu postulación ha sido enviada correctamente, recuerda revisar la sección Mis Postulaciones y ver tu progreso",
                                      textbutton: "Aceptar",
                                      onAction: () => setIsModalConfirmOpen(false),
                                    });
                                    setIsModalConfirmOpen(true);
                                  }
                    } catch (error) {
                        if (error.response?.status === 400) {
                        setModalConfirmContent({
                        icon: <MailWarning className="w-6 h-6 text-yellow-600" />,
                        title: "Ya postulaste",
                        description:
                        error.response.data?.non_field_errors?.[0] ||
                        "Ya tienes una postulación para esta oferta, accede a mis postulaciones para ver su estado",
                        textbutton: "Ir a Mis Postulaciones",
                        onAction: () => (window.location.href = "/mis-postulaciones")
                        });
                        } else {
                          setModalConfirmContent({
                          icon: <TriangleAlert className="w-6 h-6 text-red-600" />,
                          title: "Error al enviar postulación",
                          description:
                          "Hubo un problema al enviar tu postulación. Intenta nuevamente.",
                    textbutton: "Aceptar",
                   onAction: () => setIsModalConfirmOpen(false),
                   });
                   }
                  setIsModalConfirmOpen(true);
                  }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-white shadow-2xl z-50 flex flex-col px-6 py-4 md:px-10 md:py-16 lg:px-10 lg:py-16"
          >
            <div className="flex justify-end p-6">
              <button onClick={onClose} className="text-2xl">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedOffer.title}</h2>
                {selectedOffer.is_urgent && (
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    Urgente
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 py-2">
                <div className="bg-blue-900 w-7 h-7 flex items-center justify-center rounded-full">
                  <BadgeCheck className="w-4 h-4 text-white" />
                </div>
                <p className="text-black text-sm">{selectedOffer.company_name}</p>
              </div>

              <p className="text-gray-600 text-sm">{selectedOffer.location}</p>
              <p className="py-3 text-gray-700 text-sm">{selectedOffer.description}</p>

              <div className="flex gap-4">
                <div className="flex items-center gap-2 py-1">
                  {selectedOffer.mode === "Remoto" && <House className="w-4 h-4 text-gray-500" />}
                  {selectedOffer.mode === "Presencial" && <Building className="w-4 h-4 text-gray-500" />}
                  {selectedOffer.mode === "Híbrido" && <Gpu className="w-4 h-4 text-gray-500" />}
                  <p className="text-gray-600 text-sm">{selectedOffer.mode}</p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedOffer.employment_type === "Full-Time" && <Clock2 className="w-4 h-4 text-gray-500" />}
                  {selectedOffer.employment_type === "Part-Time" && <ClockFading className="w-4 h-4 text-gray-500" />}
                  <p className="text-gray-600 text-sm">{selectedOffer.employment_type}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-600 text-sm">
                    S/.{selectedOffer.salary_min} - S/.{selectedOffer.salary_max}
                  </p>
                </div>
              </div>

              <div className="border border-blue-900 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-blue-900">¿Qué buscamos?</h2>
                <ul className="list-disc list-inside">
                  {selectedOffer.requeriments?.length > 0
                    ? selectedOffer.requeriments.map(req => (
                        <li key={req.id} className="text-gray-700 text-sm">{req.description}</li>
                      ))
                    : <li className="text-gray-700 text-sm">No hay requisitos definidos</li>}
                </ul>
              </div>

              <div className="border border-blue-900 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-blue-900">¿Qué habilidades necesitamos?</h2>
                <ul className="list-disc list-inside">
                  {selectedOffer.skills?.length > 0
                    ? selectedOffer.skills.map(skil => (
                        <li key={skil.id} className="text-gray-700 text-sm">{skil.skill_name}</li>
                      ))
                    : <li className="text-gray-700 text-sm">No hay habilidades definidas</li>}
                </ul>
              </div>
              <div className="border border-blue-900 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-blue-900">¿Qué ofrecemos?</h2>
                <ul className="list-disc list-inside">
                  {selectedOffer.benefits?.length > 0
                    ? selectedOffer.benefits.map(ben => (
                        <li key={ben.id} className="text-gray-700 text-sm">{ben.description}</li>
                      ))
                    : <li className="text-gray-700 text-sm">No hay beneficios definidas</li>}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 py-5">
              <p className="text-gray-400 text-sm">Publicado el {selectedOffer.start_date} - </p>
              <p className="text-gray-400 text-sm">Finaliza el {selectedOffer.end_date}</p>
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={handlePostularme}
                className="w-auto block p-6 px-12 bg-blue-900 text-center rounded-full text-white font-bold mb-7 m-2"
              >
                Postularme
              </button>

              <button className="p-2 px-6 bg-[#eaf3fb] text-center rounded-full text-white font-bold mb-7 m-2">
                <Heart className="w-6 h-6 text-blue-900" />
              </button>
            </div>

            <ModalConfirmation
              isOpen={isModalConfirmOpen}
              onClose={() => setIsModalConfirmOpen(false)}
              icon={modalConfirmContent.icon}
              title={modalConfirmContent.title}
              description={modalConfirmContent.description}
              textbutton={modalConfirmContent.textbutton}
              onAction={modalConfirmContent.onAction}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
