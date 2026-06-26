import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  Calendar,
  Layers,
  Tag,
  ExternalLink,
} from "lucide-react";
import Datasets from "../data/Datasets.ts";

export default function Dataset() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Population",
    "Economy",
    "Health",
    "Agriculture",
    "Infrastructure",
  ];

  const datasets = Datasets;
  const filteredDatasets = datasets.filter((data) => {
    const matchesSearch =
      data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || data.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="w-full min-h-screen bg-slate-50 font-sans selection:bg-blue-500 selection:text-white py-12 px-6 sm:px-12 md:px-24 lg:px-32">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Public Datasets
          </h1>
          <p className="mt-2 text-slate-500 text-lg">
            Browse, filter, and download machine-readable public records and
            statistical aggregates.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search datasets by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-wide uppercase border transition-all shrink-0 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredDatasets.length > 0 ? (
            filteredDatasets.map((dataset, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row justify-between gap-6 items-start"
              >
                <div className="space-y-3 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-200/60 uppercase tracking-wider">
                      <Tag className="w-3 h-3" /> {dataset.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                      <Calendar className="w-3.5 h-3.5" /> Updated{" "}
                      {dataset.updated}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mt-3 text-gray-900 hover:text-blue-600 hover:underline transition-colors">
                    {dataset.title ===
                    "National Mortality Registry & Cause of Death Summary" ? (
                      <Link
                        to="/mortalityperprovince-districts"
                        state={{
                          dataUrl: "/data/mortality_clean.json",
                          title: dataset.title,
                        }}
                      >
                        {dataset.title}
                      </Link>
                    ) : (
                      // Fallback default for your other dataset cards
                      <span className="cursor-not-allowed">
                        {dataset.title}
                      </span>
                    )}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                    {dataset.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-slate-400" />{" "}
                      {dataset.records}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-slate-400" />{" "}
                      Size: {dataset.size}
                    </span>
                    <span className="bg-slate-50 text-slate-600 font-mono px-1.5 py-0.5 rounded border border-slate-200">
                      {dataset.format}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t border-slate-100 md:border-t-0 justify-end">
                  <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-2xs transition-colors w-full md:w-36">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <a
                    href="/visualizations"
                    className="inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm px-4 py-2.5 rounded-lg border border-slate-200 shadow-3xs transition-colors w-full md:w-36"
                  >
                    Visualize <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-2xs space-y-3">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-full inline-block">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-slate-900 font-bold text-lg">
                No datasets matches your search
              </p>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Try adjustment filters, spelling revisions, or clear search
                queries to explore broader national data structures.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-2 text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        <div className="bg-slate-900 rounded-xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Require raw structural data?</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              All hosted platforms pipelines offer fully exposed API access
              endpoints for programmatically integrating raw datasets straight
              into external modeling environments.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-5 py-3 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors shrink-0 w-full md:w-auto justify-center">
            Developer API Docs <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
