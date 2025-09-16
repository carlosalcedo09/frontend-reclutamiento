"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputField from '@/components/ui/InputField';
import SelectField from "../SelectField";
import CustomSelect from "@/components/ui/CustomSelectTable";

const statusOptions = ["Selecciona el estado","Activo", "Inactivo"];
const permissionOptions = ["Selecciona el tipo de permiso","Administrador", "Editor", "Usuario"];

export default function AddModal({ isOpen, onClose, onSave, person }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    status: "Selecciona el estado",  
    permission: "Selecciona el tipo de permiso",
  });

  
  useEffect(() => {
    if (person) {

      console.log(person.name)
      setForm({
      name: person.name || "",
      email: person.email || "",
      startDate: person.startDate || "",
      endDate: person.endDate || "",
      status: person.status || "Inactivo",
      permission: person.permission || "Usuario",
    });
    } else {
      setForm({
        name: "",
        email: "",
        startDate: "",
        endDate: "",
        status: "Inactivo",
        permission: "Usuario",
      });
    }
  }, [person, isOpen]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    onSave(form, person); 
    onClose();
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
            className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-white shadow-2xl z-50 flex flex-col px-12 py-24"
          >
            <div className="flex justify-end p-8">
                <button onClick={onClose} className="text-2xl">
                    ✕
                </button>
            </div>


            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <h2 className="text-2xl font-bold mb-6">{person ? "Editar cuenta" : "Agregar cuenta"}</h2>

              <InputField
                type="text"
                value={form.name}
                label="Nombres de usuario"
                onChange={(e) => handleChange("name", e.target.value)}
              />

              <InputField
                type="email"
                value={form.email}
                label="Correo"
                onChange={(e) => handleChange("email", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  type="date"
                  value={form.startDate}
                  label="Fecha de inicio"
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />

                <InputField
                  type="date"
                  value={form.endDate}
                  label="Fecha de fin"
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>

              <div  className="w-full">
                <label className="c_input_label flex items-center mb-1 text-black py-1">
                  <div className="text-sm">Estado</div>
                </label>
                <CustomSelect
                  value={form.status}   
                  onChange={(val) => handleChange("status", val)}
                  options={statusOptions}
                  className="w-full"
                  styleMap={{
                    Activo: {
                      classes: "bg-green-500 text-white",
                      icon: "text-white",
                    },
                    Inactivo: {
                      classes: "bg-[#F2F2F2] text-black",
                      icon: "text-black",
                    },
                    "Selecciona el estado":{
                      classes: "bg-[#F2F2F2] text-black",
                      icon: "text-black",
                    }
                  }}
                />
              </div>

              <div>
                <label className="c_input_label flex items-center mb-1 text-black py-1">
                  <div className="text-sm">Permisos</div>
                </label>
                <CustomSelect
                  value={form.permission}   
                  onChange={(val) => handleChange("permission", val)}
                  options={permissionOptions}
                  className="w-full"
                  styleMap={{
                    "Selecciona el tipo de permiso": {
                      classes: "bg-[#F2F2F2] text-black",
                      icon: "text-black",
                    },
                    Administrador: {
                      classes: "bg-green-500 text-white",
                      icon: "text-white",
                    },
                    Editor: {
                      classes: "bg-[#F2F2F2] text-black",
                      icon: "text-black",
                    },
                    Usuario:{
                      classes: "bg-[#F2F2F2] text-black",
                      icon: "text-black",
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between p-6">
              <button
                onClick={onClose}
                className="w-full block p-2 bg-white text-center rounded-xl text-black font-bold mb-7 border border-black m-4"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="w-full block p-2 bg-black text-center rounded-xl text-white font-bold mb-7 m-4"
              >
                Guardar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
