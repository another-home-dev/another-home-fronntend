import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@shared/components/PageHeader";
import Button from "@shared/components/Button";
import Spinner from "@shared/components/Spinner";
import EmptyState from "@shared/components/EmptyState";
import ConfirmDialog from "@shared/components/ConfirmDialog";
import { useAnnouncements } from "@features/announcements/presentation/hooks/useAnnouncements";
import { createAnnouncementUseCase, updateAnnouncementUseCase, deleteAnnouncementUseCase } from "@features/announcements/application/manageAnnouncementUseCase";
import AnnouncementCard from "@features/announcements/presentation/components/AnnouncementCard";
import AnnouncementFormModal from "@features/announcements/presentation/components/AnnouncementFormModal";

export default function AnnouncementManagementPage() {
  const { announcements, isLoading, refresh } = useAnnouncements();
  const [formState, setFormState] = useState({ open: false, announcement: null });
  const [deletingAnnouncement, setDeletingAnnouncement] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (values) => {
    if (formState.announcement) {
      await updateAnnouncementUseCase(formState.announcement.id, values);
    } else {
      await createAnnouncementUseCase(values);
    }
    setFormState({ open: false, announcement: null });
    refresh();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteAnnouncementUseCase(deletingAnnouncement.id);
    setIsDeleting(false);
    setDeletingAnnouncement(null);
    refresh();
  };

  return (
    <div>
      <PageHeader
        title="Announcements"
        subtitle="Publish notices for students"
        action={
          <Button icon={FiPlus} onClick={() => setFormState({ open: true, announcement: null })}>
            New Announcement
          </Button>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Spinner size={32} />
        </div>
      ) : announcements.length === 0 ? (
        <EmptyState message="No announcements yet" description="Publish your first announcement to notify students" />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onEdit={(item) => setFormState({ open: true, announcement: item })}
              onDelete={setDeletingAnnouncement}
            />
          ))}
        </div>
      )}

      <AnnouncementFormModal
        key={formState.open ? (formState.announcement?.id ?? "new") : "closed"}
        open={formState.open}
        announcement={formState.announcement}
        onClose={() => setFormState({ open: false, announcement: null })}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(deletingAnnouncement)}
        onClose={() => setDeletingAnnouncement(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete announcement"
        confirmLabel="Delete"
        description={`Are you sure you want to delete "${deletingAnnouncement?.title}"? This cannot be undone.`}
      />
    </div>
  );
}
