
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar, Package, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StockAlerts = () => {
  const { toast } = useToast();

  const lowStockItems = [
    {
      id: 1,
      name: 'Amoxicillin 250mg',
      currentStock: 25,
      minStock: 30,
      category: 'Antibiotic',
      supplier: 'PharmaCare Inc',
      lastOrdered: '2024-01-10',
      urgency: 'high'
    },
    {
      id: 2,
      name: 'Metformin 500mg',
      currentStock: 15,
      minStock: 25,
      category: 'Diabetes',
      supplier: 'DiabetCare Plus',
      lastOrdered: '2024-01-05',
      urgency: 'critical'
    },
    {
      id: 3,
      name: 'Insulin Glargine',
      currentStock: 8,
      minStock: 15,
      category: 'Diabetes',
      supplier: 'DiabetCare Plus',
      lastOrdered: '2024-01-12',
      urgency: 'critical'
    }
  ];

  const expiringItems = [
    {
      id: 1,
      name: 'Aspirin 75mg',
      stock: 45,
      expiryDate: '2024-02-15',
      daysToExpiry: 30,
      batch: 'ASP001'
    },
    {
      id: 2,
      name: 'Vitamin D3 1000IU',
      stock: 120,
      expiryDate: '2024-03-01',
      daysToExpiry: 45,
      batch: 'VD001'
    }
  ];

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge variant="secondary" className="bg-orange-500 text-white">High</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const handleReorder = (itemName: string, supplier: string) => {
    console.log('Reordering:', itemName, 'from', supplier);
    toast({
      title: "Reorder Initiated",
      description: `Reorder request for ${itemName} has been sent to ${supplier}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Low Stock Alerts */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Low Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Package className="h-4 w-4 text-red-600" />
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        {getUrgencyBadge(item.urgency)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div><strong>Current Stock:</strong> {item.currentStock} units</div>
                        <div><strong>Min Required:</strong> {item.minStock} units</div>
                        <div><strong>Category:</strong> {item.category}</div>
                        <div><strong>Supplier:</strong> {item.supplier}</div>
                        <div><strong>Last Ordered:</strong> {item.lastOrdered}</div>
                        <div><strong>Shortage:</strong> {item.minStock - item.currentStock} units</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleReorder(item.name, item.supplier)}
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Reorder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expiring Soon */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <Calendar className="h-5 w-5" />
            Expiring Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expiringItems.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-orange-500 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <Badge variant="secondary" className="bg-orange-500 text-white">
                          {item.daysToExpiry} days left
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div><strong>Stock:</strong> {item.stock} units</div>
                        <div><strong>Expiry Date:</strong> {item.expiryDate}</div>
                        <div><strong>Batch:</strong> {item.batch}</div>
                        <div><strong>Days to Expiry:</strong> {item.daysToExpiry} days</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Mark for Discount
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Remove from Stock
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 h-16">
              <div className="text-center">
                <Package className="h-6 w-6 mx-auto mb-1" />
                <div>Generate Stock Report</div>
              </div>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 h-16">
              <div className="text-center">
                <ShoppingCart className="h-6 w-6 mx-auto mb-1" />
                <div>Bulk Reorder</div>
              </div>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 h-16">
              <div className="text-center">
                <AlertTriangle className="h-6 w-6 mx-auto mb-1" />
                <div>Set Alert Preferences</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
