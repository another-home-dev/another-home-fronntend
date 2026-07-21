import { motion } from "framer-motion";
import hostelImage from "@shared/assets/hostel.png";
import BrandMark from "@shared/components/BrandMark";
import ThemeToggle from "@shared/components/ThemeToggle";

const HIGHLIGHTS = [
  "Real-time room occupancy tracking",
  "Digital maintenance & visitor workflows",
  "Automated fee collection insights",
];

const STATS = [
  { value: "3", label: "Buildings" },
  { value: "428", label: "Students" },
  { value: "87%", label: "Occupancy" },
];

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen bg-surface md:grid-cols-2">
      <ThemeToggle className="fixed right-5 top-5 z-20 bg-white/70 backdrop-blur dark:bg-slate-800/70" />

      <div className="relative hidden flex-col justify-between overflow-hidden p-12 text-white md:flex lg:p-16">
        <img src={hostelImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-900/80 to-primary-800/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_45%)]" />

        <motion.div
          animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative flex items-center gap-3">
          <BrandMark size={48} variant="glass" />
          <span className="text-xl font-bold tracking-tight">Another Home</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-xl"
        >
          <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
            Smart Hostel &amp; Boarding Management Platform
          </h1>
          <p className="mt-4 text-base text-primary-100">
            One dashboard for occupancy, maintenance, visitors and payments — built for modern hostel administration.
          </p>

          <ul className="mt-8 space-y-3.5">
            {HIGHLIGHTS.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
                className="flex items-center gap-2.5 text-sm text-primary-50"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success-400" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative flex max-w-md items-center justify-between rounded-2xl bg-white/10 p-5 backdrop-blur-md ring-1 ring-white/20"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-primary-100">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden bg-background p-6 sm:p-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-700/15"
          />
          <motion.div
            animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-success-200/30 blur-3xl dark:bg-success-700/10"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-md rounded-3xl bg-surface p-8 shadow-xl ring-1 ring-black/5 sm:p-10 dark:ring-white/10"
        >
          <div className="mb-8 flex items-center gap-3 md:hidden">
            <BrandMark size={36} />
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Another Home</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>
          <p className="mt-2 mb-8 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
