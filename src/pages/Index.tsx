
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b py-4 px-6 bg-background">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Reformer Plates Pro</h1>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Giriş Yap</Button>
            </Link>
            <Link to="/register">
              <Button>Kayıt Ol</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col lg:flex-row items-center container mx-auto px-6 py-12 lg:py-24">
        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Reformer Plates Stüdyosu</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Üyelik durumunuzu takip edin, egzersizler hakkında bilgi alın ve randevularınızı kolayca yönetin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Hemen Başla
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Giriş Yap
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
              alt="Pilates Studio" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Özellikler</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Üyelik Takibi</h3>
              <p className="text-muted-foreground">Üyelik durumunuzu ve geçmişinizi kolayca takip edin.</p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Randevu Yönetimi</h3>
              <p className="text-muted-foreground">Randevularınızı görüntüleyin, değiştirin veya iptal edin.</p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Egzersiz Kütüphanesi</h3>
              <p className="text-muted-foreground">Detaylı egzersiz bilgileri ve videolarına erişin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Reformer Plates Pro. Tüm hakları saklıdır.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:underline">Gizlilik Politikası</a>
              <a href="#" className="hover:underline">Kullanım Koşulları</a>
              <a href="#" className="hover:underline">İletişim</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
