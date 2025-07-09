import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, XCircle, Trophy, Star, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  emoji: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Which of these is a metal?",
    options: ["Oxygen", "Gold", "Carbon", "Sulfur"],
    correctAnswer: 1,
    explanation: "Gold is a precious metal that's shiny and conducts electricity!",
    emoji: "🥇"
  },
  {
    id: 2,
    question: "What do we breathe to stay alive?",
    options: ["Carbon", "Sulfur", "Oxygen", "Aluminum"],
    correctAnswer: 2,
    explanation: "Oxygen is essential for life - we breathe it in from the air!",
    emoji: "💨"
  },
  {
    id: 3,
    question: "Which property is common in metals?",
    options: ["They are brittle", "They conduct electricity", "They are gases", "They smell bad"],
    correctAnswer: 1,
    explanation: "Metals are great conductors of electricity - that's why wires are made of metal!",
    emoji: "⚡"
  },
  {
    id: 4,
    question: "What is pencil lead made of?",
    options: ["Lead metal", "Graphite (Carbon)", "Gold", "Silver"],
    correctAnswer: 1,
    explanation: "Pencil 'lead' is actually made of graphite, which is a form of carbon!",
    emoji: "✏️"
  },
  {
    id: 5,
    question: "Which of these metals can you find in coins?",
    options: ["Oxygen", "Copper", "Carbon", "Sulfur"],
    correctAnswer: 1,
    explanation: "Copper is used in coins because it's durable and doesn't rust easily!",
    emoji: "🪙"
  },
  {
    id: 6,
    question: "Non-metals are usually:",
    options: ["Shiny and hard", "Brittle or gaseous", "Good conductors", "Magnetic"],
    correctAnswer: 1,
    explanation: "Non-metals tend to be brittle when solid or exist as gases!",
    emoji: "🌬️"
  },
  {
    id: 7,
    question: "What gives rotten eggs their bad smell?",
    options: ["Gold", "Carbon", "Sulfur", "Aluminum"],
    correctAnswer: 2,
    explanation: "Sulfur compounds create that distinctive rotten egg smell!",
    emoji: "🥚"
  },
  {
    id: 8,
    question: "Which metal is used to make soda cans?",
    options: ["Gold", "Carbon", "Aluminum", "Sulfur"],
    correctAnswer: 2,
    explanation: "Aluminum is lightweight and perfect for making drink cans!",
    emoji: "🥤"
  },
  {
    id: 9,
    question: "Diamonds are made of which element?",
    options: ["Gold", "Carbon", "Oxygen", "Copper"],
    correctAnswer: 1,
    explanation: "Diamonds are pure carbon arranged in a special crystal structure!",
    emoji: "💎"
  },
  {
    id: 10,
    question: "Which property do all metals share?",
    options: ["They are yellow", "They smell", "They are shiny when polished", "They float"],
    correctAnswer: 2,
    explanation: "All metals have a characteristic metallic luster when polished!",
    emoji: "✨"
  }
];

const QuizSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 10);
      toast({
        title: "Correct! 🎉",
        description: "Great job!",
        className: "bg-success text-success-foreground"
      });
    } else {
      toast({
        title: "Not quite right 😊",
        description: "Don't worry, keep learning!",
        variant: "destructive"
      });
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
  };

  const getScoreRating = () => {
    const percentage = (score / (quizQuestions.length * 10)) * 100;
    if (percentage >= 90) return { rating: "Amazing!", stars: 5, emoji: "🏆" };
    if (percentage >= 80) return { rating: "Excellent!", stars: 4, emoji: "🌟" };
    if (percentage >= 70) return { rating: "Great!", stars: 3, emoji: "⭐" };
    if (percentage >= 60) return { rating: "Good!", stars: 2, emoji: "👍" };
    return { rating: "Keep Learning!", stars: 1, emoji: "📚" };
  };

  if (quizCompleted) {
    const scoreData = getScoreRating();
    return (
      <div className="min-h-screen bg-background">
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
            <h1 className="text-3xl font-display">Quiz Results 🏆</h1>
            <div></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto p-8 text-center shadow-float animate-bounce-in">
            <div className="text-6xl mb-4">{scoreData.emoji}</div>
            <h2 className="text-4xl font-display mb-4">{scoreData.rating}</h2>
            <p className="text-xl text-muted-foreground mb-6">
              You've completed the MetalMind Quiz!
            </p>
            
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-8 h-8 ${i < scoreData.stars ? 'text-accent fill-current' : 'text-muted'}`} 
                />
              ))}
            </div>

            <div className="text-3xl font-bold text-primary mb-2">
              {score} / {quizQuestions.length * 10} points
            </div>
            <div className="text-lg text-muted-foreground mb-8">
              {Math.round((score / (quizQuestions.length * 10)) * 100)}% correct
            </div>

            <div className="bg-gradient-rainbow p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold text-white mb-2">🎖️ You're now a MetalMind Champion!</h3>
              <p className="text-white">
                You've mastered the basics of metals and non-metals. Keep exploring science!
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={resetQuiz}
                className="bg-gradient-primary text-white px-8 py-3 transition-bounce"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                onClick={() => navigate('/play')}
                variant="outline"
                className="px-8 py-3 transition-bounce"
              >
                Play Games
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

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
          <h1 className="text-3xl font-display">Science Quiz 🧪</h1>
          <div className="text-right">
            <div className="text-sm opacity-80">Score</div>
            <div className="text-2xl font-bold">{score}</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <Card className="max-w-3xl mx-auto p-8 shadow-float animate-bounce-in">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">{question.emoji}</div>
            <h2 className="text-2xl font-bold">{question.question}</h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {question.options.map((option, index) => {
              let buttonClass = "p-4 text-left transition-bounce hover:scale-105";
              
              if (showExplanation) {
                if (index === question.correctAnswer) {
                  buttonClass += " bg-success text-success-foreground";
                } else if (index === selectedAnswer && index !== question.correctAnswer) {
                  buttonClass += " bg-error text-error-foreground";
                }
              } else if (selectedAnswer === index) {
                buttonClass += " bg-primary text-primary-foreground";
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showExplanation && index === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 ml-auto" />
                    )}
                    {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 ml-auto" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-muted p-6 rounded-lg mb-6 animate-bounce-in">
              <h3 className="font-bold mb-2">💡 Explanation:</h3>
              <p className="text-muted-foreground">{question.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center">
            {!showExplanation ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="bg-gradient-primary text-white px-8 py-3 transition-bounce"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-gradient-primary text-white px-8 py-3 transition-bounce"
              >
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuizSection;