import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiBarChart2, FiCloud, FiDroplet, FiWind } from "react-icons/fi";
import hostelImage from "@shared/assets/hostel.png";
import Sparkline from "@shared/components/Sparkline";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardHero({ adminName, buildingOccupancy }) {
  const navigate = useNavigate();

  return (
    <div className="relative mb-6 overflow-hidden rounded-3xl text-white shadow-[var(--shadow-card)]">
      <img src={hostelImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-900/85 to-primary-800/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(59,130,246,0.25),transparent_50%)]" />

      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-primary-400/20 blur-3xl"
      />

      <div className="relative flex flex-col gap-8 p-8 lg:flex-row lg:items-start lg:justify-between lg:p-10">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-primary-200">{getGreeting()}, {adminName}! 👋</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            Welcome back to <span className="text-primary-300">Another Home</span>
          </h1>
          <p className="mt-3 text-sm text-primary-100 sm:text-base">
            Manage your hostel operations, monitor real-time activities, and provide the best experience for your students.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => document.getElementById("dashboard-stats")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary-900 transition-transform hover:-translate-y-0.5"
            >
              Explore Dashboard
              <FiArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigate("/reports")}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/15"
            >
              View Reports
              <FiBarChart2 size={16} />
            </button>
          </div>
        </div>

        <div className="hidden shrink-0 rounded-2xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20 lg:block">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <FiCloud size={22} />
            </span>
            <div>
              <p className="text-xs text-primary-100">Colombo, Sri Lanka</p>
              <p className="text-xl font-bold">28°C</p>
              <p className="text-xs text-primary-100">Partly Cloudy</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-3 text-xs text-primary-100">
            <span className="flex items-center gap-1.5">
              <FiDroplet size={13} />
              Humidity 78%
            </span>
            <span className="flex items-center gap-1.5">
              <FiWind size={13} />
              12 km/h
            </span>
          </div>
        </div>
      </div>

      {buildingOccupancy.length > 0 && (
        <div className="relative hidden grid-cols-3 gap-4 border-t border-white/10 bg-black/10 p-6 backdrop-blur-sm md:grid">
          {buildingOccupancy.slice(0, 3).map((building, index) => (
            <motion.div
              key={building.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
              className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15"
            >
              <div>
                <p className="text-xs font-medium text-primary-100">{building.name}</p>
                <p className="text-base font-bold">{building.occupancyRate}% Occupancy</p>
              </div>
              <Sparkline data={building.trend} color="#4ade80" width={64} height={24} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
