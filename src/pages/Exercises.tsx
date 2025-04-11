
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, ArrowRight } from "lucide-react";

// Sample exercises data
const exercisesData = [
  {
    id: 1,
    name: "Temel Reformer Egzersizleri",
    difficulty: "Başlangıç",
    duration: "30 dakika",
    category: "Reformer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Reformer Pilates'e yeni başlayanlar için temel hareketleri içeren bir egzersiz programı.",
  },
  {
    id: 2,
    name: "Core Güçlendirme",
    difficulty: "Orta",
    duration: "45 dakika",
    category: "Reformer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Karın ve sırt kaslarını güçlendirmeye odaklanan orta seviye reformer egzersizleri.",
  },
  {
    id: 3,
    name: "Alt Vücut Güçlendirme",
    difficulty: "Orta",
    duration: "40 dakika",
    category: "Reformer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Bacak ve kalça kaslarını hedefleyen reformer pilates egzersizleri.",
  },
  {
    id: 4,
    name: "Üst Vücut Güçlendirme",
    difficulty: "Orta",
    duration: "35 dakika",
    category: "Reformer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Kol, omuz ve göğüs kaslarını güçlendirmeye odaklanan reformer egzersizleri.",
  },
  {
    id: 5,
    name: "İleri Seviye Reformer",
    difficulty: "İleri",
    duration: "60 dakika",
    category: "Reformer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "İleri seviye pilates uygulayıcıları için zorlayıcı reformer egzersizleri.",
  },
  {
    id: 6,
    name: "Esneklik ve Denge",
    difficulty: "Tüm Seviyeler",
    duration: "50 dakika",
    category: "Mat",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Esnekliği artırmaya ve dengeyi geliştirmeye odaklanan mat pilates egzersizleri.",
  },
];

// Favorite exercises
const favoriteExercises = [1, 3, 5];

const Exercises = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  
  // Filter exercises based on search query and difficulty
  const filteredExercises = exercisesData.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === "all" || exercise.difficulty === difficultyFilter;
    
    return matchesSearch && matchesDifficulty;
  });
  
  const favorites = exercisesData.filter(ex => favoriteExercises.includes(ex.id));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Egzersizler</h1>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tüm Egzersizler</TabsTrigger>
          <TabsTrigger value="favorites">Favorilerim</TabsTrigger>
          <TabsTrigger value="recommended">Önerilen</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Egzersiz ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Zorluk Seviyesi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Seviyeler</SelectItem>
                <SelectItem value="Başlangıç">Başlangıç</SelectItem>
                <SelectItem value="Orta">Orta</SelectItem>
                <SelectItem value="İleri">İleri</SelectItem>
                <SelectItem value="Tüm Seviyeler">Tüm Seviyeler</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{exercise.description.substring(0, 80)}...</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {exercise.duration}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/exercises/${exercise.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Detayları Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredExercises.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Arama kriterlerinize uygun egzersiz bulunamadı.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((exercise) => (
              <Card key={exercise.id} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{exercise.description.substring(0, 80)}...</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {exercise.duration}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/exercises/${exercise.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Detayları Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {favorites.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Henüz favori egzersiziniz bulunmuyor.</p>
              <Button className="mt-4" variant="outline" asChild>
                <Link to="/exercises?tab=all">Egzersizlere Göz At</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exercisesData.slice(0, 3).map((exercise) => (
              <Card key={exercise.id} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{exercise.description.substring(0, 80)}...</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {exercise.duration}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/exercises/${exercise.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Detayları Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Exercises;
