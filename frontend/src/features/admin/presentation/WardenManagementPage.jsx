import { useCallback, useEffect, useState } from "react";
import { Plus as FiPlus } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import Button from "@shared/components/Button";
import { Card } from "@shared/components/Card";
import Table from "@shared/components/Table";
import { getWardensUseCase } from "@features/admin/application/getWardensUseCase";
import { createWardenUseCase } from "@features/admin/application/createWardenUseCase";
import WardenFormModal from "@features/admin/presentation/components/WardenFormModal";

const COLUMNS = [
  { key: "name", header: "Name" },
  { key: "id", header: "Asgardeo User ID" },
];

export default function WardenManagementPage() {
  const [wardens, setWardens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const loadWardens = useCallback(() => {
    setIsLoading(true);
    getWardensUseCase()
      .then(setWardens)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadWardens();
  }, [loadWardens]);

  const handleCreate = async (values) => {
    const warden = await createWardenUseCase(values);
    loadWardens();
    return warden;
  };

  return (
    <div>
      <PageHeader
        title="Wardens"
        subtitle="Add and manage warden accounts"
        action={
          <Button icon={FiPlus} onClick={() => setFormOpen(true)}>
            Add Warden
          </Button>
        }
      />

      <Card className="p-0">
        <Table columns={COLUMNS} data={wardens} loading={isLoading} emptyMessage="No wardens added yet" />
      </Card>

      <WardenFormModal open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleCreate} />
    </div>
  );
}
