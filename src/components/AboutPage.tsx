import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Github, Linkedin, Mail, Code, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-rainbow p-6 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 transition-bounce"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-display">About Creator 👨‍💻</h1>
          <div></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Creator Profile */}
        <Card className="max-w-4xl mx-auto p-8 shadow-float animate-bounce-in">
          <div className="text-center mb-8">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-glow animate-float">
              HC
            </div>
            <h2 className="text-4xl font-display mb-2">Harish Chillapalli</h2>
            <p className="text-xl text-primary font-semibold">Creative Software Engineering Student</p>
          </div>

          {/* About Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-error" />
                My Passion
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Hi there! I'm Harish, a passionate software engineering student who believes that 
                learning should be <strong>joyful, engaging, and fun</strong>! I created MetalMind 
                because I wanted to help children discover the amazing world of science through 
                interactive play and colorful visuals.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Code className="w-6 h-6 mr-2 text-primary" />
                My Mission
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                My goal is to make complex scientific concepts simple and accessible for young minds. 
                Through <strong>MetalMind</strong>, children can learn about metals and non-metals 
                without stress - purely through exploration, games, and interactive experiences that 
                spark curiosity!
              </p>
            </div>
          </div>

          {/* Skills & Technologies */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Technologies Used 🛠️</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "React", color: "bg-blue-500" },
                { name: "TypeScript", color: "bg-blue-600" },
                { name: "Tailwind CSS", color: "bg-cyan-500" },
                { name: "Vite", color: "bg-purple-500" }
              ].map((tech, index) => (
                <div 
                  key={tech.name} 
                  className="text-center animate-bounce-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`${tech.color} w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold shadow-card`}>
                    {tech.name.charAt(0)}
                  </div>
                  <p className="font-semibold">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Philosophy */}
          <div className="bg-gradient-primary p-6 rounded-lg text-white mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center">My Educational Philosophy 📚</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🎮</div>
                <h4 className="font-bold mb-2">Learn Through Play</h4>
                <p className="text-sm opacity-90">
                  Games and interactive activities make learning memorable and enjoyable
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎨</div>
                <h4 className="font-bold mb-2">Visual Learning</h4>
                <p className="text-sm opacity-90">
                  Colorful designs and animations help children understand concepts better
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌟</div>
                <h4 className="font-bold mb-2">Positive Reinforcement</h4>
                <p className="text-sm opacity-90">
                  Celebrating every achievement builds confidence and encourages exploration
                </p>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <Card className="p-6 bg-muted/30">
            <h3 className="text-xl font-bold mb-4">⚡ Fun Facts About This Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  Built with love and countless cups of coffee ☕
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  Features 10 interactive quiz questions 🧠
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  Includes drag-and-drop sorting games 🎯
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  Designed for kids aged 8-14 years 👶
                </p>
              </div>
            </div>
          </Card>

          {/* Contact & Connect */}
          <div className="text-center mt-8">
            <h3 className="text-2xl font-bold mb-4">Let's Connect! 🤝</h3>
            <p className="text-muted-foreground mb-6">
              Have feedback or ideas for making MetalMind even better? I'd love to hear from you!
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="transition-bounce">
                <Mail className="w-4 h-4 mr-2" />
                Email Me
              </Button>
              <Button variant="outline" className="transition-bounce">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="transition-bounce">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Signature */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-muted-foreground italic">
              "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
            </p>
            <div className="mt-4 font-display text-2xl text-primary">
              ~ Harish Chillapalli
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;