import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, XCircle, AlertTriangle, User, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PrescriptionValidation = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const prescriptions = [
    {
      id: 'RX001',
      patientName: 'John Smith',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      status: 'pending',
      medicines: [
        { name: 'Paracetamol 500mg', quantity: 20, available: 150, canDispense: true },
        { name: 'Amoxicillin 250mg', quantity: 14, available: 25, canDispense: true }
      ]
    },
    {
      id: 'RX002',
      patientName: 'Emma Davis',
      doctorName: 'Dr. Michael Brown',
      date: '2024-01-15',
      status: 'validated',
      medicines: [
        { name: 'Ibuprofen 400mg', quantity: 30, available: 200, canDispense: true },
        { name: 'Cetirizine 10mg', quantity: 10, available: 80, canDispense: true }
      ]
    },
    {
      id: 'RX003',
      patientName: 'Robert Wilson',
      doctorName: 'Dr. Lisa Anderson',
      date: '2024-01-14',
      status: 'partial',
      medicines: [
        { name: 'Metformin 500mg', quantity: 30, available: 15, canDispense: false },
        { name: 'Paracetamol 500mg', quantity: 10, available: 150, canDispense: true }
      ]
    }
  ];

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending Validation</Badge>;
      case 'validated':
        return <Badge variant="default" className="bg-green-500">Validated</Badge>;
      case 'partial':
        return <Badge variant="destructive">Partial Stock</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleValidatePrescription = (prescriptionId) => {
    console.log('Validating prescription:', prescriptionId);
    toast({
      title: "Prescription Validated",
      description: `Prescription ${prescriptionId} has been validated successfully.`,
    });
  };

  const handleDispenseMedicine = (prescriptionId) => {
    console.log('Dispensing medicine for prescription:', prescriptionId);
    toast({
      title: "Medicine Dispensed",
      description: `Medicine for prescription ${prescriptionId} has been dispensed.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Prescription Validation & Dispensing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search prescriptions by patient name, prescription ID, or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-lg text-gray-900">
                          Prescription #{prescription.id}
                        </h3>
                        {getStatusBadge(prescription.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span><strong>Patient:</strong> {prescription.patientName}</span>
                        </div>
                        <div>
                          <strong>Doctor:</strong> {prescription.doctorName}
                        </div>
                        <div>
                          <strong>Date:</strong> {prescription.date}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Prescribed Medicines:</h4>
                        {prescription.medicines.map((medicine, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{medicine.name}</div>
                              <div className="text-sm text-gray-600">
                                Quantity: {medicine.quantity} | Available: {medicine.available}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {medicine.canDispense ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                              <span className="text-sm font-medium">
                                {medicine.canDispense ? 'Available' : 'Insufficient Stock'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-32">
                      {prescription.status === 'pending' && (
                        <Button 
                          onClick={() => handleValidatePrescription(prescription.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Validate
                        </Button>
                      )}
                      
                      {prescription.status === 'validated' && (
                        <Button 
                          onClick={() => handleDispenseMedicine(prescription.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Dispense
                        </Button>
                      )}
                      
                      {prescription.status === 'partial' && (
                        <div className="space-y-2">
                          <Button 
                            onClick={() => handleDispenseMedicine(prescription.id)}
                            className="bg-orange-600 hover:bg-orange-700 w-full"
                          >
                            Partial Dispense
                          </Button>
                          <div className="flex items-center gap-1 text-xs text-orange-600">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Some items unavailable</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};