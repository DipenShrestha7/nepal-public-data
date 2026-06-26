import { useState, useEffect, useMemo } from "react";

interface MortalityRecord {
  province: string;
  district: string;
  sex: string;
  ageGroup: string;
  total: number;
  causes: {
    communicable: number;
    nonCommunicable: number;
    roadAccident: number;
    otherAccident: number;
    pregnancyRelated: number;
    crime: number;
    suicide: number;
    naturalDisaster: number;
    other: number;
    notStated: number;
  };
}

export default function MortalityTableViewer() {
  const [data, setData] = useState<MortalityRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter States
  const [selectedProvince, setSelectedProvince] = useState<string>("All");
  const [selectedSex, setSelectedSex] = useState<string>("All");
  const [selectedAge, setSelectedAge] = useState<string>("All");

  // Pagination State (Prevents rendering bottlenecks)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 50;

  // 1. Fetch JSON straight out of the public folder
  useEffect(() => {
    fetch("/data/mortality_clean.json")
      .then((res) => res.json())
      .then((payload: MortalityRecord[]) => {
        setData(payload);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load local static dataset:", err);
        setLoading(false);
      });
  }, []);

  // 2. Extract Dynamic Filter Options based on what is in the file
  const filterOptions = useMemo(() => {
    const provinces = new Set<string>();
    const sexes = new Set<string>();
    const ages = new Set<string>();

    data.forEach((row) => {
      if (row.province) provinces.add(row.province);
      if (row.sex) sexes.add(row.sex);
      if (row.ageGroup) ages.add(row.ageGroup);
    });

    return {
      provinces: Array.from(provinces).sort(),
      sexes: Array.from(sexes).sort(),
      ages: Array.from(ages),
    };
  }, [data]);

  // 3. Fast In-Memory Processing / Filtering Block
  const filteredData = useMemo(() => {
    // Reset back to page 1 whenever filters change
    setCurrentPage(1);

    return data.filter((row) => {
      const matchProvince =
        selectedProvince === "All" || row.province === selectedProvince;
      const matchSex = selectedSex === "All" || row.sex === selectedSex;
      const matchAge = selectedAge === "All" || row.ageGroup === selectedAge;
      return matchProvince && matchSex && matchAge;
    });
  }, [data, selectedProvince, selectedSex, selectedAge]);

  // 4. Slicing Out Paginated Views (Showing only 50 chunks at a time)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Syncing census data modules...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-1 text-gray-900">
        National Mortality Registry
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Interactive structural cause matrices filtered across localized
        reporting units.
      </p>

      {/* 🎛️ Filter Interface Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Province Context
          </label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Provinces</option>
            {filterOptions.provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Demographic Sex
          </label>
          <select
            value={selectedSex}
            onChange={(e) => setSelectedSex(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Genders</option>
            {filterOptions.sexes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Age Classification Group
          </label>
          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Lifespans</option>
            {filterOptions.ages.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 📊 Data Grid Layout Matrix */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 font-medium">
              <th className="p-3">Location / District</th>
              <th className="p-3">Sex</th>
              <th className="p-3">Age Span</th>
              <th className="p-3 bg-blue-50 text-blue-900 font-semibold">
                Total Deaths
              </th>
              <th className="p-3">Comm. Dis</th>
              <th className="p-3">Non-Comm</th>
              <th className="p-3">Road Inc.</th>
              <th className="p-3">Other Acc.</th>
              <th className="p-3">Maternal</th>
              <th className="p-3">Suicide</th>
              <th className="p-3">Disaster</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium">
                    {row.district === "All"
                      ? `${row.province} Total`
                      : row.district}
                  </td>
                  <td className="p-3 text-gray-600">{row.sex}</td>
                  <td className="p-3 text-gray-600">{row.ageGroup}</td>
                  <td className="p-3 bg-blue-50/50 text-blue-900 font-semibold">
                    {row.total.toLocaleString()}
                  </td>
                  <td className="p-3">{row.causes.communicable}</td>
                  <td className="p-3">{row.causes.nonCommunicable}</td>
                  <td className="p-3">{row.causes.roadAccident}</td>
                  <td className="p-3">{row.causes.otherAccident}</td>
                  <td className="p-3">{row.causes.pregnancyRelated}</td>
                  <td className="p-3 text-red-600">{row.causes.suicide}</td>
                  <td className="p-3">{row.causes.naturalDisaster}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="p-8 text-center text-gray-500 italic"
                >
                  No localized entries match the selected structural variables.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔢 Pagination Control Toolbar */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 bg-white py-2 px-1">
          <span className="text-xs text-gray-600">
            Showing rows <strong>{(currentPage - 1) * rowsPerPage + 1}</strong>{" "}
            to{" "}
            <strong>
              {Math.min(currentPage * rowsPerPage, filteredData.length)}
            </strong>{" "}
            of <strong>{filteredData.length}</strong> metrics
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
            >
              Previous
            </button>
            <span className="text-xs self-center px-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
