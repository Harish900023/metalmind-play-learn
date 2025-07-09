import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Trophy, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DragItem {
  id: string;
  name: string;
  type: 'metal' | 'non-metal';
  emoji: string;
  color: string;
}

const gameItems: DragItem[] = [
  { id: 'gold', name: 'Gold Ring', type: 'metal', emoji: '💍', color: 'bg-metal-gold' },
  { id: 'oxygen', name: 'Oxygen Tank', type: 'non-metal', emoji: '🫁', color: 'bg-nonmetal-oxygen' },
  { id: 'copper', name: 'Copper Wire', type: 'metal', emoji: '🔌', color: 'bg-metal-copper' },
  { id: 'carbon', name: 'Pencil', type: 'non-metal', emoji: '✏️', color: 'bg-nonmetal-carbon' },
  { id: 'aluminum', name: 'Aluminum Can', type: 'metal', emoji: '🥤', color: 'bg-metal-silver' },
  { id: 'sulfur', name: 'Sulfur Powder', type: 'non-metal', emoji: '🟡', color: 'bg-nonmetal-sulfur' }
];

const PlaySection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [score, setScore] = useState(0);
  const [metalBox, setMetalBox] = useState<DragItem[]>([]);
  const [nonMetalBox, setNonMetalBox] = useState<DragItem[]>([]);
  const [remainingItems, setRemainingItems] = useState<DragItem[]>(gameItems);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDrop = (boxType: 'metal' | 'non-metal') => {
    if (!draggedItem) return;

    const isCorrect = draggedItem.type === boxType;
    
    if (isCorrect) {
      if (boxType === 'metal') {
        setMetalBox([...metalBox, draggedItem]);
      } else {
        setNonMetalBox([...nonMetalBox, draggedItem]);
      }
      setRemainingItems(remainingItems.filter(item => item.id !== draggedItem.id));
      setScore(score + 10);
      
      toast({
        title: "Correct! 🎉",
        description: `${draggedItem.name} is indeed a ${boxType}!`,
        className: "bg-success text-success-foreground"
      });

      // Celebrate with audio feedback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Great job!");
        utterance.rate = 1.2;
        utterance.pitch = 1.5;
        speechSynthesis.speak(utterance);
      }
    } else {
      toast({
        title: "Oops! Try again 😊",
        description: `${draggedItem.name} belongs in the other box!`,
        variant: "destructive"
      });
    }
    
    setDraggedItem(null);
  };

  const resetGame = () => {
    setGameState('playing');
    setScore(0);
    setMetalBox([]);
    setNonMetalBox([]);
    setRemainingItems(gameItems);
    setDraggedItem(null);
  };

  useEffect(() => {
    if (remainingItems.length === 0) {
      setGameState('finished');
      toast({
        title: "Congratulations! 🏆",
        description: `You've sorted all items correctly! Final score: ${score}`,
        className: "bg-success text-success-foreground"
      });
    }
  }, [remainingItems.length, score]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-nonmetal p-6 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 transition-bounce"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-display">Play & Sort 🎮</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm opacity-80">Score</div>
              <div className="text-2xl font-bold">{score}</div>
            </div>
            <Button 
              onClick={resetGame}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {gameState === 'finished' ? (
          /* Game Finished Screen */
          <Card className="max-w-2xl mx-auto p-8 text-center shadow-float animate-bounce-in">
            <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-display mb-4">Fantastic Work! 🎉</h2>
            <p className="text-xl text-muted-foreground mb-4">
              You've successfully sorted all elements!
            </p>
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-accent fill-current" />
              ))}
            </div>
            <div className="text-2xl font-bold text-primary mb-6">
              Final Score: {score} points
            </div>
            <div className="space-y-4">
              <Button 
                onClick={resetGame}
                className="bg-gradient-primary text-white px-8 py-3 transition-bounce"
              >
                Play Again
              </Button>
              <Button 
                onClick={() => navigate('/quiz')}
                variant="outline"
                className="px-8 py-3 transition-bounce"
              >
                Take Quiz Next
              </Button>
            </div>
          </Card>
        ) : (
          /* Game Playing Screen */
          <div>
            {/* Instructions */}
            <Card className="p-6 mb-8 text-center shadow-card">
              <h2 className="text-2xl font-bold mb-2">Sort the Elements! 🎯</h2>
              <p className="text-muted-foreground">
                Drag each item to the correct box - Metals or Non-Metals
              </p>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items to Sort */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold text-center mb-4">Items to Sort</h3>
                <div className="space-y-3">
                  {remainingItems.map((item) => (
                    <Card
                      key={item.id}
                      className="p-4 cursor-grab active:cursor-grabbing hover:scale-105 transition-bounce shadow-card"
                      draggable
                      onDragStart={() => handleDragStart(item)}
                      onClick={() => handleDragStart(item)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${item.color} p-2 rounded-lg`}>
                          <span className="text-2xl">{item.emoji}</span>
                        </div>
                        <span className="font-semibold">{item.name}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Drop Zones */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Metal Box */}
                <Card
                  className="p-6 min-h-[300px] bg-gradient-metal border-dashed border-4 hover:shadow-glow transition-all duration-300"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop('metal')}
                  onClick={() => draggedItem && handleDrop('metal')}
                >
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    🪙 Metals
                  </h3>
                  <div className="space-y-3">
                    {metalBox.map((item) => (
                      <div key={item.id} className="bg-white/20 p-3 rounded-lg flex items-center space-x-3">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="text-white font-semibold">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  {metalBox.length === 0 && (
                    <div className="text-center text-white/60 mt-8">
                      Drop metal items here
                    </div>
                  )}
                </Card>

                {/* Non-Metal Box */}
                <Card
                  className="p-6 min-h-[300px] bg-gradient-nonmetal border-dashed border-4 hover:shadow-glow transition-all duration-300"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop('non-metal')}
                  onClick={() => draggedItem && handleDrop('non-metal')}
                >
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    🌬️ Non-Metals
                  </h3>
                  <div className="space-y-3">
                    {nonMetalBox.map((item) => (
                      <div key={item.id} className="bg-white/20 p-3 rounded-lg flex items-center space-x-3">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="text-white font-semibold">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  {nonMetalBox.length === 0 && (
                    <div className="text-center text-white/60 mt-8">
                      Drop non-metal items here
                    </div>
                  )}
                </Card>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-8 text-center">
              <div className="text-sm text-muted-foreground mb-2">
                Progress: {gameItems.length - remainingItems.length} / {gameItems.length}
              </div>
              <div className="w-full bg-muted rounded-full h-3 max-w-md mx-auto">
                <div 
                  className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((gameItems.length - remainingItems.length) / gameItems.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaySection;