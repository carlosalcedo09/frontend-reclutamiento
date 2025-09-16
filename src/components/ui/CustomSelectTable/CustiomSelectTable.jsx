export default function CustomSelect({ value, onChange, options, styleMap }) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()} // 🔹 evita que el row reciba el click
        className={`rounded-full px-8 pr-12 py-1 appearance-none cursor-pointer w-full ${
          styleMap[value]?.classes || "bg-gray-300 text-white"
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-white text-black">
            {opt}
          </option>
        ))}
      </select>

      <span
        className={`pointer-events-none absolute inset-y-0 right-4 flex items-center ${
          styleMap[value]?.icon || "text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
  );
}
