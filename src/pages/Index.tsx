import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';

interface GameCurrency {
  id: string;
  game: string;
  currency: string;
  price: number;
  stock: number;
  icon: string;
  popular: boolean;
}

const mockCurrencies: GameCurrency[] = [
  { id: '1', game: 'Counter-Strike 2', currency: 'CS2 Coins', price: 1.25, stock: 10000, icon: '🔫', popular: true },
  { id: '2', game: 'Dota 2', currency: 'Battle Points', price: 0.85, stock: 25000, icon: '⚔️', popular: true },
  { id: '3', game: 'World of Warcraft', currency: 'WoW Gold', price: 2.50, stock: 5000, icon: '⚡', popular: true },
  { id: '4', game: 'Fortnite', currency: 'V-Bucks', price: 1.50, stock: 15000, icon: '🏗️', popular: false },
  { id: '5', game: 'Valorant', currency: 'VP Points', price: 1.10, stock: 8000, icon: '🎯', popular: false },
  { id: '6', game: 'League of Legends', currency: 'RP Points', price: 0.95, stock: 20000, icon: '⚡', popular: true },
  { id: '7', game: 'Standoff 2', currency: 'Gold', price: 0.75, stock: 12000, icon: '🏆', popular: false },
  { id: '8', game: 'PUBG Mobile', currency: 'UC Points', price: 1.35, stock: 18000, icon: '🪂', popular: false },
  { id: '9', game: 'Free Fire', currency: 'Diamonds', price: 0.65, stock: 22000, icon: '💎', popular: false },
  { id: '10', game: 'Mobile Legends', currency: 'Diamonds', price: 0.80, stock: 16000, icon: '🛡️', popular: false },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<GameCurrency | null>(null);
  const { toast } = useToast();

  const filteredCurrencies = mockCurrencies.filter(currency =>
    currency.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularCurrencies = mockCurrencies.filter(currency => currency.popular);

  const handlePurchase = (currency: GameCurrency) => {
    setSelectedCurrency(currency);
    
    toast({
      title: "Заказ принят! 🚀",
      description: `${currency.currency} - $${currency.price} добавлен в обработку`,
    });

    setTimeout(() => {
      toast({
        title: "Обработка завершена ✅",
        description: `Ваш ${currency.currency} готов к получению!`,
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary animate-glow">
                🎮 GameCurrency
              </h1>
              <Badge variant="secondary" className="cyber-glow">
                Pro Market
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="hover:text-primary">
                <Icon name="Home" size={16} className="mr-2" />
                Главная
              </Button>
              <Button variant="ghost" className="hover:text-primary">
                <Icon name="Gamepad2" size={16} className="mr-2" />
                Каталог
              </Button>
              <Button variant="ghost" className="hover:text-primary">
                <Icon name="User" size={16} className="mr-2" />
                Кабинет
              </Button>
              <Button variant="ghost" className="hover:text-primary">
                <Icon name="Shield" size={16} className="mr-2" />
                Гарантии
              </Button>
              <Button variant="ghost" className="hover:text-primary">
                <Icon name="MessageSquare" size={16} className="mr-2" />
                Поддержка
              </Button>
            </nav>
            <Button className="cyber-glow hover:animate-glow">
              <Icon name="User" size={16} className="mr-2" />
              Вход
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        <div className="absolute inset-0 bg-[url('/img/c4d51884-0d01-490e-9adf-f19c6878bdcc.jpg')] bg-cover bg-center opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              ИГРОВЫЕ
              <span className="text-primary block animate-glow">ВАЛЮТЫ</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Мгновенная покупка внутриигровых валют для всех популярных игр.
              Безопасные сделки, мгновенные уведомления, лучшие цены.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Button size="lg" className="cyber-glow hover:animate-glow">
                <Icon name="Zap" size={20} className="mr-2" />
                Начать покупки
              </Button>
              <Button size="lg" variant="outline" className="cyber-border">
                <Icon name="Play" size={20} className="mr-2" />
                Как это работает
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="mb-12">
          <div className="relative max-w-md mx-auto">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск игры или валюты..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 cyber-border focus:cyber-glow"
            />
          </div>
        </div>

        {/* Popular Currencies */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">
            <Icon name="TrendingUp" size={32} className="inline mr-3 text-primary" />
            Популярные валюты
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCurrencies.map((currency) => (
              <Card key={currency.id} className="cyber-border hover:cyber-glow transition-all duration-300 group hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{currency.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{currency.game}</CardTitle>
                        <p className="text-sm text-muted-foreground">{currency.currency}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="cyber-glow">Топ</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-primary">
                      ${currency.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Icon name="Package" size={16} className="inline mr-1" />
                      {currency.stock.toLocaleString()} в наличии
                    </div>
                  </div>
                  <Button 
                    onClick={() => handlePurchase(currency)}
                    className="w-full cyber-glow hover:animate-glow group-hover:scale-105 transition-all"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Купить сейчас
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Full Catalog */}
        <section>
          <h3 className="text-3xl font-bold mb-8 text-center">
            <Icon name="Grid3X3" size={32} className="inline mr-3 text-secondary" />
            Полный каталог
          </h3>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="all">Все игры</TabsTrigger>
              <TabsTrigger value="popular">Популярные</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredCurrencies.map((currency) => (
                  <Card key={currency.id} className="cyber-border hover:cyber-glow transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{currency.icon}</span>
                        <div className="min-w-0">
                          <CardTitle className="text-sm truncate">{currency.game}</CardTitle>
                          <p className="text-xs text-muted-foreground truncate">{currency.currency}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-lg font-bold text-primary mb-2">
                        ${currency.price}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handlePurchase(currency)}
                        className="w-full cyber-glow"
                      >
                        Купить
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularCurrencies.map((currency) => (
                  <Card key={currency.id} className="cyber-border hover:cyber-glow transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{currency.icon}</span>
                        <div className="min-w-0">
                          <CardTitle className="text-sm truncate">{currency.game}</CardTitle>
                          <p className="text-xs text-muted-foreground truncate">{currency.currency}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">Топ</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-lg font-bold text-primary mb-2">
                        ${currency.price}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handlePurchase(currency)}
                        className="w-full cyber-glow"
                      >
                        Купить
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Features Section */}
        <section className="py-16 mt-16">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Почему выбирают нас?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center cyber-glow">
                <Icon name="Zap" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2">Мгновенная доставка</h4>
              <p className="text-muted-foreground">Получайте валюту в игре за секунды после оплаты</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center cyber-glow">
                <Icon name="Shield" size={32} className="text-secondary" />
              </div>
              <h4 className="text-xl font-bold mb-2">100% безопасность</h4>
              <p className="text-muted-foreground">Все сделки защищены и гарантированы</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center cyber-glow">
                <Icon name="Bell" size={32} className="text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-2">Уведомления в реальном времени</h4>
              <p className="text-muted-foreground">Отслеживайте статус заказа на каждом этапе</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-bold text-lg mb-4 text-primary">GameCurrency</h5>
              <p className="text-muted-foreground">Лучший маркетплейс игровых валют с мгновенной доставкой</p>
            </div>
            <div>
              <h6 className="font-bold mb-4">Популярные игры</h6>
              <ul className="space-y-2 text-muted-foreground">
                <li>Counter-Strike 2</li>
                <li>Dota 2</li>
                <li>World of Warcraft</li>
                <li>Valorant</li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4">Поддержка</h6>
              <ul className="space-y-2 text-muted-foreground">
                <li>Служба поддержки</li>
                <li>Гарантии</li>
                <li>Возврат средств</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4">Контакты</h6>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center">
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  24/7 Онлайн чат
                </div>
                <div className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-2" />
                  support@gamecurrency.com
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 GameCurrency. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}