import { Download, DollarSign, Users, PieChart, TriangleAlert } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import StatCard from "@shared/components/StatCard";
import { Card, CardHeader, CardBody } from "@shared/components/Card";
import Button from "@shared/components/Button";
import Spinner from "@shared/components/Spinner";
import { useReportsOverview } from "@features/reports/presentation/hooks/useReportsOverview";
import { exportReportUseCase } from "@features/reports/application/exportReportUseCase";
import RevenueTrendChart from "@features/reports/presentation/components/RevenueTrendChart";
import OccupancyByBuildingChart from "@features/reports/presentation/components/OccupancyByBuildingChart";
import StatusDonutChart from "@features/reports/presentation/components/StatusDonutChart";

const COMPLAINT_COLORS = { Pending: "#f59e0b", "In Progress": "#0ea5e9", Resolved: "#10b981" };
const PAYMENT_COLORS = { Paid: "#10b981", Pending: "#f59e0b", Overdue: "#ef4444" };

export default function ReportsPage() {
  const { overview, isLoading } = useReportsOverview();

  if (isLoading || !overview) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size={32} />
      </div>
    );
  }

  const { summary } = overview;

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Cross-module insights into occupancy, revenue and maintenance"
        action={
          <Button icon={Download} variant="outline" onClick={() => exportReportUseCase(overview.revenueTrend)}>
            Export Report
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={`Rs. ${summary.totalRevenue.toLocaleString()}`} icon={DollarSign} tone="success" />
        <StatCard label="Total Students" value={summary.totalStudents} icon={Users} tone="primary" />
        <StatCard label="Avg. Occupancy" value={`${summary.avgOccupancyRate}%`} icon={PieChart} tone="info" />
        <StatCard label="Open Complaints" value={summary.openComplaints} icon={TriangleAlert} tone="warning" />
      </div>

      <Card className="mb-6">
        <CardHeader title="Revenue Trend" subtitle="Monthly collected, pending and overdue fees" />
        <CardBody>
          <RevenueTrendChart data={overview.revenueTrend} />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Occupancy by Building" subtitle="Current occupancy rate per block" />
          <CardBody>
            <OccupancyByBuildingChart data={overview.occupancyByBuilding} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Complaint Resolution" subtitle="By current status" />
          <CardBody>
            <StatusDonutChart data={overview.complaintsByStatus} colors={COMPLAINT_COLORS} />
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader title="Students by Payment Status" subtitle="Fee collection standing across the hostel" />
        <CardBody>
          <StatusDonutChart data={overview.studentsByPaymentStatus} colors={PAYMENT_COLORS} />
        </CardBody>
      </Card>
    </div>
  );
}
