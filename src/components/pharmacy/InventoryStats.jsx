import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

export const InventoryStats = () => {
  const stats = [
    {
      title: 'Total Medicines',
      value: '2,847',
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Low Stock Items',
      value: '23',
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-5%'
    },
    {
      title: 'Available Stock',
      value: '2,824',
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Monthly Dispensed',
      value: '1,245',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+15%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {stat.change} from last month
                </Badge>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};