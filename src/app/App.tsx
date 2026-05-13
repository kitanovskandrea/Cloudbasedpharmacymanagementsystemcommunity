import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { InventoryManagement } from "./components/InventoryManagement";
import { PrescriptionManagement } from "./components/PrescriptionManagement";
import { SalesDispensing } from "./components/SalesDispensing";
import { PatientRecords } from "./components/PatientRecords";
import { BranchManagement } from "./components/BranchManagement";
import { UserManagement } from "./components/UserManagement";
import { Login } from "./components/Login";
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Building2,
  UserCog,
  LogOut,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "pharmacist" | "doctor";
  branch: string;
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  const hasAccess = (requiredRoles: string[]) => {
    return requiredRoles.includes(currentUser.role);
  };

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      roles: ["doctor", "pharmacist"],
    },
    {
      id: "inventory",
      label: "Manage Inventory",
      icon: Package,
      roles: ["pharmacist"],
    },
    {
      id: "prescriptions",
      label: "E-Prescriptions",
      icon: FileText,
      roles: ["doctor", "pharmacist"],
    },
    {
      id: "patients",
      label: "Patient Information",
      icon: Users,
      roles: ["doctor", "pharmacist"],
    },
    {
      id: "branches",
      label: "Synchronize pharmacy branches ",
      icon: Building2,
      roles: ["admin"],
    },
    {
      id: "users",
      label: "Manage roles",
      icon: UserCog,
      roles: ["admin"],
    },
  ];

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab("dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <p className="text-blue-600">
            Cloud-based Pharmacy Management System
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            if (!hasAccess(item.roles)) return null;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "dashboard" && (
            <Dashboard user={currentUser} />
          )}
          {activeTab === "inventory" && (
            <InventoryManagement user={currentUser} />
          )}
          {activeTab === "prescriptions" && (
            <PrescriptionManagement user={currentUser} />
          )}
          {activeTab === "sales" && (
            <SalesDispensing user={currentUser} />
          )}
          {activeTab === "patients" && (
            <PatientRecords user={currentUser} />
          )}
          {activeTab === "branches" && (
            <BranchManagement user={currentUser} />
          )}
          {activeTab === "users" && (
            <UserManagement user={currentUser} />
          )}
        </div>
      </main>
    </div>
  );
}