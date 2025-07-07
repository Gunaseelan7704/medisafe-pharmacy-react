import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { AddMedicineDialog } from './AddMedicineDialog';

export const MedicineInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      stock: 150,
      minStock: 50,
      price: 2.50,
      expiryDate: '2025-06-15',
      supplier: 'MediCorp Ltd',
      batch: 'PC001'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotic',
      stock: 25,
      minStock: 30,
      price: 5.75,
      expiryDate: '2024-12-20',
      supplier: 'PharmaCare Inc',
      batch: 'AM002'
    },
    {
      id: 3,
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      stock: 200,
      minStock: 75,
      price: 3.20,
      expiryDate: '2025-08-10',
      supplier: 'HealthMeds Co',
      batch: 'IB003'
    },
    {
      id: 4,
      name: 'Cetirizine 10mg',
      category: 'Antihistamine',
      stock: 80,
      minStock: 40,
      price: 1.80,
      expiryDate: '2025-03-22',
      supplier: 'MediCorp Ltd',
      batch: 'CT004'
    },
    {
      id: 5,
      name: 'Metformin 500mg',
      category: 'Diabetes',
      stock: 15,
      minStock: 25,
      price: 4.50,
      expiryDate: '2025-01-30',
      supplier: 'DiabetCare Plus',
      batch: 'MF005'
    }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || medicine.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (stock, minStock) => {
    if (stock <= minStock) return 'low';
    if (stock <= minStock * 1.5) return 'medium';
    return 'high';
  };

  const getStockBadge = (stock, minStock) => {
    const status = getStockStatus(stock, minStock);
    switch (status) {
      case 'low':
        return <Badge variant="destructive">Low Stock</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium Stock</Badge>;
      default:
        return <Badge variant="default" className="bg-green-500">In Stock</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Medicine Inventory Management
            <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Medicine
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                <SelectItem value="Antibiotic">Antibiotic</SelectItem>
                <SelectItem value="Antihistamine">Antihistamine</SelectItem>
                <SelectItem value="Diabetes">Diabetes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Medicine List */}
          <div className="space-y-4">
            {filteredMedicines.map((medicine) => (
              <Card key={medicine.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{medicine.name}</h3>
                        {getStockBadge(medicine.stock, medicine.minStock)}
                        {medicine.stock <= medicine.minStock && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div><span className="font-medium">Category:</span> {medicine.category}</div>
                        <div><span className="font-medium">Stock:</span> {medicine.stock} units</div>
                        <div><span className="font-medium">Price:</span> ${medicine.price}</div>
                        <div><span className="font-medium">Batch:</span> {medicine.batch}</div>
                        <div><span className="font-medium">Supplier:</span> {medicine.supplier}</div>
                        <div><span className="font-medium">Expiry:</span> {medicine.expiryDate}</div>
                        <div><span className="font-medium">Min Stock:</span> {medicine.minStock} units</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddMedicineDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
};