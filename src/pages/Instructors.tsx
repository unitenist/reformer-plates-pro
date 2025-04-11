
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Search, User, Clock, BookOpen, Award, Calendar, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample instructors data
const instructorsData = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    title: "Baş Eğitmen",
    specialties: ["Reformer Pilates", "Mat Pilates", "Klinik Pilates"],
    experience: "8 yıl",
    certification: "BASI Pilates Sertifikası, PMA-CPT",
    bio: "Ayşe, 8 yıllık pilates deneyimine sahip bir eğitmendir. BASI Pilates sertifikası ve PMA-CPT (Pilates Method Alliance - Certified Pilates Teacher) unvanına sahiptir. Klinik pilates alanında uzmanlaşmış olup, rehabilitasyon sürecindeki müşterilerle çalışma konusunda geniş deneyime sahiptir.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    availability: "Pazartesi, Çarşamba, Cuma",
    email: "ayse.yilmaz@reformerpilates.com",
  },
  {
    id: 2,
    name: "Mehmet Demir",
    title: "Kıdemli Eğitmen",
    specialties: ["Reformer Pilates", "Core Güçlendirme", "Sporcu Rehabilitasyonu"],
    experience: "6 yıl",
    certification: "Balanced Body Pilates Sertifikası",
    bio: "Mehmet, profesyonel basketbol geçmişine sahip bir eğitmendir. Spor sakatlıkları sonrası rehabilitasyon sürecinde pilatese yönelmiş ve 6 yıldır eğitmenlik yapmaktadır. Sporcu rehabilitasyonu ve performans artırma konularında uzmanlaşmıştır.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    availability: "Salı, Perşembe, Cumartesi",
    email: "mehmet.demir@reformerpilates.com",
  },
  {
    id: 3,
    name: "Zeynep Kaya",
    title: "Pilates Eğitmeni",
    specialties: ["Reformer Pilates", "Hamile Pilatesi", "Postpartum Pilates"],
    experience: "5 yıl",
    certification: "Stott Pilates Sertifikası",
    bio: "Zeynep, özellikle hamile ve yeni doğum yapmış kadınlar için pilates programları konusunda uzmanlaşmıştır. 5 yıllık eğitmenlik deneyimiyle, güvenli ve etkili egzersiz programları tasarlamaktadır. Stott Pilates sertifikasına sahiptir.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    availability: "Pazartesi, Salı, Perşembe, Cuma",
    email: "zeynep.kaya@reformerpilates.com",
  },
  {
    id: 4,
    name: "Ali Yıldız",
    title: "Pilates Eğitmeni",
    specialties: ["Reformer Pilates", "Erkekler için Pilates", "Fonksiyonel Antrenman"],
    experience: "4 yıl",
    certification: "Fletcher Pilates Sertifikası",
    bio: "Ali, özellikle erkekler için pilates programları ve fonksiyonel antrenman konularında uzmanlaşmıştır. 4 yıllık eğitmenlik deneyimiyle, vücut dengesini ve güç gelişimini amaçlayan programlar tasarlamaktadır.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    availability: "Çarşamba, Cuma, Pazar",
    email: "ali.yildiz@reformerpilates.com",
  },
];

const Instructors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Filter instructors based on search query
  const filteredInstructors = instructorsData.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instructor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleContactInstructor = (email: string) => {
    // In a real app, this might open an email client or a form
    toast({
      title: "İletişim Talebi",
      description: `${email} adresine iletişim talebiniz gönderildi.`,
    });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Eğitmenler</h1>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="İsim veya uzmanlık alanıyla arayın..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {filteredInstructors.map((instructor) => (
          <Card key={instructor.id} className="overflow-hidden flex flex-col h-full">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-col">
                <CardHeader className="p-4 pb-2">
                  <div className="space-y-1">
                    <CardTitle>{instructor.name}</CardTitle>
                    <CardDescription>{instructor.title}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {instructor.specialties.map((specialty, index) => (
                        <Badge variant="secondary" key={index}>{specialty}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm">
                      <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{instructor.experience} deneyim</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{instructor.certification}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{instructor.availability}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex space-x-2 w-full">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setSelectedInstructor(instructor);
                        setDialogOpen(true);
                      }}
                    >
                      Detayları Gör
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleContactInstructor(instructor.email)}
                    >
                      İletişime Geç
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredInstructors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Arama kriterlerinize uygun eğitmen bulunamadı.</p>
        </div>
      )}
      
      {/* Instructor Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedInstructor && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedInstructor.name}</DialogTitle>
                <DialogDescription>{selectedInstructor.title}</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                <div className="col-span-1">
                  <img
                    src={selectedInstructor.image}
                    alt={selectedInstructor.name}
                    className="w-full rounded-lg object-cover aspect-square"
                  />
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">{selectedInstructor.experience} deneyim</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">{selectedInstructor.availability}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">{selectedInstructor.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Hakkında</h3>
                    <p className="text-sm text-muted-foreground">{selectedInstructor.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Uzmanlık Alanları</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInstructor.specialties.map((specialty: string, index: number) => (
                        <Badge key={index}>{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Sertifikalar</h3>
                    <p className="text-sm">{selectedInstructor.certification}</p>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      className="w-full"
                      onClick={() => handleContactInstructor(selectedInstructor.email)}
                    >
                      İletişime Geç
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Instructors;
