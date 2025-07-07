
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Pill, AlertTriangle, FileText, Package } from 'lucide-react';
import { MedicineInventory } from './MedicineInventory';
import { PrescriptionValidation } from './PrescriptionValidation';
import { StockAlerts } from './StockAlerts';
import { InventoryStats } from './InventoryStats';

export const PharmacyDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Pill className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pharmacy Management</h1>
              <p className="text-gray-600">Medicine inventory and prescription management system</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <InventoryStats />
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Medicine Inventory
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Prescription Validation
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Stock Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <MedicineInventory />
          </TabsContent>

          <TabsContent value="prescriptions">
            <PrescriptionValidation />
          </TabsContent>

          <TabsContent value="alerts">
            <StockAlerts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
