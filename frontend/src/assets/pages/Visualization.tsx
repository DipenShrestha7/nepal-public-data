import { useState } from "react";
import {
  BarChart3,
  LineChart,
  PieChart,
  Map,
  Maximize2,
  Download,
  RefreshCw,
  Calendar,
  SlidersHorizontal,
  Info,
  TrendingUp,
  MapPin,
} from "lucide-react";

export default function Visualizations() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [timeRange, setTimeRange] = useState("5Y");

  const tabs = [
    "Overview",
    "Population",
    "Economy",
    "Health",
    "Agriculture & Infra",
  ];

  return (
    <main className="w-full min-h-screen bg-slate-50 font-sans selection:bg-blue-500 selection:text-white py-12 px-6 sm:px-12 md:px-24 lg:px-32">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive Visualizations
            </h1>
            <p className="mt-2 text-slate-500 text-lg">
              Analyze national development patterns, geospatial tracking
              vectors, and statistical trends.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-slate-200 shadow-3xs shrink-0 w-full md:w-auto justify-center">
            {["1Y", "5Y", "10Y", "Max"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  timeRange === range
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/60 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border-b-2 text-sm font-semibold whitespace-nowrap transition-all tracking-wide ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between min-h-100">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Macroeconomic Performance
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Annual GDP Growth Rate Trends
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-100 shadow-3xs transition-all">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-100 shadow-3xs transition-all">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full my-6 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              <LineChart className="w-16 h-16 text-slate-300 stroke-[1.25] mb-2 animate-pulse" />
              <p className="text-sm font-semibold text-slate-700">
                Interactive Time-Series Engine Active
              </p>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Charting metrics, variance margins, and sector distributions
                configured dynamically.
              </p>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>FY 2021/22</span>
                <span>FY 2022/23</span>
                <span>FY 2023/24</span>
                <span>FY 2024/25</span>
                <span>FY 2025/26</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" /> Continuous
                Pipeline Source: Central Bureau
              </span>
              <button className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-700">
                <Download className="w-3.5 h-3.5" /> Export SVG
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between min-h-100">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Analysis Filters
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                    Breakdown Demographics
                  </label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option>By Federal Province Mapping</option>
                    <option>By Ecological Ecological Zones</option>
                    <option>By District Categorization</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                    Aggregation Model
                  </label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option>Gross Compound Mean Metrics</option>
                    <option>Median Density Quantiles</option>
                    <option>Absolute Tabular Summaries</option>
                  </select>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
                    Active Indicators
                  </label>
                  <div className="space-y-2">
                    {[
                      "Services Sector Contribution",
                      "Agricultural Gross Revenue",
                      "Industrial Output Indexes",
                    ].map((label, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={i === 0}
                          className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded-sm focus:ring-blue-500/20"
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 mt-6">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Adjusting dashboard parameters dynamically restructures raw
                layout bundles inside the mapping canvas engine pipeline
                instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between group hover:border-slate-300 transition-all">
            <div className="space-y-3">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg border border-purple-100 inline-block">
                <Map className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Geospatial Distribution Map
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Render interactive shapefile heatmaps tracking demographic
                densities and structural pipeline networks across localized
                local bodies.
              </p>
            </div>
            <button className="mt-5 text-xs font-bold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1">
              Initialize Map Visualization <TrendingUp className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between group hover:border-slate-300 transition-all">
            <div className="space-y-3">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg border border-rose-100 inline-block">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Sector Allocation Profiles
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compare multi-variant datasets horizontally across federal
                resource allocations, budget expenditures, and infrastructure
                metrics.
              </p>
            </div>
            <button className="mt-5 text-xs font-bold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1">
              Initialize Bar Engine <TrendingUp className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between group hover:border-slate-300 transition-all sm:col-span-2 md:col-span-1">
            <div className="space-y-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 inline-block">
                <PieChart className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Composition Disaggregations
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Examine contextual percentage distributions mapping economic
                outputs, gender ratios, or regional land cultivation yields.
              </p>
            </div>
            <button className="mt-5 text-xs font-bold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1">
              Initialize Composition Matrix <TrendingUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" /> Seeking Localized
              Data Trackers?
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              All chart assets link straight back to verified data blocks. To
              extract the base raw values running these visualizations, visit
              our unified download directories.
            </p>
          </div>
          <a
            href="/dataset"
            className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold text-sm px-5 py-3 rounded-lg shadow-2xs hover:bg-blue-500 transition-colors shrink-0 w-full md:w-auto text-center"
          >
            Go to Source Datasets
          </a>
        </div>
      </div>
    </main>
  );
}
