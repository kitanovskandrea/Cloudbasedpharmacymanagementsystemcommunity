import { useState } from 'react';
import { Search, FileText, Check, Clock, User, Calendar, Pill } from 'lucide-react';

type User = {
  id: string;
  name: string;
  role: string;
  branch: string;
};

type Prescription = {
  id: string;
  prescriptionNumber: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  dateIssued: string;
  status: 'pending' | 'in-progress' | 'fulfilled' | 'cancelled';
  medications: {
    name: string;
    dosage: string;
    quantity: number;
    instructions: string;
  }[];
  notes: string;
  priority: 'normal' | 'urgent';
};

export function PrescriptionManagement({ user }: { user: User }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      prescriptionNumber: 'RX-2024-1234',
      patientName: 'John Doe',
      patientId: 'PT-45678',
      doctorName: 'Dr. Sarah Smith',
      doctorId: 'DR-123',
      dateIssued: '2024-12-01T10:30:00',
      status: 'pending',
      priority: 'urgent',
      medications: [
        {
          name: 'Amoxicillin 500mg',
          dosage: '500mg',
          quantity: 30,
          instructions: 'Take 1 capsule three times daily with food for 10 days'
        },
        {
          name: 'Ibuprofen 400mg',
          dosage: '400mg',
          quantity: 20,
          instructions: 'Take 1 tablet every 6 hours as needed for pain'
        }
      ],
      notes: 'Patient allergic to penicillin alternatives if necessary'
    },
    {
      id: '2',
      prescriptionNumber: 'RX-2024-1233',
      patientName: 'Jane Wilson',
      patientId: 'PT-45679',
      doctorName: 'Dr. Michael Johnson',
      doctorId: 'DR-124',
      dateIssued: '2024-12-01T09:15:00',
      status: 'fulfilled',
      priority: 'normal',
      medications: [
        {
          name: 'Metformin 850mg',
          dosage: '850mg',
          quantity: 60,
          instructions: 'Take 1 tablet twice daily with meals'
        }
      ],
      notes: ''
    },
    {
      id: '3',
      prescriptionNumber: 'RX-2024-1232',
      patientName: 'Bob Martinez',
      patientId: 'PT-45680',
      doctorName: 'Dr. Emily Williams',
      doctorId: 'DR-125',
      dateIssued: '2024-12-01T08:45:00',
      status: 'in-progress',
      priority: 'normal',
      medications: [
        {
          name: 'Lisinopril 10mg',
          dosage: '10mg',
          quantity: 30,
          instructions: 'Take 1 tablet once daily in the morning'
        },
        {
          name: 'Atorvastatin 20mg',
          dosage: '20mg',
          quantity: 30,
          instructions: 'Take 1 tablet once daily at bedtime'
        }
      ],
      notes: 'Regular blood pressure monitoring required'
    },
    {
      id: '4',
      prescriptionNumber: 'RX-2024-1231',
      patientName: 'Alice Brown',
      patientId: 'PT-45681',
      doctorName: 'Dr. Robert Davis',
      doctorId: 'DR-126',
      dateIssued: '2024-11-30T16:20:00',
      status: 'pending',
      priority: 'normal',
      medications: [
        {
          name: 'Omeprazole 40mg',
          dosage: '40mg',
          quantity: 30,
          instructions: 'Take 1 capsule once daily before breakfast'
        }
      ],
      notes: ''
    }
  ]);

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch = 
      rx.prescriptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || rx.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'fulfilled': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'in-progress': return FileText;
      case 'fulfilled': return Check;
      default: return FileText;
    }
  };

  const handleFulfill = (prescriptionId: string) => {
    setPrescriptions(prev =>
      prev.map(rx =>
        rx.id === prescriptionId
          ? { ...rx, status: 'fulfilled' as const }
          : rx
      )
    );
    setSelectedPrescription(null);
    alert('Prescription fulfilled successfully. Stock levels have been automatically updated.');
  };

  const handleStartProcessing = (prescriptionId: string) => {
    setPrescriptions(prev =>
      prev.map(rx =>
        rx.id === prescriptionId
          ? { ...rx, status: 'in-progress' as const }
          : rx
      )
    );
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>E-Prescription Management</h1>
          <p className="text-gray-600 mt-1">Automatically imported from national e-prescription system</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl">{prescriptions.filter(p => p.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-xl">{prescriptions.filter(p => p.status === 'in-progress').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Fulfilled Today</p>
              <p className="text-xl">{prescriptions.filter(p => p.status === 'fulfilled').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Today</p>
              <p className="text-xl">{prescriptions.length}</p>
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
              placeholder="Search by prescription number, patient, or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="fulfilled">Fulfilled</option>
          </select>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="grid gap-4">
        {filteredPrescriptions.map((rx) => {
          const StatusIcon = getStatusIcon(rx.status);
          return (
            <div key={rx.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    rx.status === 'pending' ? 'bg-yellow-50' :
                    rx.status === 'in-progress' ? 'bg-blue-50' :
                    'bg-green-50'
                  }`}>
                    <StatusIcon className={`w-6 h-6 ${
                      rx.status === 'pending' ? 'text-yellow-600' :
                      rx.status === 'in-progress' ? 'text-blue-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3>{rx.prescriptionNumber}</h3>
                      {rx.priority === 'urgent' && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                          URGENT
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(rx.status)}`}>
                        {rx.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{rx.patientName} ({rx.patientId})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDateTime(rx.dateIssued)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Prescribed by: {rx.doctorName}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPrescription(rx)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </button>
                  {rx.status === 'pending' && (
                    <button
                      onClick={() => handleStartProcessing(rx.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Processing
                    </button>
                  )}
                  {rx.status === 'in-progress' && (
                    <button
                      onClick={() => handleFulfill(rx.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark as Fulfilled
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2">Medications:</p>
                <div className="space-y-2">
                  {rx.medications.map((med, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <Pill className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-900">{med.name} - Qty: {med.quantity}</p>
                        <p className="text-sm text-gray-600">{med.instructions}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {rx.notes && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm">Note: {rx.notes}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prescription Details Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="mb-2">Prescription Details</h2>
                <p className="text-gray-600">{selectedPrescription.prescriptionNumber}</p>
              </div>
              <span className={`px-3 py-1 rounded ${getStatusBadge(selectedPrescription.status)}`}>
                {selectedPrescription.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Patient Information</h3>
                <p className="text-gray-900">{selectedPrescription.patientName}</p>
                <p className="text-sm text-gray-600">ID: {selectedPrescription.patientId}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Prescribing Doctor</h3>
                <p className="text-gray-900">{selectedPrescription.doctorName}</p>
                <p className="text-sm text-gray-600">ID: {selectedPrescription.doctorId}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Date Issued</h3>
                <p className="text-gray-900">{formatDateTime(selectedPrescription.dateIssued)}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Priority</h3>
                <p className={`${selectedPrescription.priority === 'urgent' ? 'text-red-600' : 'text-gray-900'}`}>
                  {selectedPrescription.priority.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3">Medications Prescribed</h3>
              <div className="space-y-3">
                {selectedPrescription.medications.map((med, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                      </div>
                      <p className="text-gray-900">Qty: {med.quantity}</p>
                    </div>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <span className="text-gray-900">Instructions:</span> {med.instructions}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {selectedPrescription.notes && (
              <div className="mb-6">
                <h3 className="mb-2">Additional Notes</h3>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-gray-900">{selectedPrescription.notes}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedPrescription(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedPrescription.status === 'pending' && (
                <button
                  onClick={() => {
                    handleStartProcessing(selectedPrescription.id);
                    setSelectedPrescription(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Processing
                </button>
              )}
              {selectedPrescription.status === 'in-progress' && (
                <button
                  onClick={() => handleFulfill(selectedPrescription.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark as Fulfilled
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
