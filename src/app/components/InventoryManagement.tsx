import { useState } from 'react';
import { Search, Plus, Filter, Package, AlertCircle, Calendar, Barcode } from 'lucide-react';

type User = {
  id: string;
  name: string;
  role: string;
  branch: string;
};

type InventoryItem = {
  id: string;
  name: string;
  category: string;
  
  quantity: number;
  reorderLevel: number;
  price: number;
  supplier: string;
  batch: string;
  expiryDate: string;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expiring-soon';
};

export function InventoryManagement({ user }: { user: User }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      quantity: 450,
      reorderLevel: 100,
      price: 12.50,
      supplier: 'PharmaCorp Inc.',
      batch: 'BT-2024-A123',
      expiryDate: '2026-06-15',
      location: 'A-12-03',
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Lisinopril 10mg',
      category: 'Cardiovascular',
 
      quantity: 22,
      reorderLevel: 50,
      price: 8.75,
      supplier: 'MediSupply Co.',
      batch: 'BT-2024-B456',
      expiryDate: '2026-08-20',
      location: 'B-05-12',
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'Metformin 850mg',
      category: 'Diabetes',
     
      quantity: 0,
      reorderLevel: 100,
      price: 15.00,
      supplier: 'HealthMeds Ltd.',
      batch: 'BT-2024-C789',
      expiryDate: '2026-04-10',
      location: 'C-08-07',
      status: 'out-of-stock'
    },
    {
      id: '4',
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      quantity: 280,
      reorderLevel: 150,
      price: 6.25,
      supplier: 'PharmaCorp Inc.',
      batch: 'BT-2024-D012',
      expiryDate: '2028-12-15',
      location: 'D-03-15',
      status: 'expiring-soon'
    },
    {
      id: '5',
      name: 'Atorvastatin 20mg',
      category: 'Cardiovascular',
     
      quantity: 15,
      reorderLevel: 75,
      price: 22.50,
      supplier: 'MediSupply Co.',
      batch: 'BT-2024-E345',
      expiryDate: '2027-09-30',
      location: 'A-15-08',
      status: 'low-stock'
    },
    {
      id: '6',
      name: 'Omeprazole 40mg',
      category: 'Gastrointestinal',

      quantity: 320,
      reorderLevel: 100,
      price: 18.00,
      supplier: 'HealthMeds Ltd.',
      batch: 'BT-2024-F678',
      expiryDate: '2026-07-25',
      location: 'B-11-04',
      status: 'in-stock'
    }
  ]);

  const categories = ['all', 'Antibiotics', 'Cardiovascular', 'Diabetes', 'Pain Relief', 'Gastrointestinal'];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      'in-stock': 'bg-green-100 text-green-800',
      'low-stock': 'bg-yellow-100 text-yellow-800',
      'out-of-stock': 'bg-red-100 text-red-800',
      'expiring-soon': 'bg-orange-100 text-orange-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const handleBarcodeImport = () => {
    alert('Barcode scanner integration ready. This will connect to your barcode scanner hardware or mobile device.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Search Inventory </h1>
          
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleBarcodeImport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Barcode className="w-5 h-5" />
            Barcode Import
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-xl">{inventory.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Stock</p>
              <p className="text-xl">{inventory.filter(i => i.status === 'in-stock').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-xl">{inventory.filter(i => i.status === 'low-stock').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Expiring Soon</p>
              <p className="text-xl">{inventory.filter(i => i.status === 'expiring-soon').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600">Product</th>
    
                <th className="text-left py-3 px-4 text-gray-600">Category</th>
                <th className="text-left py-3 px-4 text-gray-600">Quantity</th>
              
                <th className="text-left py-3 px-4 text-gray-600">Batch</th>
                <th className="text-left py-3 px-4 text-gray-600">Expiry</th>
                <th className="text-left py-3 px-4 text-gray-600">Status</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.supplier}</p>
                    </div>
                  </td>
            
                  <td className="py-3 px-4 text-gray-600">{item.category}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className={item.quantity <= item.reorderLevel ? 'text-orange-600' : 'text-gray-900'}>
                        {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">Min: {item.reorderLevel}</p>
                    </div>
                  </td>
          
                  <td className="py-3 px-4 text-gray-600 text-sm">{item.batch}</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">{item.expiryDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(item.status)}`}>
                      {item.status.replace('-', ' ')}
                    </span>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || selectedItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h2 className="mb-4">{selectedItem ? 'Edit Item' : 'Add New Item'}</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  defaultValue={selectedItem?.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            
              <div>
                <label className="block text-sm text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {categories.filter(c => c !== 'all').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  defaultValue={selectedItem?.quantity}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Reorder Level</label>
                <input
                  type="number"
                  defaultValue={selectedItem?.reorderLevel}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={selectedItem?.price}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Batch Number</label>
                <input
                  type="text"
                  defaultValue={selectedItem?.batch}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  defaultValue={selectedItem?.expiryDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  defaultValue={selectedItem?.location}
                  placeholder="e.g., A-12-03"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Supplier</label>
                <input
                  type="text"
                  defaultValue={selectedItem?.supplier}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {selectedItem ? 'Update' : 'Add'} Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
