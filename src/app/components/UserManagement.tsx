import { useState } from "react";
import {
  Search,
  Plus,
  User,
  Mail,
  Shield,
  Building2,
  Edit,
  Trash2,
} from "lucide-react";

type SystemUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor" | "pharmacist";
  branch: string;
  status: "active" | "inactive";
  lastLogin: string;
  createdAt: string;
};

export function UserManagement({ user }: { user: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@cloudpharm.com",
      role: "admin",
      branch: "All Branches",
      status: "active",
      lastLogin: "2024-12-01T11:30:00",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Lea Zajkov",
      email: "lea.zajkov@cloudpharm.com",
      role: "pharmacist",
      branch: "Main Branch",
      status: "active",
      lastLogin: "2024-12-01T10:15:00",
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      name: "Vangjel Markovski",
      email: "vangjel.markovski@cloudpharm.com",
      role: "doctor",
      branch: "Downtown Branch",
      status: "active",
      lastLogin: "2024-12-01T09:45:00",
      createdAt: "2024-03-10",
    },
  ]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      u.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      u.branch
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesRole =
      filterRole === "all" || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800",
      doctor: "bg-blue-100 text-blue-800",
      pharmacist: "bg-green-100 text-green-800",
      //staff: "bg-gray-100 text-gray-800",
    };
    return (
      colors[role as keyof typeof colors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  const formatLastLogin = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const rolePermissions = {
    admin: [
      "Full system access",
      "User management",
      "Branch management",
      "System settings",
      "All inventory operations",
      "Financial reports",
    ],
    doctor: [
      "Branch operations",
      "Inventory management",
      "Staff scheduling",
      "Sales reports",
      "Prescription management",
      "Patient records",
    ],
    pharmacist: [
      "Prescription fulfillment",
      "Patient counseling",
      "Inventory viewing",
      "Sales processing",
      "Patient records access",
    ],
    /*staff: [
      "Sales processing",
      "Basic inventory viewing",
      "Customer service",
      "Stock assistance",
    ],*/
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1> Manage roles</h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Total Users
              </p>
              <p className="text-xl">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Active Users
              </p>
              <p className="text-xl">
                {
                  users.filter((u) => u.status === "active")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Admins</p>
              <p className="text-xl">
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <User className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Pharmacists
              </p>
              <p className="text-xl">
                {
                  users.filter((u) => u.role === "pharmacist")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or branch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacist">Pharmacist</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600">
                  User
                </th>
                <th className="text-left py-3 px-4 text-gray-600">
                  Role
                </th>

                <th className="text-left py-3 px-4 text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-gray-600">
                  Last Login
                </th>
                <th className="text-left py-3 px-4 text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((systemUser) => (
                <tr
                  key={systemUser.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-900">
                          {systemUser.name}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          <span>{systemUser.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span
                        className={`px-2 py-1 rounded text-xs ${getRoleBadgeColor(systemUser.role)}`}
                      >
                        {systemUser.role}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        systemUser.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {systemUser.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {formatLastLogin(systemUser.lastLogin)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Reference */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="mb-4">Role-Based Access Control</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(rolePermissions).map(
            ([role, permissions]) => (
              <div
                key={role}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <h3 className="text-sm capitalize">{role}</h3>
                </div>
                <ul className="space-y-2">
                  {permissions.map((permission, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-green-500 mt-0.5">
                        ✓
                      </span>
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="mb-4">Add New User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Role
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="pharmacist">Pharmacist</option>
                  <option value="do">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter temporary password"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("User created successfully!");
                  setShowAddModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}