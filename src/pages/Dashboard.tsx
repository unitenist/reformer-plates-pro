
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle, Clock, Dumbbell, User, Users } from "lucide-react";

const Dashboard = () => {
  // Sample data - in a real app, this would come from an API
  const upcomingAppointment = {
    date: "15 Nisan 2025",
    time: "14:30",
    instructor: "Ayşe Yılmaz",
    type: "Reformer Pilates",
  };
  
  const membershipStatus = {
    type: "Premium Aylık",
    remaining: 8,
    total: 12,
    expiryDate: "30 Nisan 2025",
  };
  
  const recentExercise = {
    name: "Core Strength Series",
    lastCompleted: "2 gün önce",
    duration: "45 dakika",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Hoş Geldiniz, Ahmet</h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("tr-TR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming Appointment Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yaklaşan Randevu</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointment ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tarih:</span>
                    <span>{upcomingAppointment.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Saat:</span>
                    <span>{upcomingAppointment.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Eğitmen:</span>
                    <span>{upcomingAppointment.instructor}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Ders:</span>
                    <span>{upcomingAppointment.type}</span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Link to="/appointments">
                      <Button variant="outline" size="sm">Tüm Randevular</Button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">Yaklaşan randevunuz bulunmuyor.</p>
                  <Link to="/appointments">
                    <Button>Randevu Al</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Membership Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Üyelik Durumu</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Paket:</span>
                <span>{membershipStatus.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Kalan Ders:</span>
                <span>{membershipStatus.remaining} / {membershipStatus.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Bitiş Tarihi:</span>
                <span>{membershipStatus.expiryDate}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${(membershipStatus.remaining / membershipStatus.total) * 100}%` }}>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/memberships">
                  <Button variant="outline" size="sm">Üyelik Detayları</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Exercise Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Son Tamamlanan Egzersiz</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Egzersiz:</span>
                <span>{recentExercise.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tamamlanma:</span>
                <span>{recentExercise.lastCompleted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Süre:</span>
                <span>{recentExercise.duration}</span>
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/exercises">
                  <Button variant="outline" size="sm">Tüm Egzersizler</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Links */}
      <h2 className="text-xl font-semibold mt-8">Hızlı Erişim</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/appointments">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 mb-3 text-primary" />
              <p className="font-medium">Randevu Al</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/profile">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <User className="h-8 w-8 mb-3 text-primary" />
              <p className="font-medium">Profil</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/exercises">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Dumbbell className="h-8 w-8 mb-3 text-primary" />
              <p className="font-medium">Egzersizler</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/instructors">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users className="h-8 w-8 mb-3 text-primary" />
              <p className="font-medium">Eğitmenler</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      {/* Tip of the day */}
      <Card className="mt-6 bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Günün Plates İpucu</h3>
              <p className="text-sm text-muted-foreground">
                Egzersiz yaparken nefes alıp vermeye odaklanın. Reformer Pilates'te doğru nefes teknikleri, 
                hareketlerin etkinliğini artırır ve merkez kaslarınızı daha etkili bir şekilde çalıştırmanıza yardımcı olur.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
