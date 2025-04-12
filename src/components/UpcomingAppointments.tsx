
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

const UpcomingAppointments: React.FC = () => {
  const navigate = useNavigate();
  const [appointments] = useState<Appointment[]>([]);
  
  const handleScheduleAppointment = () => {
    navigate('/appointments');
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-pcos-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Schedule an appointment with a healthcare provider to discuss your PCOS management.
            </p>
            <Button onClick={handleScheduleAppointment}>Schedule Appointment</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-md p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{appointment.doctorName}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-pcos-600" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-pcos-600" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-pcos-600" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {appointments.length > 0 && (
        <CardFooter className="pt-0">
          <Button variant="outline" className="w-full" onClick={handleScheduleAppointment}>
            Schedule Another Appointment
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UpcomingAppointments;
