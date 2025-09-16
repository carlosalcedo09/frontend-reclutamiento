"use client";


export default function ModalConfirmation({ 
  isOpen, 
  onClose, 
  icon, 
  title, 
  description 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg 
                p-8 sm:p-12
                w-[90%] max-w-md 
                relative">
         <div className="flex justify-end">
        <button 
                onClick={onClose} 
                className="text-2xl"
                >
                ✕
                </button>
         </div>


        <div className="flex justify-center mb-4">
          {icon}
        </div>

        <h2 className="text-lg font-semibold text-center mb-2">
          {title}
        </h2>

        <p className="text-sm text-black text-center">
          {description}
        </p>
      </div>
    </div>
  );
}
