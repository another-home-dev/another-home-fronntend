import { FiEdit2, FiTrash2, FiUser } from "react-icons/fi";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";
import Badge from "@shared/components/Badge";
import EmptyState from "@shared/components/EmptyState";

export default function RoomDetailsModal({ open, onClose, room, onEdit, onDelete }) {
  if (!room) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Room ${room.roomNumber}`}
      footer={
        <>
          <Button variant="outline" icon={FiTrash2} onClick={() => onDelete(room)}>
            Delete
          </Button>
          <Button icon={FiEdit2} onClick={() => onEdit(room)}>
            Edit room
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-3 gap-4 rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-800">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Capacity</p>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{room.capacity}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Occupied</p>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{room.occupiedBeds}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Available</p>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{room.availableBeds}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Assigned students</h4>
          <Badge tone="neutral">{room.assignedStudents.length}</Badge>
        </div>

        {room.assignedStudents.length === 0 ? (
          <EmptyState icon={FiUser} message="No students assigned yet" />
        ) : (
          <ul className="space-y-2">
            {room.assignedStudents.map((student) => (
              <li key={student.id} className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5 dark:border-slate-800">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-800 dark:bg-primary-500/15 dark:text-primary-300">
                  {student.name.charAt(0)}
                </span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{student.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
