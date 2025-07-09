import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Atom, Play, BookOpen, Trophy, User } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Learn",
      description: "Discover metals and non-metals",
      icon: BookOpen,
      path: "/learn",
      gradient: "bg-gradient-metal"
    },
    {
      title: "Play",
      description: "Fun games and activities",
      icon: Play,
      path: "/play",
      gradient: "bg-gradient-nonmetal"
    },
    {
      title: "Quiz",
      description: "Test your knowledge",
      icon: Trophy,
      path: "/quiz",
      gradient: "bg-gradient-primary"
    },
    {
      title: "About Creator",
      description: "Meet Harish Chillapalli",
      icon: User,
      path: "/about",
      gradient: "bg-gradient-rainbow"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-metal-gold animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-nonmetal-oxygen animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 rounded-full bg-metal-copper animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 rounded-full bg-nonmetal-sulfur animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 text-center">
        {/* Header */}
        <div className="mb-12 animate-bounce-in">
          <div className="flex items-center justify-center mb-4">
            <Atom className="w-16 h-16 text-white animate-glow mr-4" />
            <h1 className="text-6xl font-display text-white drop-shadow-lg">
              MetalMind
            </h1>
            <Atom className="w-16 h-16 text-white animate-glow ml-4" />
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Learn Metals & Non-Metals through Fun & Play! 🧪✨
          </p>
          <p className="text-lg text-white/80 mt-2">
            An interactive science adventure for curious minds aged 8-14
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {menuItems.map((item, index) => (
            <Card 
              key={item.title} 
              className="p-6 hover:scale-105 transition-bounce cursor-pointer shadow-card border-none animate-bounce-in"
              style={{animationDelay: `${index * 0.2}s`}}
              onClick={() => navigate(item.path)}
            >
              <div className={`${item.gradient} p-4 rounded-lg mb-4 inline-block`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>

        {/* Welcome Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto animate-bounce-in" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-bold text-white mb-3">Welcome Young Scientist! 🔬</h2>
          <p className="text-white/90">
            Ready to explore the amazing world of elements? Click on any section above to start your scientific journey!
          </p>
        </div>

        {/* Fun Facts Ticker */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-full py-3 px-6 inline-block">
          <p className="text-white/80 text-sm animate-pulse">
            💡 Did you know? Your pencil lead is made of graphite - a non-metal!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;