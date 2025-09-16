"use client";
import { useState } from "react";
import SearchBar from "@/components/ui/SearchBar";

export default function DataTable({
  columns,
  data,
  renderCell,
  rowsPerPage = 10,
  onRowClick,
}) {
  const [tableData, setTableData] = useState(data);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (rowIndex, field, value) => {
    const updated = [...tableData];
    const globalIndex = (currentPage - 1) * rowsPerPage + rowIndex;
    updated[globalIndex][field] = value;
    setTableData(updated);
  };

  let filteredData = tableData.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  if (sortConfig.key) {
    filteredData.sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (typeof valA === "string" && typeof valB === "string") {
        return sortConfig.direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }
    });
  }

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <section>
      <div className="mb-4 w-full">
        <SearchBar
          placeholder="Buscar..."
          onSearch={(value) => setSearch(value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <thead className="bg-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left border-b-4 font-semibold"
                  style={{ width: `${100 / columns.length}%` }}
                >
                  <div className="flex justify-between items-center">
                    <span>{col.label}</span>
                    <button onClick={() => handleSort(col.key)}>
                      {sortConfig.key === col.key
                        ? sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3"
                      style={{ width: `${100 / columns.length}%` }}
                    >
                      {renderCell
                        ? renderCell(row, col.key, rowIndex, handleChange)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded disabled:opacity-50 bg-transparent"
        >
          ← Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-transparent hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded disabled:opacity-50 bg-transparent"
        >
          Siguiente →
        </button>
      </div>
    </section>
  );
}
