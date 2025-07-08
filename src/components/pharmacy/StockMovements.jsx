import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Minus, Package, Calendar, Filter } from 'lucide-react';

export const StockMovements = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stockMovements = [
    {
      id: 'SM001',
      medicine: 'Paracetamol 500mg',
      type: 'IN',
      quantity: 500,
      date: '2024-01-15',
      time: '09:30 AM',
      reason: 'Purchase Order #PO-2024-001',
      supplier: 'MedSupply Co.',
      batchNo: 'BATCH001',
      expiryDate: '2025-12-31'
    },
    {
      id: 'SM002',
      medicine: 'Amoxicillin 250mg',
      type: 'OUT',
      quantity: 30,
      date: '2024-01-15',
      time: '11:45 AM',
      reason: 'Prescription Dispensed',
      patientId: 'PAT-001',
      prescriptionId: 'RX-2024-001',
      batchNo: 'BATCH005'
    },
    {
      id: 'SM003',
      medicine: 'Insulin Pen',
      type: 'IN',
      quantity: 100,
      date: '2024-01-14',
      time: '02:15 PM',
      reason: 'Purchase Order #PO-2024-002',
      supplier: 'Pharma Direct Ltd.',
      batchNo: 'BATCH010',
      expiryDate: '2025-06-30'
    },
    {
      id: 'SM004',
      medicine: 'Aspirin 75mg',
      type: 'OUT',
      quantity: 60,
      date: '2024-01-14',
      time: '04:20 PM',
      reason: 'Prescription Dispensed',
      patientId: 'PAT-023',
      prescriptionId: 'RX-2024-015',
      batchNo: 'BATCH002'
    },
    {
      id: 'SM005',
      medicine: 'Omeprazole 20mg',
      type: 'ADJUSTMENT',
      quantity: -5,
      date: '2024-01-13',
      time: '10:00 AM',
      reason: 'Stock Count Adjustment',
      adjustedBy: 'John Pharmacist',
      batchNo: 'BATCH008'
    },
    {
      id: 'SM006',
      medicine: 'Cough Syrup',
      type: 'OUT',
      quantity: 12,
      date: '2024-01-13',
      time: '03:30 PM',
      reason: 'Expired Stock Disposal',
      disposalRef: 'DISP-2024-001',
      batchNo: 'BATCH003'
    }
  ];

  const filteredMovements = stockMovements.filter(movement =>
    movement.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMovementTypeColor = (type) => {
    switch (type) {
      case 'IN':
        return 'bg-green-100 text-green-800';
      case 'OUT':
        return 'bg-red-100 text-red-800';
      case 'ADJUSTMENT':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMovementIcon = (type) => {
    switch (type) {
      case 'IN':
        return <Plus className="h-4 w-4" />;
      case 'OUT':
        return <Minus className="h-4 w-4" />;
      case 'ADJUSTMENT':
        return <Package className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stock Movements</h2>
          <p className="text-gray-600">Track all inventory transactions and adjustments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search by medicine name or reason..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stock Movements List */}
      <div className="space-y-4">
        {filteredMovements.map((movement) => (
          <Card key={movement.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${getMovementTypeColor(movement.type)}`}>
                    {getMovementIcon(movement.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{movement.medicine}</h3>
                      <Badge className={getMovementTypeColor(movement.type)}>
                        {movement.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{movement.reason}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {movement.date} at {movement.time}
                      </span>
                      <span>Batch: {movement.batchNo}</span>
                      {movement.expiryDate && <span>Expires: {movement.expiryDate}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    movement.type === 'IN' ? 'text-green-600' : 
                    movement.type === 'OUT' ? 'text-red-600' : 
                    'text-yellow-600'
                  }`}>
                    {movement.type === 'IN' ? '+' : movement.type === 'OUT' ? '-' : ''}
                    {Math.abs(movement.quantity)}
                  </div>
                  <div className="text-sm text-gray-500">units</div>
                </div>
              </div>
              
              {/* Additional Details */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  {movement.supplier && (
                    <div>
                      <span className="text-gray-500">Supplier:</span>
                      <p className="font-medium">{movement.supplier}</p>
                    </div>
                  )}
                  {movement.patientId && (
                    <div>
                      <span className="text-gray-500">Patient ID:</span>
                      <p className="font-medium">{movement.patientId}</p>
                    </div>
                  )}
                  {movement.prescriptionId && (
                    <div>
                      <span className="text-gray-500">Prescription:</span>
                      <p className="font-medium">{movement.prescriptionId}</p>
                    </div>
                  )}
                  {movement.adjustedBy && (
                    <div>
                      <span className="text-gray-500">Adjusted By:</span>
                      <p className="font-medium">{movement.adjustedBy}</p>
                    </div>
                  )}
                  {movement.disposalRef && (
                    <div>
                      <span className="text-gray-500">Disposal Ref:</span>
                      <p className="font-medium">{movement.disposalRef}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMovements.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No stock movements found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};