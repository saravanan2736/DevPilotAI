import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        Developer Dashboard
      </h1>

      <p className="mt-2 text-zinc-400">
        Choose an AI tool and start building.
      </p>
    </DashboardLayout>
  );
}

export default Dashboard;
