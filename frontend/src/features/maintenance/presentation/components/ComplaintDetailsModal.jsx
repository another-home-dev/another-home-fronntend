import { ImageOff, CheckCircle2 } from "lucide-react";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import StatusBadge from "@features/maintenance/presentation/components/StatusBadge";
import PriorityBadge from "@features/maintenance/presentation/components/PriorityBadge";

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">{value}</p>
    </div>
  );
}

export default function ComplaintDetailsModal({ open, complaint, onClose, onResolve, isResolving }) {
  if (!complaint) return null;

  const isResolved = complaint.status === "Resolved";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={complaint.id}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            icon={CheckCircle2}
            disabled={isResolved || isResolving}
            loading={isResolving}
            onClick={() => onResolve?.(complaint.id)}
          >
            {isResolved ? "Resolved" : "Mark as Resolved"}
          </Button>
        </>
      }
    >
      <div className="mb-5 flex items-center gap-2">
        <StatusBadge status={complaint.status} />
        <PriorityBadge priority={complaint.priority} />
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
        <Field label="Student" value={complaint.studentName} />
        <Field label="Room" value={`${complaint.roomNumber} · ${complaint.buildingName}`} />
        <Field label="Category" value={complaint.category} />
        <Field label="Assigned Staff" value={complaint.assignedStaff} />
        <Field label="Submitted Date" value={complaint.submittedDate} />
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Description</p>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{complaint.description}</p>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Attached Images</p>
        <div className="flex h-24 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 text-slate-400 dark:border-slate-700">
          <ImageOff size={18} />
          <span className="text-sm">No images attached</span>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">Timeline</p>
        <ol className="space-y-3 border-l border-slate-200 pl-4 dark:border-slate-700">
          {complaint.timeline.map((event, index) => (
            <li key={index} className="relative">
              <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary-700 dark:border-slate-900 dark:bg-primary-500" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{event.label}</p>
              <p className="text-xs text-slate-400">{event.date}</p>
            </li>
          ))}
        </ol>
      </div>
    </Modal>
  );
}
