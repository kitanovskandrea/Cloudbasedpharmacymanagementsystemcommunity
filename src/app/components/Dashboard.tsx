import {
  TrendingUp,
  TrendingDown,
  Package,
  FileText,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  role: string;
  branch: string;
};

type DashboardProps = {
  user: User;
};

export function Dashboard({ user }: DashboardProps) {
  const stats = [
    {
      label: "Items in Stock",
      value: "3,847",

      icon: Package,
      color: "purple",
    },
    {
      label: "Expiring Soon (30 days)",
      value: "23",
      icon: AlertTriangle,
      color: "orange",
    },
  ];

  const lowStockItems = [
    {
      name: "Amoxicillin 500mg",
      quantity: 45,
      reorderLevel: 100,
      status: "low",
    },
    {
      name: "Lisinopril 10mg",
      quantity: 22,
      reorderLevel: 50,
      status: "critical",
    },
    {
      name: "Metformin 850mg",
      quantity: 78,
      reorderLevel: 100,
      status: "low",
    },
    {
      name: "Atorvastatin 20mg",
      quantity: 15,
      reorderLevel: 75,
      status: "critical",
    },
  ];

  const expiringItems = [
    {
      name: "Ibuprofen 400mg",
      batch: "BT-2024-A45",
      expiry: "2026-12-15",
      days: 314,
    },
    {
      name: "Paracetamol 500mg",
      batch: "BT-2024-B12",
      expiry: "2027-12-28",
      days: 427,
    },
    {
      name: "Cetirizine 10mg",
      batch: "BT-2024-C89",
      expiry: "2028-01-05",
      days: 535,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            purple: "bg-purple-50 text-purple-600",
            orange: "bg-orange-50 text-orange-600",
          };

          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {stat.trending === "down" && (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  {stat.trending === "warning" && (
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  )}
                  <span
                    className={
                      stat.trending === "up"
                        ? "text-green-600"
                        : stat.trending === "down"
                          ? "text-red-600"
                          : "text-orange-600"
                    }
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <p className="text-3xl mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Prescriptions */}

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4">Low Stock Alerts</h2>
          <div className="space-y-3">
            {lowStockItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-900">{item.name}</p>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.status === "critical"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.status === "critical"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                      style={{
                        width: `${(item.quantity / item.reorderLevel) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {item.quantity}/{item.reorderLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            View Full Inventory
          </button>
        </div>
      </div>

      {/* Expiring Items */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="mb-4">Items Expiring Soon</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">
                  Product Name
                </th>
                <th className="text-left py-3 px-4 text-gray-600">
                  Batch Number
                </th>
                <th className="text-left py-3 px-4 text-gray-600">
                  Expiry Date
                </th>
                <th className="text-left py-3 px-4 text-gray-600">
                  Days Remaining
                </th>
                <th className="text-left py-3 px-4 text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {expiringItems.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100"
                >
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.batch}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.expiry}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        item.days <= 15
                          ? "bg-red-100 text-red-800"
                          : item.days <= 30
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.days} days
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}