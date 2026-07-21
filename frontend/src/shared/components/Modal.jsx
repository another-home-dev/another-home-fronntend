import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, title, children, footer }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>

            {footer && <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-800">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
