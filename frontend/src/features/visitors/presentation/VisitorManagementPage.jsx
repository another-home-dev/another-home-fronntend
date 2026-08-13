import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, Clock, CircleCheck, CircleX, Calendar, History } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import StatCard from "@shared/components/StatCard";
import { Card, CardHeader } from "@shared/components/Card";
import Button from "@shared/components/Button";
import Spinner from "@shared/components/Spinner";
import EmptyState from "@shared/components/EmptyState";
import ConfirmDialog from "@shared/components/ConfirmDialog";
import { useVisitorRequests } from "@features/visitors/presentation/hooks/useVisitorRequests";
import { approveVisitorRequestUseCase, rejectVisitorRequestUseCase } from "@features/visitors/application/reviewVisitorRequestUseCase";

export default function VisitorManagementPage() {
  const navigate = useNavigate();
  const { requests, isLoading, setRequests } = useVisitorRequests();
  const [rejectingId, setRejectingId] = useState(null);

  const pendingRequests = requests.filter((request) => request.status === "Pending");

  const handleApprove = async (id) => {
    setRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item)));
    await approveVisitorRequestUseCase(id);
  };

  const handleReject = async () => {
    const id = rejectingId;
    setRejectingId(null);
    setRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status: "Rejected" } : item)));
    await rejectVisitorRequestUseCase(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Visitor Management"
        subtitle="Review and manage hostel visitor requests"
        action={
          <Button variant="outline" icon={History} onClick={() => navigate("/visitors/history")}>
            Visitor History
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Requests" value={requests.length} icon={UserCheck} tone="primary" />
        <StatCard label="Pending" value={pendingRequests.length} icon={Clock} tone="warning" />
        <StatCard label="Approved" value={requests.filter((r) => r.status === "Approved").length} icon={CircleCheck} tone="success" />
        <StatCard label="Rejected" value={requests.filter((r) => r.status === "Rejected").length} icon={CircleX} tone="danger" />
      </div>

      <Card className="mb-6">
        <CardHeader title="Pending Requests" subtitle="Approve or reject incoming visitor requests" />
        <div className="p-4">
          {pendingRequests.length === 0 ? (
            <EmptyState message="No pending visitor requests" />
          ) : (
            <ul className="space-y-3">
              {pendingRequests.map((request) => (
                <li
                  key={request.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {request.visitorName} <span className="font-normal text-slate-400">visiting</span> {request.studentName}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      Room {request.roomNumber} · {request.purpose}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={12} />
                      {request.date} at {request.time}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setRejectingId(request.id)}>
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => handleApprove(request.id)}>
                      Approve
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <ConfirmDialog
        open={Boolean(rejectingId)}
        onClose={() => setRejectingId(null)}
        onConfirm={handleReject}
        title="Reject visitor request"
        confirmLabel="Reject"
        description="Are you sure you want to reject this visitor request?"
      />
    </div>
  );
}
