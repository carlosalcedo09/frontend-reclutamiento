"use client";

import Image from "next/image";

export default function Card({ obj, onClick, icon }) {
  return (
    <div
      key={obj.id}
      className="relative overflow-hidden shadow-lg group w-full h-96 rounded-tl-2xl rounded-br-2xl"
      onClick={onClick}
    >
      <Image
        src={obj.img}
        alt={obj.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex flex-col items-center text-center z-10">
        <h2 className="text-lg font-semibold">{obj.name}</h2>
        <div className="flex items-center justify-center gap-2 h-full">
          {icon}
          <p className="text-sm font-light">
            {obj.birth} – {obj.death}
          </p>
        </div>

      </div>
    </div>
  );
}
