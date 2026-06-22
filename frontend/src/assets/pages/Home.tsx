import {
  Database,
  ArrowRight,
  Map,
  BarChart3,
  FileSpreadsheet,
  Globe2,
} from "lucide-react";

export default function Home() {
  const stats = [
    {
      label: "Datasets",
      value: "45+",
      icon: FileSpreadsheet,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Data Points",
      value: "120K+",
      icon: Database,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Categories",
      value: "5",
      icon: Globe2,
      color: "text-purple-600 bg-purple-50",
    },
  ];

  const features = [
    {
      title: "Interactive Visualizations",
      desc: "Explore dynamic charts, graphs, and trends mapping critical insights across national sectors.",
      icon: BarChart3,
      link: "/visualizations",
    },
    {
      title: "Comprehensive Datasets",
      desc: "Access fully structured, public repository data on population, economy, health, and more.",
      icon: FileSpreadsheet,
      link: "/dataset",
    },
    {
      title: "Geographical Mapping",
      desc: "View spatial distributions and regional metrics mapped across districts and provinces.",
      icon: Map,
      link: "/visualizations",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      <section className="relative w-full bg-slate-900 overflow-hidden pt-10 pb-10 px-6 sm:px-12 md:px-24 lg:px-32">
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900 to-slate-900/90 z-0"></div>

        <div className="relative max-w-5xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Explore and Visualize Data about Nepal
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
              Access localized, reliable statistics spanning demographics,
              macroeconomics, healthcare networks, agricultural outputs, and
              structural infrastructure projects across the nation.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href="/dataset"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all group"
              >
                Browse Datasets{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/visualizations"
                className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 shadow-xs transition-colors"
              >
                Explore Charts
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-xs border border-slate-700/60 p-5 rounded-2xl flex items-center gap-4 shadow-xl"
              >
                <div
                  className={`p-3 rounded-xl shrink-0 ${stat.color} bg-opacity-10`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-3xl font-black text-white tracking-tight block">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mt-0.5">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-6 sm:px-12 md:px-24 lg:px-32">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Core Platform Capabilities
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              Unlocking insights from fragmented public records using modern
              visual analysis systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between transition-all hover:shadow-md hover:border-slate-300 group"
              >
                <div>
                  <div className="p-3 bg-slate-50 text-slate-700 rounded-xl border border-slate-100 inline-block mb-5 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {feat.desc}
                  </p>
                </div>
                <a
                  href={feat.link}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 self-start"
                >
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full pb-20 px-6 sm:px-12 md:px-24 lg:px-32">
        <div className="max-w-5xl mx-auto bg-linear-to-br from-blue-700 to-blue-600 rounded-2xl p-8 shadow-md text-white grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3 space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Looking for specific national trends?
            </h2>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed">
              Read through our analytical breakdowns, documentation sources, and
              platform mission goals on our updated documentation page.
            </p>
          </div>
          <div className="md:col-span-2 flex justify-end w-full">
            <a
              href="/about"
              className="inline-flex items-center justify-center bg-white text-slate-900 font-semibold px-6 py-3.5 rounded-xl shadow-xs hover:bg-blue-50 transition-colors w-full sm:w-auto text-center"
            >
              Learn About Our Mission
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
