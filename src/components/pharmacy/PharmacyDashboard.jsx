import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Pill, BarChart3, Package, FileText, TrendingUp } from 'lucide-react';
import { MedicineInventory } from './MedicineInventory';
import { PrescriptionValidation } from './PrescriptionValidation';
import { StockAlerts } from './StockAlerts';
import { InventoryStats } from './InventoryStats';
import { StockMovements } from './StockMovements';

export const PharmacyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Prescriptions
            </TabsTrigger>
            <TabsTrigger value="stockmovements" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Stock Movements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <InventoryStats />
              <StockAlerts />
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <MedicineInventory />
          </TabsContent>

          <TabsContent value="prescriptions">
            <PrescriptionValidation />
          </TabsContent>

          <TabsContent value="stockmovements">
            <StockMovements />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};