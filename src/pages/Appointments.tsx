
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { format, isSameDay, parseISO, isAfter, isBefore, addDays } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample appointments data
const appointmentsData = [
  {
    id: 1,
    date: "2025-04-15T14:30:00",
    type: "Reformer Pilates",
    instructor: "Ayşe Yılmaz",
    duration: 60,
    status: "upcoming", // upcoming, completed, canceled
  },
  {
    id: 2,
    date: "2025-04-18T10:00:00",
    type: "Core Güçlendirme",
    instructor: "Mehmet Demir",
    duration: 45,
    status: "upcoming",
  },
  {
    id: 3,
    date: "2025-04-05T16:00:00",
    type: "Reformer Pilates",
    instructor: "Zeynep Kaya",
    duration: 60,
    status: "completed",
  },
  {
    id: 4,
    date: "2025-03-30T11:30:00",
    type: "Özel Ders",
    instructor: "Ali Yıldız",
    duration: 90,
    status: "completed",
  },
  {
    id: 5,
    date: "2025-04-08T09:00:00",
    type: "Reformer Pilates",
    instructor: "Ayşe Yılmaz",
    duration: 60,
    status: "canceled",
  },
];

// Sample available slots data
const availableSlotsData = [
  {
    date: "2025-04-16",
    slots: [
      { time: "09:00", instructor: "Ayşe Yılmaz", available: true },
      { time: "10:00", instructor: "Ayşe Yılmaz", available: false },
      { time: "11:00", instructor: "Mehmet Demir", available: true },
      { time: "14:00", instructor: "Zeynep Kaya", available: true },
      { time: "15:00", instructor: "Zeynep Kaya", available: true },
      { time: "16:00", instructor: "Ali Yıldız", available: false },
      { time: "17:00", instructor: "Ali Yıldız", available: true },
    ]
  },
  {
    date: "2025-04-17",
    slots: [
      { time: "09:00", instructor: "Mehmet Demir", available: true },
      { time: "10:00", instructor: "Mehmet Demir", available: true },
      { time: "11:00", instructor: "Ayşe Yılmaz", available: true },
      { time: "14:00", instructor: "Ayşe Yılmaz", available: false },
      { time: "15:00", instructor: "Ali Yıldız", available: true },
      { time: "16:00", instructor: "Zeynep Kaya", available: true },
      { time: "17:00", instructor: "Zeynep Kaya", available: false },
    ]
  },
  {
    date: "2025-04-18",
    slots: [
      { time: "09:00", instructor: "Ali Yıldız", available: true },
      { time: "10:00", instructor: "Mehmet Demir", available: false },
      { time: "11:00", instructor: "Mehmet Demir", available: true },
      { time: "14:00", instructor: "Zeynep Kaya", available: true },
      { time: "15:00", instructor: "Zeynep Kaya", available: true },
      { time: "16:00", instructor: "Ayşe Yılmaz", available: false },
      { time: "17:00", instructor: "Ayşe Yılmaz", available: true },
    ]
  },
  {
    date: "2025-04-19",
    slots: [
      { time: "09:00", instructor: "Zeynep Kaya", available: true },
      { time: "10:00", instructor: "Zeynep Kaya", available: true },
      { time: "11:00", instructor: "Ali Yıldız", available: true },
      { time: "14:00", instructor: "Ali Yıldız", available: false },
      { time: "15:00", instructor: "Mehmet Demir", available: true },
      { time: "16:00", instructor: "Mehmet Demir", available: true },
      { time: "17:00", instructor: "Ayşe Yılmaz", available: false },
    ]
  },
  {
    date: "2025-04-20",
    slots: [
      { time: "09:00", instructor: "Ayşe Yılmaz", available: true },
      { time: "10:00", instructor: "Ali Yıldız", available: false },
      { time: "11:00", instructor: "Ali Yıldız", available: true },
      { time: "14:00", instructor: "Mehmet Demir", available: true },
      { time: "15:00", instructor: "Mehmet Demir", available: true },
      { time: "16:00", instructor: "Zeynep Kaya", available: false },
      { time: "17:00", instructor: "Zeynep Kaya", available: true },
    ]
  }
];

const Appointments = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState("Reformer Pilates");
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  // Filter appointments based on status
  const upcomingAppointments = appointmentsData.filter(app => app.status === "upcoming");
  const pastAppointments = appointmentsData.filter(app => app.status === "completed" || app.status === "canceled");
  
  // Get available slots for selected date
  const getAvailableSlots = () => {
    if (!date) return [];
    
    const formattedDate = format(date, "yyyy-MM-dd");
    const dayData = availableSlotsData.find(d => d.date === formattedDate);
    
    if (!dayData) return [];
    return dayData.slots.filter(slot => slot.available);
  };
  
  const availableSlots = getAvailableSlots();
  
  // Handle booking appointment
  const handleBookAppointment = () => {
    if (!selectedSlot || !date) {
      toast({
        title: "Hata",
        description: "Lütfen bir tarih ve saat seçin.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would call an API here
    toast({
      title: "Randevu Alındı",
      description: `${format(date, "d MMMM yyyy", { locale: tr })} tarihinde saat ${selectedSlot.time} için ${selectedClass} dersi için randevunuz alınmıştır.`,
    });
    
    setSelectedSlot(null);
    setBookDialogOpen(false);
  };
  
  // Handle canceling appointment
  const handleCancelAppointment = () => {
    if (!selectedAppointment) return;
    
    // In a real app, you would call an API here
    toast({
      title: "Randevu İptal Edildi",
      description: "Randevunuz başarıyla iptal edildi.",
    });
    
    setSelectedAppointment(null);
    setCancelDialogOpen(false);
  };
  
  // Format date for display
  const formatAppointmentDate = (dateString: string) => {
    const date = parseISO(dateString);
    return {
      date: format(date, "d MMMM yyyy", { locale: tr }),
      time: format(date, "HH:mm", { locale: tr }),
      fullDate: format(date, "d MMMM yyyy, EEEE", { locale: tr }),
    };
  };
  
  // Check if a date has available slots
  const hasAvailableSlots = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const dayData = availableSlotsData.find(d => d.date === formattedDate);
    
    if (!dayData) return false;
    return dayData.slots.some(slot => slot.available);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Randevular</h1>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Yaklaşan Randevular</TabsTrigger>
          <TabsTrigger value="book">Randevu Al</TabsTrigger>
          <TabsTrigger value="history">Randevu Geçmişi</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => {
                const { date, time, fullDate } = formatAppointmentDate(appointment.date);
                
                return (
                  <Card key={appointment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{appointment.type}</CardTitle>
                          <CardDescription>{fullDate}</CardDescription>
                        </div>
                        <Badge>Yaklaşan</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{time} ({appointment.duration} dakika)</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.instructor}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setCancelDialogOpen(true);
                        }}
                      >
                        İptal Et
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <CardDescription className="mb-6">Yaklaşan randevunuz bulunmamaktadır.</CardDescription>
              <Button onClick={() => document.getElementById("book-tab")?.click()}>
                Randevu Al
              </Button>
            </div>
          )}
          
          {/* Cancel Appointment Dialog */}
          <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Randevu İptali</DialogTitle>
                <DialogDescription>
                  Bu randevuyu iptal etmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </DialogDescription>
              </DialogHeader>
              
              {selectedAppointment && (
                <div className="py-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Ders:</span>
                      <span>{selectedAppointment.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Tarih:</span>
                      <span>{formatAppointmentDate(selectedAppointment.date).date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saat:</span>
                      <span>{formatAppointmentDate(selectedAppointment.date).time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Eğitmen:</span>
                      <span>{selectedAppointment.instructor}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                  Vazgeç
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancelAppointment}
                >
                  Randevuyu İptal Et
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="book" id="book-tab">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Randevu Tarihi</CardTitle>
                <CardDescription>Randevu almak istediğiniz tarihi seçin</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border p-3"
                  fromDate={new Date()}
                  toDate={addDays(new Date(), 30)}
                  modifiersClassNames={{
                    selected: "bg-primary text-primary-foreground",
                  }}
                  modifiersStyles={{
                    today: {
                      fontWeight: "bold",
                      border: "1px solid currentColor",
                    },
                  }}
                  modifiers={{
                    available: (date) => hasAvailableSlots(date),
                  }}
                  classNames={{
                    day_mod_available: "border-green-500 border text-green-500 hover:bg-green-50",
                  }}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Uygun Saatler</CardTitle>
                <CardDescription>{date ? format(date, "d MMMM yyyy, EEEE", { locale: tr }) : "Lütfen bir tarih seçin"}</CardDescription>
              </CardHeader>
              <CardContent>
                {date ? (
                  availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.map((slot, index) => (
                        <Button
                          key={index}
                          variant={selectedSlot === slot ? "default" : "outline"}
                          className="justify-between"
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <span>{slot.time}</span>
                          <span className="text-xs ml-2">({slot.instructor})</span>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Seçilen tarihte uygun saat bulunmamaktadır. Lütfen başka bir tarih seçin.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Uygun saatleri görmek için önce bir tarih seçin.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">Ders Tipi</h3>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ders seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reformer Pilates">Reformer Pilates</SelectItem>
                      <SelectItem value="Core Güçlendirme">Core Güçlendirme</SelectItem>
                      <SelectItem value="Özel Ders">Özel Ders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full"
                  disabled={!selectedSlot}
                  onClick={() => setBookDialogOpen(true)}
                >
                  Randevu Al
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Book Appointment Dialog */}
          <Dialog open={bookDialogOpen} onOpenChange={setBookDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Randevu Onayı</DialogTitle>
                <DialogDescription>
                  Aşağıdaki bilgileri kontrol edip randevunuzu onaylayın.
                </DialogDescription>
              </DialogHeader>
              
              {date && selectedSlot && (
                <div className="py-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Ders:</span>
                      <span>{selectedClass}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Tarih:</span>
                      <span>{format(date, "d MMMM yyyy", { locale: tr })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saat:</span>
                      <span>{selectedSlot.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Eğitmen:</span>
                      <span>{selectedSlot.instructor}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setBookDialogOpen(false)}>
                  İptal
                </Button>
                <Button onClick={handleBookAppointment}>
                  Randevuyu Onayla
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="history">
          {pastAppointments.length > 0 ? (
            <div className="space-y-4">
              {pastAppointments.map((appointment) => {
                const { date, time, fullDate } = formatAppointmentDate(appointment.date);
                
                return (
                  <Card key={appointment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{appointment.type}</CardTitle>
                          <CardDescription>{fullDate}</CardDescription>
                        </div>
                        <Badge variant={appointment.status === "completed" ? "outline" : "secondary"}>
                          {appointment.status === "completed" ? "Tamamlandı" : "İptal Edildi"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{time} ({appointment.duration} dakika)</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.instructor}</span>
                        </div>
                      </div>
                    </CardContent>
                    {appointment.status === "completed" && (
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Yeniden Randevu Al
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <CardDescription>Henüz tamamlanan veya iptal edilen randevunuz bulunmuyor.</CardDescription>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;
