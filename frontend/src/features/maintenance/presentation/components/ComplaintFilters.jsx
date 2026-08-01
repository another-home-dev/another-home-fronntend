import { useState } from "react";
import { Search, RotateCcw, Calendar } from "lucide-react";
import { Card } from "@shared/components/Card";
import Input from "@shared/components/Input";
import Select from "@shared/components/Select";
import Button from "@shared/components/Button";
import { CATEGORIES, PRIORITIES, STATUSES } from "@features/maintenance/infrastructure/mockComplaints";

export default function ComplaintFilters({ filters, onChange, onReset }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleReset = () => {
    setDateFrom("");
    setDateTo("");
    onReset();
  };

  return (
    <Card className="mb-6 p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <Input
          containerClassName="lg:col-span-2 xl:col-span-2"
          icon={Search}
          placeholder="Search by ID, student or room"
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
        />

        <Select value={filters.status} onChange={(event) => onChange({ status: event.target.value })}>
          <option value="All">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>

        <Select value={filters.priority} onChange={(event) => onChange({ priority: event.target.value })}>
          <option value="All">All priorities</option>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </Select>

        <Select value={filters.category} onChange={(event) => onChange({ category: event.target.value })}>
          <option value="All">All categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <div className="grid grid-cols-2 gap-2 xl:col-span-1">
          <Input type="date" icon={Calendar} value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} aria-label="From date" />
          <Input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} aria-label="To date" />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <Button variant="outline" size="sm" icon={RotateCcw} onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </Card>
  );
}
