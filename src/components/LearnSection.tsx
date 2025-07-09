import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Element {
  id: string;
  name: string;
  type: 'metal' | 'non-metal';
  description: string;
  funFact: string;
  properties: string[];
  color: string;
  emoji: string;
}

const elements: Element[] = [
  {
    id: 'gold',
    name: 'Gold',
    type: 'metal',
    description: 'A precious yellow metal that never rusts or tarnishes.',
    funFact: 'Gold is so soft you can bend it with your hands!',
    properties: ['Shiny', 'Conducts electricity', 'Does not rust'],
    color: 'bg-metal-gold',
    emoji: '🥇'
  },
  {
    id: 'copper',
    name: 'Copper',
    type: 'metal',
    description: 'A reddish-brown metal used in wires and pipes.',
    funFact: 'The Statue of Liberty is made of copper - that\'s why it\'s green!',
    properties: ['Good conductor', 'Malleable', 'Turns green over time'],
    color: 'bg-metal-copper',
    emoji: '🔸'
  },
  {
    id: 'aluminum',
    name: 'Aluminum',
    type: 'metal',
    description: 'A lightweight, silver metal used in cans and foil.',
    funFact: 'Aluminum cans can be recycled forever without losing quality!',
    properties: ['Lightweight', 'Resistant to rust', 'Recyclable'],
    color: 'bg-metal-silver',
    emoji: '🥤'
  },
  {
    id: 'oxygen',
    name: 'Oxygen',
    type: 'non-metal',
    description: 'An invisible gas that we breathe to stay alive.',
    funFact: 'Fish breathe oxygen too, but they get it from water!',
    properties: ['Colorless gas', 'Supports combustion', 'Essential for life'],
    color: 'bg-nonmetal-oxygen',
    emoji: '💨'
  },
  {
    id: 'carbon',
    name: 'Carbon',
    type: 'non-metal',
    description: 'Found in pencil lead (graphite) and diamonds.',
    funFact: 'Diamonds and pencil lead are both made of carbon!',
    properties: ['Can be hard or soft', 'Black in graphite form', 'Makes compounds easily'],
    color: 'bg-nonmetal-carbon',
    emoji: '✏️'
  },
  {
    id: 'sulfur',
    name: 'Sulfur',
    type: 'non-metal',
    description: 'A yellow powder that smells like rotten eggs.',
    funFact: 'Sulfur is what makes rotten eggs smell so bad!',
    properties: ['Yellow color', 'Brittle', 'Burns with blue flame'],
    color: 'bg-nonmetal-sulfur',
    emoji: '🟡'
  }
];

const LearnSection = () => {
  const navigate = useNavigate();
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const metals = elements.filter(el => el.type === 'metal');
  const nonMetals = elements.filter(el => el.type === 'non-metal');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 transition-bounce"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-display">Learn Elements 📚</h1>
          <div></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {selectedElement ? (
          /* Detailed Element View */
          <div className="animate-bounce-in">
            <Button 
              onClick={() => setSelectedElement(null)}
              className="mb-6 transition-bounce"
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Elements
            </Button>
            
            <Card className="max-w-4xl mx-auto p-8 shadow-float">
              <div className="text-center mb-8">
                <div className={`inline-block p-6 rounded-full ${selectedElement.color} mb-4`}>
                  <span className="text-6xl">{selectedElement.emoji}</span>
                </div>
                <h2 className="text-4xl font-display mb-2">{selectedElement.name}</h2>
                <span className={`inline-block px-4 py-2 rounded-full text-white text-sm font-bold ${
                  selectedElement.type === 'metal' ? 'bg-gradient-metal' : 'bg-gradient-nonmetal'
                }`}>
                  {selectedElement.type === 'metal' ? '🪙 Metal' : '🌬️ Non-Metal'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-primary" />
                    About {selectedElement.name}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    {selectedElement.description}
                  </p>
                  <Button 
                    onClick={() => playAudio(selectedElement.description)}
                    className="transition-bounce"
                    variant="outline"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen
                  </Button>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-accent" />
                    Properties
                  </h3>
                  <ul className="space-y-2">
                    {selectedElement.properties.map((property, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {property}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-rainbow rounded-lg text-center">
                <h3 className="text-xl font-bold text-white mb-2">🎉 Fun Fact!</h3>
                <p className="text-white text-lg">{selectedElement.funFact}</p>
              </div>
            </Card>
          </div>
        ) : (
          /* Elements Grid */
          <div>
            {/* Metals Section */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display mb-2">🪙 Metals</h2>
                <p className="text-muted-foreground">Shiny, strong, and conductive elements</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metals.map((element, index) => (
                  <Card 
                    key={element.id}
                    className="p-6 cursor-pointer hover:scale-105 transition-bounce shadow-card animate-bounce-in"
                    style={{animationDelay: `${index * 0.2}s`}}
                    onClick={() => setSelectedElement(element)}
                  >
                    <div className={`${element.color} p-4 rounded-lg mb-4 text-center`}>
                      <span className="text-4xl">{element.emoji}</span>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">{element.name}</h3>
                    <p className="text-muted-foreground text-center text-sm">
                      Click to learn more!
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Non-Metals Section */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display mb-2">🌬️ Non-Metals</h2>
                <p className="text-muted-foreground">Diverse elements with unique properties</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {nonMetals.map((element, index) => (
                  <Card 
                    key={element.id}
                    className="p-6 cursor-pointer hover:scale-105 transition-bounce shadow-card animate-bounce-in"
                    style={{animationDelay: `${(index + 3) * 0.2}s`}}
                    onClick={() => setSelectedElement(element)}
                  >
                    <div className={`${element.color} p-4 rounded-lg mb-4 text-center`}>
                      <span className="text-4xl">{element.emoji}</span>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">{element.name}</h3>
                    <p className="text-muted-foreground text-center text-sm">
                      Click to learn more!
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnSection;