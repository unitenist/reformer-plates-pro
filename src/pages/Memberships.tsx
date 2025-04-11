
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Clock, Calendar, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Memberships = () => {
  const { toast } = useToast();
  
  // Sample data for current membership
  const currentMembership = {
    type: "Premium Aylık",
    startDate: "1 Nisan 2025",
    endDate: "30 Nisan 2025",
    remainingSessions: 8,
    totalSessions: 12,
    status: "active", // active, expired, frozen
  };
  
  // Sample data for membership history
  const membershipHistory = [
    {
      type: "Premium Aylık",
      startDate: "1 Mart 2025",
      endDate: "31 Mart 2025",
      usedSessions: 12,
      totalSessions: 12,
      status: "completed",
    },
    {
      type: "Haftalık Paket",
      startDate: "15 Şubat 2025",
      endDate: "22 Şubat 2025",
      usedSessions: 4,
      totalSessions: 5,
      status: "completed",
    },
  ];
  
  // Sample data for available packages
  const availablePackages = [
    {
      id: 1,
      name: "Haftalık Paket",
      sessions: 5,
      duration: "7 gün",
      price: "₺600",
      description: "Haftada 5 seans içeren paket. Yeni başlayanlar için idealdir.",
      features: ["5 Seans", "7 Gün Geçerlilik", "Tüm Grup Derslerine Katılım", "Giriş Değerlendirmesi"],
    },
    {
      id: 2,
      name: "Premium Aylık",
      sessions: 12,
      duration: "30 gün",
      price: "₺1,200",
      description: "Ayda 12 seans içeren paket. Düzenli katılımcılar için idealdir.",
      features: ["12 Seans", "30 Gün Geçerlilik", "Tüm Grup Derslerine Katılım", "1 Özel Ders", "Detaylı Değerlendirme"],
      popular: true,
    },
    {
      id: 3,
      name: "3 Aylık Paket",
      sessions: 40,
      duration: "90 gün",
      price: "₺3,600",
      description: "3 ay boyunca 40 seans içeren paket. Uzun vadeli taahhüt için en iyi değer.",
      features: ["40 Seans", "90 Gün Geçerlilik", "Tüm Grup Derslerine Katılım", "3 Özel Ders", "Detaylı Değerlendirme", "Özel Program"],
    },
  ];
  
  const handleRenew = () => {
    toast({
      title: "Yenileme Talebi Alındı",
      description: "Üyelik yenileme talebiniz alındı. Personelimiz sizinle iletişime geçecektir.",
    });
  };
  
  const handleFreezeMembership = () => {
    toast({
      title: "Dondurma Talebi Alındı",
      description: "Üyelik dondurma talebiniz alındı. Personelimiz sizinle iletişime geçecektir.",
    });
  };
  
  const handlePurchase = (packageId: number) => {
    const selectedPackage = availablePackages.find(p => p.id === packageId);
    toast({
      title: "Satın Alma Talebi",
      description: `${selectedPackage?.name} satın alma talebiniz alındı. Ödeme için personelimiz sizinle iletişime geçecektir.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Üyelik</h1>
      </div>
      
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Mevcut Üyelik</TabsTrigger>
          <TabsTrigger value="history">Geçmiş</TabsTrigger>
          <TabsTrigger value="purchase">Paket Satın Al</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Mevcut Üyelik</CardTitle>
                  <CardDescription>Aktif üyelik detaylarınız</CardDescription>
                </div>
                <Badge 
                  variant={currentMembership.status === "active" ? "default" : "secondary"}
                  className={
                    currentMembership.status === "active" 
                      ? "bg-green-500" 
                      : currentMembership.status === "frozen" 
                      ? "bg-blue-500" 
                      : "bg-red-500"
                  }
                >
                  {currentMembership.status === "active" 
                    ? "Aktif" 
                    : currentMembership.status === "frozen" 
                    ? "Dondurulmuş" 
                    : "Süresi Dolmuş"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Paket Tipi</p>
                  <p className="font-medium">{currentMembership.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Durum</p>
                  <p className="font-medium">
                    {currentMembership.status === "active" 
                      ? "Aktif" 
                      : currentMembership.status === "frozen" 
                      ? "Dondurulmuş" 
                      : "Süresi Dolmuş"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Başlangıç Tarihi</p>
                  <p className="font-medium">{currentMembership.startDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Bitiş Tarihi</p>
                  <p className="font-medium">{currentMembership.endDate}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Kalan Dersler</p>
                  <p className="font-medium">{currentMembership.remainingSessions} / {currentMembership.totalSessions}</p>
                </div>
                <Progress value={(currentMembership.remainingSessions / currentMembership.totalSessions) * 100} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-2">
              <Button variant="outline" onClick={handleFreezeMembership}>
                <Clock className="mr-2 h-4 w-4" />
                Üyeliği Dondur
              </Button>
              <Button onClick={handleRenew}>
                <CreditCard className="mr-2 h-4 w-4" />
                Üyeliği Yenile
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="space-y-4">
            {membershipHistory.map((membership, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{membership.type}</CardTitle>
                    <Badge variant="outline">Tamamlandı</Badge>
                  </div>
                  <CardDescription>
                    {membership.startDate} - {membership.endDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm">Kullanılan Dersler:</p>
                      <p>{membership.usedSessions} / {membership.totalSessions}</p>
                    </div>
                    <Progress value={(membership.usedSessions / membership.totalSessions) * 100} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="purchase">
          <div className="grid gap-4 md:grid-cols-3">
            {availablePackages.map((pkg) => (
              <Card key={pkg.id} className={pkg.popular ? "border-primary" : ""}>
                {pkg.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    En Popüler
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>{pkg.sessions} Seans</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Özellikler:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-primary mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() => handlePurchase(pkg.id)}
                  >
                    Satın Al
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Memberships;
