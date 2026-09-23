import { useEffect, useState, useCallback } from "react";
import { ChevronRight as FiChevronRight, Plus as FiPlus } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import Button from "@shared/components/Button";
import Spinner from "@shared/components/Spinner";
import EmptyState from "@shared/components/EmptyState";
import ConfirmDialog from "@shared/components/ConfirmDialog";
import { getBuildingsUseCase } from "@features/hostel/application/getBuildingsUseCase";
import { getFloorsUseCase } from "@features/hostel/application/getFloorsUseCase";
import { getRoomsUseCase } from "@features/hostel/application/getRoomsUseCase";
import { createRoomUseCase, updateRoomUseCase, deleteRoomUseCase } from "@features/hostel/application/manageRoomUseCase";
import { createBuildingUseCase } from "@features/hostel/application/createBuildingUseCase";
import BuildingCard from "@features/hostel/presentation/components/BuildingCard";
import FloorCard from "@features/hostel/presentation/components/FloorCard";
import RoomCard from "@features/hostel/presentation/components/RoomCard";
import RoomFormModal from "@features/hostel/presentation/components/RoomFormModal";
import RoomDetailsModal from "@features/hostel/presentation/components/RoomDetailsModal";
import BuildingFormModal from "@features/hostel/presentation/components/BuildingFormModal";

export default function HostelManagementPage() {
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [viewingRoom, setViewingRoom] = useState(null);
  const [formState, setFormState] = useState({ open: false, room: null });
  const [deletingRoom, setDeletingRoom] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [buildingFormOpen, setBuildingFormOpen] = useState(false);

  const loadBuildings = useCallback(() => {
    return getBuildingsUseCase().then((data) => {
      setBuildings(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    loadBuildings();
  }, [loadBuildings]);

  const loadFloors = useCallback((building) => {
    setIsLoading(true);
    getFloorsUseCase(building.id).then((data) => {
      setFloors(data);
      setSelectedBuilding(building);
      setSelectedFloor(null);
      setIsLoading(false);
    });
  }, []);

  const loadRooms = useCallback((floor) => {
    setIsLoading(true);
    getRoomsUseCase(floor.id).then((data) => {
      setRooms(data);
      setSelectedFloor(floor);
      setIsLoading(false);
    });
  }, []);

  const refreshRooms = useCallback(() => {
    if (!selectedFloor) return;
    getRoomsUseCase(selectedFloor.id).then(setRooms);
  }, [selectedFloor]);

  const handleCreateOrUpdate = async (values) => {
    if (formState.room) {
      await updateRoomUseCase(formState.room.id, values);
      setFormState({ open: false, room: null });
      refreshRooms();
    } else {
      await createRoomUseCase({
        ...values,
        buildingId: selectedBuilding.id,
        buildingName: selectedBuilding.name,
        floor: selectedFloor ? selectedFloor.floorNumber : Number(values.floor),
      });
      setFormState({ open: false, room: null });
      if (selectedFloor) {
        refreshRooms();
      } else {
        loadFloors(selectedBuilding);
      }
    }
  };

  const handleCreateBuilding = async (values) => {
    await createBuildingUseCase(values);
    setBuildingFormOpen(false);
    loadBuildings();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteRoomUseCase(deletingRoom.id);
    setIsDeleting(false);
    setDeletingRoom(null);
    setViewingRoom(null);
    refreshRooms();
  };

  return (
    <div>
      <PageHeader
        title="Hostel Management"
        subtitle="Manage buildings, floors and rooms"
        action={
          !selectedBuilding ? (
            <Button icon={FiPlus} onClick={() => setBuildingFormOpen(true)}>
              Add Building
            </Button>
          ) : (
            <Button icon={FiPlus} onClick={() => setFormState({ open: true, room: null })}>
              Add Room
            </Button>
          )
        }
      />

      <nav className="mb-5 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <button
          type="button"
          onClick={() => {
            setSelectedBuilding(null);
            setSelectedFloor(null);
          }}
          className={selectedBuilding ? "hover:text-primary-800 dark:hover:text-primary-400" : "font-semibold text-slate-900 dark:text-slate-100"}
        >
          Buildings
        </button>

        {selectedBuilding && (
          <>
            <FiChevronRight size={14} />
            <button
              type="button"
              onClick={() => setSelectedFloor(null)}
              className={selectedFloor ? "hover:text-primary-800 dark:hover:text-primary-400" : "font-semibold text-slate-900 dark:text-slate-100"}
            >
              {selectedBuilding.name}
            </button>
          </>
        )}

        {selectedFloor && (
          <>
            <FiChevronRight size={14} />
            <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedFloor.label}</span>
          </>
        )}
      </nav>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Spinner size={32} />
        </div>
      ) : !selectedBuilding ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {buildings.map((building) => (
            <BuildingCard key={building.id} building={building} onSelect={loadFloors} />
          ))}
        </div>
      ) : !selectedFloor ? (
        floors.length === 0 ? (
          <EmptyState message="No rooms in this building yet" description="Add the first room to get started" />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {floors.map((floor) => (
              <FloorCard key={floor.id} floor={floor} onSelect={loadRooms} />
            ))}
          </div>
        )
      ) : rooms.length === 0 ? (
        <EmptyState message="No rooms on this floor yet" description="Add the first room to get started" />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onSelect={setViewingRoom} />
          ))}
        </div>
      )}

      <RoomDetailsModal
        open={Boolean(viewingRoom)}
        room={viewingRoom}
        onClose={() => setViewingRoom(null)}
        onEdit={(room) => {
          setViewingRoom(null);
          setFormState({ open: true, room });
        }}
        onDelete={(room) => setDeletingRoom(room)}
      />

      <RoomFormModal
        key={formState.open ? (formState.room?.id ?? "new") : "closed"}
        open={formState.open}
        room={formState.room}
        defaultFloor={selectedFloor?.floorNumber}
        maxFloor={selectedBuilding?.floorCount}
        onClose={() => setFormState({ open: false, room: null })}
        onSubmit={handleCreateOrUpdate}
      />

      <BuildingFormModal
        key={buildingFormOpen ? "open" : "closed"}
        open={buildingFormOpen}
        onClose={() => setBuildingFormOpen(false)}
        onSubmit={handleCreateBuilding}
      />

      <ConfirmDialog
        open={Boolean(deletingRoom)}
        onClose={() => setDeletingRoom(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete room"
        confirmLabel="Delete"
        description={`Are you sure you want to delete Room ${deletingRoom?.roomNumber}? This action cannot be undone.`}
      />
    </div>
  );
}
