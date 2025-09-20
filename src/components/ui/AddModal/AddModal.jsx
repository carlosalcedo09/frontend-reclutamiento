"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Heart,
  Building,
  BadgeCheck,
  House,
  Clock2,
  ClockFading,
  Gpu,
  Banknote,} from "lucide-react";

export default function AddModal({ isOpen, onClose, data }) {
  
  const { selectedIndex, all } = data;

  const selectedOffer = all[selectedIndex];
 
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
            <div className="flex justify-end p-8 md:p-6 lg:p-8">
                <button onClick={onClose} className="text-2xl">
                    ✕
                </button>
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
                <p className="text-black text-sm">{selectedOffer.company}</p>
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
                    {selectedOffer.employment_type === "Tiempo Completo" && <Clock2 className="w-4 h-4 text-gray-500" />}
                    {selectedOffer.employment_type === "Medio Tiempo" && <ClockFading className="w-4 h-4 text-gray-500" />}
                    <p className="text-gray-600 text-sm">{selectedOffer.employment_type}</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <Banknote  className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-600 text-sm">S/.{selectedOffer.salary_min} - S/.{selectedOffer.salary_max}</p>
                </div>
              </div>
              <div className="border border-blue-900 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-blue-900">¿Qué buscamos?</h2>
                 <ul className="list-disc list-inside">
                  {selectedOffer.JobRequirements && selectedOffer.JobRequirements.length > 0 ? (
                    selectedOffer.JobRequirements.map((req) => (
                      <li key={req.id} className="text-gray-700 text-sm">
                        {req.description}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-700 text-sm">No hay requisitos definidos</li>
                  )}
                </ul>

              </div>

              <div className="border border-blue-900 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-blue-900">¿Qué habilidades necesitamos?</h2>
                <ul className="list-disc list-inside">
                  {selectedOffer.JobSkill && selectedOffer.JobSkill.length > 0 ? (
                    selectedOffer.JobSkill.map((skil) => (
                      <li key={skil.id} className="text-gray-700 text-sm">
                        {skil.skill}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-700 text-sm">No hay habilidades definidas</li>
                  )}
                </ul>

              </div>

               <div className="border border-blue-900 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-blue-900">¿Qué ofrecemos?</h2>

              </div>
            
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={""}
                className="w-auto block p-6 px-12 bg-blue-900 text-center rounded-full text-white font-bold mb-7  m-2"
              >
                Postularme
              </button>
              <button
                onClick={""}
                className=" p-2 px-6 bg-[#eaf3fb] text-center rounded-full text-white font-bold mb-7 m-2"
              >
                <Heart className="w-6 h-6 text-blue-900"/>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
