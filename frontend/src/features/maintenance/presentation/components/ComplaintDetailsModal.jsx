import { useEffect, useState } from "react";
import { ImageOff, CheckCircle2 } from "lucide-react";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import Spinner from "@shared/components/Spinner";
import StatusBadge from "@features/maintenance/presentation/components/StatusBadge";
import PriorityBadge from "@features/maintenance/presentation/components/PriorityBadge";
import maintenanceRepository from "@features/maintenance/infrastructure/maintenanceRepository";

// Keyed by complaint id at the call site, so its state resets per complaint.
function ComplaintImage({ complaintId, hasImage }) {
  const [state, setState] = useState(hasImage ? { status: "loading" } : { status: "none" });

  useEffect(() => {
    if (!hasImage) return undefined;
    let cancelled = false;
    maintenanceRepository
      .fetchImage(complaintId)
      .then((src) => !cancelled && setState({ status: "loaded", src }))
      .catch(() => !cancelled && setState({ status: "error" }));
    return () => {
      cancelled = true;
    };
  }, [complaintId, hasImage]);

  if (state.status === "loaded") {
    return <img src={state.src} alt="Attached photo of the issue" className="max-h-72 w-full rounded-xl bg-slate-100 object-contain dark:bg-slate-800" />;
  }

  return (
    <div className="flex h-24 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 text-slate-400 dark:border-slate-700">
      {state.status === "loading" ? (
        <Spinner size={18} />
      ) : (
        <>
          <ImageOff size={18} />
          <span className="text-sm">{state.status === "error" ? "Couldn't load the attached image" : "No images attached"}</span>
        </>
      )}
    </div>
  );
}

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
        <ComplaintImage key={complaint.id} complaintId={complaint.id} hasImage={complaint.hasImage} />
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
