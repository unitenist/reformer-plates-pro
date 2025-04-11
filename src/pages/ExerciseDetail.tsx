
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Star, Heart, Share2, Play, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample exercises data
const exercisesData = [
  {
    id: 1,
    name: "Temel Reformer Egzersizleri",
    difficulty: "Başlangıç",
    duration: "30 dakika",
    category: "Reformer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Reformer Pilates'e yeni başlayanlar için temel hareketleri içeren bir egzersiz programı. Bu program ile vücudunuzun çekirdeğini güçlendirebilir, esnekliğinizi artırabilir ve postürünüzü geliştirebilirsiniz. Egzersizler, tüm vücut için düşük etkili ama yüksek verimli bir antrenman sunar.",
    instructor: "Ayşe Yılmaz",
    muscleGroups: ["Core", "Bacaklar", "Sırt", "Kollar"],
    benefits: [
      "Karın ve sırt kaslarını güçlendirir",
      "Esnekliği artırır",
      "Duruşu iyileştirir",
      "Dengeyi geliştirir",
      "Yaralanma riskini azaltır"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [
      {
        name: "Footwork",
        description: "Reformer'da ayak çalışması, bacak kaslarını güçlendirmeye odaklanır.",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      },
      {
        name: "Hundred",
        description: "Hundred egzersizi, karın kaslarını ve nefes kontrolünü geliştirir.",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      },
      {
        name: "Reformer Bridge",
        description: "Köprü hareketi, kalça ve sırt kaslarını güçlendirir.",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      },
      {
        name: "Single Leg Stretch",
        description: "Tek bacak germe hareketi, karın ve sırt kaslarını güçlendirir.",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      }
    ],
    tips: [
      "Hareketleri yavaş ve kontrollü yapın",
      "Nefes alıp vermeye dikkat edin",
      "Her harekette karın kaslarını sıkı tutun",
      "Omurganızı uzun tutmaya çalışın"
    ]
  },
  {
    id: 2,
    name: "Core Güçlendirme",
    difficulty: "Orta",
    duration: "45 dakika",
    category: "Reformer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Karın ve sırt kaslarını güçlendirmeye odaklanan orta seviye reformer egzersizleri.",
    instructor: "Mehmet Demir",
    muscleGroups: ["Core", "Sırt"],
    benefits: [
      "Karın kaslarını güçlendirir",
      "Sırt ağrılarını azaltır",
      "Duruşu iyileştirir",
      "Denge ve stabiliteyi artırır"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [
      {
        name: "Teaser",
        description: "Teaser hareketi, karın kaslarının güçlenmesine yardımcı olur.",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      },
      {
        name: "Long Stretch",
        description: "Uzun germe hareketi, omuz ve göğüs kaslarını çalıştırır.",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      }
    ],
    tips: [
      "Her hareketi yavaşça ve kontrollü yapın",
      "Omurganızı uzun tutun",
      "Nefesinize odaklanın"
    ]
  },
  {
    id: 3,
    name: "Alt Vücut Güçlendirme",
    difficulty: "Orta",
    duration: "40 dakika",
    category: "Reformer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Bacak ve kalça kaslarını hedefleyen reformer pilates egzersizleri.",
    instructor: "Zeynep Kaya",
    muscleGroups: ["Bacaklar", "Kalça"],
    benefits: [
      "Bacak kaslarını güçlendirir",
      "Kalça kaslarını şekillendirir",
      "Denge ve stabiliteyi artırır"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [],
    tips: []
  },
  {
    id: 4,
    name: "Üst Vücut Güçlendirme",
    difficulty: "Orta",
    duration: "35 dakika",
    category: "Reformer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Kol, omuz ve göğüs kaslarını güçlendirmeye odaklanan reformer egzersizleri.",
    instructor: "Ali Yıldız",
    muscleGroups: ["Kollar", "Omuzlar", "Göğüs"],
    benefits: [],
    videoUrl: "",
    steps: [],
    tips: []
  },
  {
    id: 5,
    name: "İleri Seviye Reformer",
    difficulty: "İleri",
    duration: "60 dakika",
    category: "Reformer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "İleri seviye pilates uygulayıcıları için zorlayıcı reformer egzersizleri.",
    instructor: "Ayşe Yılmaz",
    muscleGroups: [],
    benefits: [],
    videoUrl: "",
    steps: [],
    tips: []
  },
  {
    id: 6,
    name: "Esneklik ve Denge",
    difficulty: "Tüm Seviyeler",
    duration: "50 dakika",
    category: "Mat",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Esnekliği artırmaya ve dengeyi geliştirmeye odaklanan mat pilates egzersizleri.",
    instructor: "Zeynep Kaya",
    muscleGroups: [],
    benefits: [],
    videoUrl: "",
    steps: [],
    tips: []
  },
];

// Favorite exercises
const favoriteExercises = [1, 3, 5];

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(favoriteExercises.includes(Number(id)));
  
  const exercise = exercisesData.find(ex => ex.id === Number(id));
  
  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-bold mb-4">Egzersiz Bulunamadı</h1>
        <p className="text-muted-foreground mb-6">İstediğiniz egzersiz bulunamadı veya silindi.</p>
        <Button asChild>
          <Link to="/exercises">Tüm Egzersizlere Dön</Link>
        </Button>
      </div>
    );
  }
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    if (isFavorite) {
      toast({
        title: "Favorilerden Kaldırıldı",
        description: `${exercise.name} favorilerinizden kaldırıldı.`,
      });
    } else {
      toast({
        title: "Favorilere Eklendi",
        description: `${exercise.name} favorilerinize eklendi.`,
      });
    }
  };
  
  const handleShare = () => {
    toast({
      title: "Egzersiz Paylaşıldı",
      description: `Paylaşım linki panoya kopyalandı.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/exercises">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Link>
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg overflow-hidden">
          <img 
            src={exercise.image} 
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{exercise.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{exercise.difficulty}</Badge>
                <Badge variant="outline">{exercise.category}</Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={toggleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>{exercise.duration}</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-muted-foreground">{exercise.description}</p>
            
            {exercise.instructor && (
              <p className="text-sm">
                <span className="font-medium">Eğitmen:</span> {exercise.instructor}
              </p>
            )}
          </div>
          
          {exercise.muscleGroups && exercise.muscleGroups.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Çalışan Kas Grupları:</h3>
              <div className="flex flex-wrap gap-2">
                {exercise.muscleGroups.map((muscle, index) => (
                  <Badge key={index} variant="secondary">{muscle}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {exercise.benefits && exercise.benefits.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Faydaları:</h3>
              <ul className="space-y-1">
                {exercise.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="pt-4">
            {exercise.videoUrl ? (
              <Button className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Video Dersini İzle
              </Button>
            ) : (
              <Button className="w-full" disabled>
                <Play className="mr-2 h-4 w-4" />
                Video Ders Yakında
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="steps">Adımlar</TabsTrigger>
          <TabsTrigger value="tips">İpuçları</TabsTrigger>
          <TabsTrigger value="similar">Benzer Egzersizler</TabsTrigger>
        </TabsList>
        
        <TabsContent value="steps">
          {exercise.steps && exercise.steps.length > 0 ? (
            <div className="space-y-6">
              {exercise.steps.map((step, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3">
                        <img 
                          src={step.image} 
                          alt={step.name}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      </div>
                      <div className="md:w-2/3 space-y-2">
                        <h3 className="font-semibold text-lg">{index + 1}. {step.name}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Bu egzersiz için adım bilgisi henüz eklenmemiş.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="tips">
          {exercise.tips && exercise.tips.length > 0 ? (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Egzersiz İpuçları</h3>
                <ul className="space-y-3">
                  {exercise.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Bu egzersiz için ipucu henüz eklenmemiş.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="similar">
          <div className="grid md:grid-cols-3 gap-4">
            {exercisesData
              .filter(ex => ex.id !== exercise.id && ex.difficulty === exercise.difficulty)
              .slice(0, 3)
              .map(ex => (
                <Card key={ex.id} className="overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={ex.image}
                      alt={ex.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold">{ex.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {ex.duration}
                      </div>
                    </div>
                    <Link to={`/exercises/${ex.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Detayları Gör
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
          
          {exercisesData.filter(ex => ex.id !== exercise.id && ex.difficulty === exercise.difficulty).length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Benzer egzersiz bulunamadı.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExerciseDetail;
