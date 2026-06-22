import {
  Users,
  Coins,
  HeartPulse,
  Sprout,
  Building2,
  Database,
  Mail,
  Globe,
  FileText,
  Check,
  ExternalLink,
  Copy,
  ArrowDown,
} from "lucide-react"; // Minimal modern icon set
import { useState } from "react";

export default function About() {
  const [copied, setCopied] = useState(false);
  const pillars = [
    {
      icon: Users,
      label: "Population",
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      icon: Coins,
      label: "Economy",
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      icon: HeartPulse,
      label: "Health",
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
    {
      icon: Sprout,
      label: "Agriculture",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      icon: Building2,
      label: "Infrastructure",
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];
  return (
    <main className="w-full min-h-screen bg-slate-50 py-12 px-6 sm:px-12 md:px-24 lg:px-32 font-sans selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            About Nepal Data Explorer
          </h1>
          <p className="mt-2 text-slate-500 text-lg">
            Empowering progress through open, accessible, and interactive public
            information.
          </p>
        </div>

        <section className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-slate-200/80 transition-all hover:shadow-md hover:border-slate-300">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                Our Mission
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed text-base md:text-lg">
                We aim to centralize and visualize Nepal's public data to
                empower citizens, researchers, and policymakers with accessible
                information. By lowering the technical barrier to national data,
                we foster data-driven discussions and transparency.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-slate-200/80 transition-all">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl mb-2">
            What we do
          </h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-8">
            Collect and process key national data, including Population,
            Economy, Health, Agriculture, and Infrastructure datasets,
            presenting them in user-friendly dashboards and interactive charts.
          </p>

          <div className="bg-slate-50/70 rounded-2xl p-6 md:p-8 border border-slate-100 relative overflow-hidden">
            <div className="hidden md:flex flex-col items-center relative w-full">
              <div className="grid grid-cols-5 gap-4 w-full relative z-10">
                {pillars.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center bg-white p-4 rounded-xl border border-slate-200 shadow-2xs"
                  >
                    <div
                      className={`p-2.5 rounded-lg border ${item.color} mb-2.5`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 tracking-wide uppercase text-center block max-w-full truncate">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-full h-16 relative my-2">
                <svg
                  className="w-full h-full stroke-slate-300 fill-none"
                  viewBox="0 0 500 60"
                  preserveAspectRatio="none"
                >
                  <path d="M 50 0 L 250 50" strokeDasharray="4 4" />
                  <path d="M 150 0 L 250 50" strokeDasharray="4 4" />
                  <path d="M 250 0 L 250 50" strokeDasharray="4 4" />
                  <path d="M 350 0 L 250 50" strokeDasharray="4 4" />
                  <path d="M 450 0 L 250 50" strokeDasharray="4 4" />
                </svg>
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 bg-blue-600 p-1 rounded-full text-white shadow-xs">
                  <ArrowDown className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="flex md:hidden flex-col items-center space-y-4">
              <div className="grid grid-cols-2 gap-3 w-full">
                {pillars.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-2xs ${
                      idx === 4 ? "col-span-2 justify-center" : ""
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg border ${item.color} shrink-0`}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 tracking-wider uppercase">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center py-2">
                <div className="w-px h-8 border-r-2 border-dashed border-slate-300"></div>
                <div className="bg-blue-600 p-1.5 rounded-full text-white shadow-xs my-1 animate-bounce">
                  <ArrowDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-2 relative z-10">
              <div className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-md border border-blue-700 flex items-center gap-3 max-w-sm w-full justify-center transform hover:scale-[1.02] transition-transform duration-200">
                <div className="p-2 bg-blue-700 rounded-lg text-blue-100 shadow-inner">
                  <Database className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
                    Central Hub
                  </span>
                  <span className="text-base font-bold tracking-wide block">
                    Unified Data Hub
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-slate-200/80 transition-all hover:shadow-md hover:border-slate-300">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl mb-3">
            Data Sourcing & Sincerity
          </h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6">
            Data is sourced directly from official Nepal government publications
            (e.g., Central Bureau of Statistics) and relevant trusted
            international organizations.
          </p>

          {/* Trusted Sourcing Badges / Layout Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200/60 rounded-lg">
              <div className="p-2 bg-white rounded shadow-2xs text-slate-700">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  National Statistics Office
                </p>
                <p className="text-xs text-slate-500">
                  Government of Nepal Publications
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200/60 rounded-lg">
              <div className="p-2 bg-white rounded shadow-2xs text-slate-700">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  International Agencies
                </p>
                <p className="text-xs text-slate-500">
                  Validated Global Datasets & Metadata
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl p-6 md:p-8 shadow-md text-white w-full overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center w-full">
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold md:text-2xl">Get in Touch</h2>
              <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed">
                Have questions regarding our data collection methodologies, or
                want to contribute a clean public dataset? Reach out to our team
                directly.
              </p>
            </div>

            <div className="lg:col-span-2 flex flex-col sm:flex-row lg:flex-col xl:flex-col gap-3 w-full justify-end items-stretch sm:items-center lg:items-stretch">
              <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700 rounded-lg p-3 w-full min-w-0 group">
                <div className="flex items-center gap-2 overflow-hidden min-w-0 w-full">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-sm font-mono truncate select-all text-slate-200 block w-full">
                    sdipen127@gmail.com
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("sdipen127@gmail.com");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="ml-2 p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
                  title="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <a
                href="https://github.com/DipenShrestha7/nepal-public-data/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-sm transition-colors w-full sm:w-auto lg:w-full h-11 group shrink-0"
              >
                <span className="truncate mr-2">Open Issue on GitHub</span>
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
