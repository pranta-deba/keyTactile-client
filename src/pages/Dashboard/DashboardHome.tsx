import { Card, CardContent } from "@/components/ui/card";
import { useGetStatsQuery } from "@/redux/features/stat/statApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DashboardHome = () => {
  const { data, isLoading, error } = useGetStatsQuery(undefined);
  const stats = data?.data || {
    totalOrders: 0,
    newOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalEarnings: 0,
  };

  const chartData = [
    { name: "Orders", value: stats.totalOrders },
    { name: "New Orders", value: stats.newOrders },
    { name: "Users", value: stats.totalUsers },
    { name: "Products", value: stats.totalProducts },
    { name: "Earnings", value: stats.totalEarnings },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {isLoading ? (
        <div className="min-h-[calc(100vh-400px)] flex justify-center items-center">
          <p className="text-center text-gray-500">Loading stats...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load stats</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard title="Total Orders" value={stats.totalOrders} />
            <StatCard title="New Orders" value={stats.newOrders} />
            <StatCard title="Total Users" value={stats.totalUsers} />
            <StatCard title="Total Products" value={stats.totalProducts} />
            <StatCard
              title="Total Earnings"
              value={`$${stats.totalEarnings}`}
            />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Overview Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#0F3460" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) => (
  <Card className="rounded-xl shadow-sm">
    <CardContent className="p-4 space-y-1">
      <h3 className="text-sm text-muted-foreground">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

export default DashboardHome;
