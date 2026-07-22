import { Card, CardHeader, CardBody } from "@shared/components/Card";
import Spinner from "@shared/components/Spinner";
import { useAuthStore } from "@features/authentication/application/useAuthStore";
import { useDashboardData } from "@features/dashboard/presentation/hooks/useDashboardData";
import DashboardHero from "@features/dashboard/presentation/components/DashboardHero";
import SummaryCardsGrid from "@features/dashboard/presentation/components/SummaryCardsGrid";
import QuickActionsRow from "@features/dashboard/presentation/components/QuickActionsRow";
import PaymentTrendChart from "@features/dashboard/presentation/components/PaymentTrendChart";
import OccupancyChart from "@features/dashboard/presentation/components/OccupancyChart";
import MaintenanceChart from "@features/dashboard/presentation/components/MaintenanceChart";
import RecentActivityFeed from "@features/dashboard/presentation/components/RecentActivityFeed";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { metrics, insights, buildingOccupancy, isLoading } = useDashboardData();

  if (isLoading || !metrics || !insights) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div>
      <DashboardHero adminName={user?.name ?? "Admin"} buildingOccupancy={buildingOccupancy} />

      <div id="dashboard-stats" className="scroll-mt-6">
        <SummaryCardsGrid metrics={metrics} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Monthly Payment Statistics" subtitle="Collected vs. pending fees" />
          <CardBody>
            <PaymentTrendChart data={insights.paymentTrend} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Room Occupancy" subtitle="Current bed allocation" />
          <CardBody>
            <OccupancyChart data={insights.occupancyBreakdown} />
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Maintenance Requests" subtitle="Status breakdown by category" />
          <CardBody>
            <MaintenanceChart data={insights.maintenanceStats} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent Activity" subtitle="Latest updates across the hostel" />
          <CardBody>
            <RecentActivityFeed activities={insights.recentActivity} />
          </CardBody>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-base font-semibold text-slate-800 dark:text-slate-100">Quick Actions</h2>
        <QuickActionsRow />
      </div>
    </div>
  );
}
