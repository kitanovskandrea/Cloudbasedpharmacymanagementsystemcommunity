import { useState } from 'react';
import { Building2, MapPin, Phone, Users } from 'lucide-react';

type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  status: 'active' | 'inactive';
  employees: number;
  inventory: number;
  salesThisMonth: number;
  lastSync: string;
};

export function BranchManagement({ user }: { user: any }) {
  const [branches] = useState<Branch[]>([
    {
      id: 'BR-001',
      name: 'My Branch',
      address: 'Goriska ulica 23',
      phone: '+386 (55) 100-0001',
      manager: 'Jasna Skufca',
      status: 'active',
      employees: 12,
      inventory: 3847,
      salesThisMonth: 145890,
      lastSync: '2026-05-25T11:30:00'
    },
    {
      id: 'BR-002',
      name: 'Pharmacy Titov Trg',
      address: 'Titov Trg ST 12346',
      phone: '+386 (54) 100-0002',
      manager: 'Patrik Boncin',
      status: 'active',
      employees: 8,
      inventory: 2156,
      salesThisMonth: 98450,
      lastSync: '2026-05-25T11:28:00'
    },
    {
      id: 'BR-003',
      name: 'Pharmacy Taverna',
      address: 'Kidriceva ulica 12',
      phone: '+386 (45) 100-0003',
      manager: 'Emilija Davidovska',
      status: 'active',
      employees: 6,
      inventory: 1823,
      salesThisMonth: 76230,
      lastSync: '2026-05-25T11:25:00'
    },
    {
      id: 'BR-004',
      name: 'Pharmacy Planet Koper',
      address: 'Berneticeva ulica 12',
      phone: '+386 (35) 100-0004',
      manager: 'Robert Moris',
      status: 'active',
      employees: 10,
      inventory: 2943,
      salesThisMonth: 112340,
      lastSync: '2026-05-25T11:32:00'
    }
  ]);

  const totalSales = branches.reduce((sum, b) => sum + b.salesThisMonth, 0);
  const totalEmployees = branches.reduce((sum, b) => sum + b.employees, 0);
  const totalInventory = branches.reduce((sum, b) => sum + b.inventory, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatLastSync = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Synchronize pharmacy branches </h1>
        
      </div>

      {/* Network Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Branches</p>
              <p className="text-xl">{branches.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Sales (Month)</p>
              <p className="text-xl">{formatCurrency(totalSales)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-xl">{totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Inventory</p>
              <p className="text-xl">{totalInventory.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1">{branch.name}</h3>
                  <p className="text-sm text-gray-600">{branch.id}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                branch.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {branch.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-600">{branch.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">{branch.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">Manager: {branch.manager}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg mb-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Employees</p>
                <p className="text-gray-900">{branch.employees}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Inventory</p>
                <p className="text-gray-900">{branch.inventory.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Sales (Month)</p>
                <p className="text-gray-900">{formatCurrency(branch.salesThisMonth / 1000)}k</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Last sync: {formatLastSync(branch.lastSync)}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Sync Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="mb-4">Real-Time Synchronization Status</h2>
        <div className="space-y-3">
          {branches.map((branch) => (
            <div key={branch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-gray-900">{branch.name}</p>
                  <p className="text-xs text-gray-600">Database synchronized</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">{formatLastSync(branch.lastSync)}</p>
                <p className="text-xs text-gray-600">All systems operational</p>
              </div>
            </div>
          ))}
        </div>
    
      </div>
    </div>
  );
}
