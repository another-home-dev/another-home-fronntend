import { useState } from "react";
import { Building2, KeyRound, UserPlus, PieChart } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import StatCard from "@shared/components/StatCard";
import { Card, CardHeader } from "@shared/components/Card";
import Table from "@shared/components/Table";
import Button from "@shared/components/Button";
import Spinner from "@shared/components/Spinner";
import EmptyState from "@shared/components/EmptyState";
import { assignStudentToRoomUseCase } from "@features/room-allocation/application/assignStudentToRoomUseCase";
import { changeStudentRoomUseCase } from "@features/room-allocation/application/changeStudentRoomUseCase";
import { useRoomAllocationData } from "@features/room-allocation/presentation/hooks/useRoomAllocationData";
import AICompatibilityTeaser from "@features/room-allocation/presentation/components/AICompatibilityTeaser";
import AssignmentModal from "@features/room-allocation/presentation/components/AssignmentModal";

export default function RoomAllocationPage() {
  const { rooms, unallocatedStudents, allocatedStudents, isLoading, refresh } = useRoomAllocationData();
  const [assigning, setAssigning] = useState({ open: false, student: null, mode: "assign" });

  const availableRooms = rooms.filter((room) => room.occupiedBeds < room.capacity);
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalOccupied = rooms.reduce((sum, room) => sum + room.occupiedBeds, 0);
  const occupancyRate = totalCapacity === 0 ? 0 : Math.round((totalOccupied / totalCapacity) * 100);

  const handleAssign = async (room) => {
    if (assigning.mode === "assign") {
      await assignStudentToRoomUseCase(assigning.student, room);
    } else {
      await changeStudentRoomUseCase(assigning.student, room);
    }
    setAssigning({ open: false, student: null, mode: "assign" });
    refresh();
  };

  const roomsForModal = assigning.student
    ? availableRooms.filter(
        (room) => !(room.roomNumber === assigning.student.roomNumber && room.buildingName === assigning.student.buildingName)
      )
    : [];

  const allocationColumns = [
    {
      key: "name",
      header: "Student",
      render: (row) => (
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-800 dark:bg-primary-500/15 dark:text-primary-300">
            {row.initials}
          </span>
          <span className="font-medium text-slate-800 dark:text-slate-200">{row.name}</span>
        </div>
      ),
    },
    { key: "room", header: "Current Room", render: (row) => `${row.roomNumber} · ${row.buildingName}` },
    {
      key: "action",
      header: "",
      render: (row) => (
        <Button size="sm" variant="outline" onClick={() => setAssigning({ open: true, student: row, mode: "reassign" })}>
          Reassign
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Room Allocation" subtitle="Assign students to available rooms and manage allocations" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Rooms" value={rooms.length} icon={Building2} tone="primary" />
        <StatCard label="Available Rooms" value={availableRooms.length} icon={KeyRound} tone="success" />
        <StatCard label="Unallocated Students" value={unallocatedStudents.length} icon={UserPlus} tone="warning" />
        <StatCard label="Occupancy Rate" value={`${occupancyRate}%`} icon={PieChart} tone="info" />
      </div>

      <AICompatibilityTeaser />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader title="Unallocated Students" subtitle="Students waiting to be assigned a room" />
          <div className="max-h-[420px] overflow-y-auto p-4">
            {unallocatedStudents.length === 0 ? (
              <EmptyState message="Every student has a room" />
            ) : (
              <ul className="space-y-2">
                {unallocatedStudents.map((student) => (
                  <li
                    key={student.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-warning-50 text-xs font-semibold text-warning-600 dark:bg-warning-500/15 dark:text-warning-500">
                        {student.initials}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{student.name}</p>
                        <p className="text-xs text-slate-400">{student.studentCode}</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => setAssigning({ open: true, student, mode: "assign" })}>
                      Assign
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="Available Rooms" subtitle="Rooms with free beds right now" />
          <div className="max-h-[420px] overflow-y-auto p-4">
            {availableRooms.length === 0 ? (
              <EmptyState message="No rooms available" />
            ) : (
              <ul className="space-y-2">
                {availableRooms.map((room) => (
                  <li
                    key={room.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 dark:border-slate-800"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        Room {room.roomNumber} · {room.buildingName}
                      </p>
                      <p className="text-xs text-slate-400">{room.floorLabel}</p>
                    </div>
                    <span className="text-sm font-semibold text-success-600 dark:text-success-500">
                      {room.capacity - room.occupiedBeds} bed{room.capacity - room.occupiedBeds === 1 ? "" : "s"} free
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader title="Current Allocations" subtitle="Change a student's room assignment" />
        <Table columns={allocationColumns} data={allocatedStudents} keyField="id" />
      </Card>

      <AssignmentModal
        key={assigning.student?.id ?? "none"}
        open={assigning.open}
        student={assigning.student}
        availableRooms={roomsForModal}
        onClose={() => setAssigning({ open: false, student: null, mode: "assign" })}
        onSubmit={handleAssign}
      />
    </div>
  );
}
