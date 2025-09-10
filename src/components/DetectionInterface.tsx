import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Send, Languages, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DetectionResult {
  result: "Safe" | "Bullying" | "Potential Risk";
  confidence: number;
  explanation: string;
  detectedWords: string[];
  timestamp: Date;
  language: string;
}

export const DetectionInterface = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [language, setLanguage] = useState("auto");

  const mockAnalyze = async (inputText: string): Promise<DetectionResult> => {
    // Mock ML analysis - replace with real API call
    const bullying_keywords = ["stupid", "dumb", "idiot", "hate", "kill", "die", "worthless", "ugly", "loser"];
    const potentialKeywords = ["annoying", "weird", "strange"];
    
    const words = inputText.toLowerCase().split(/\s+/);
    const detectedBullying = words.filter(word => bullying_keywords.some(keyword => word.includes(keyword)));
    const detectedPotential = words.filter(word => potentialKeywords.some(keyword => word.includes(keyword)));
    
    let result: "Safe" | "Bullying" | "Potential Risk" = "Safe";
    let confidence = 95;
    let explanation = "Content appears safe and positive.";
    let detectedWords: string[] = [];

    if (detectedBullying.length > 0) {
      result = "Bullying";
      confidence = Math.min(95, 70 + detectedBullying.length * 10);
      explanation = `Detected harmful language: ${detectedBullying.join(", ")}`;
      detectedWords = detectedBullying;
    } else if (detectedPotential.length > 0) {
      result = "Potential Risk";
      confidence = Math.min(75, 40 + detectedPotential.length * 15);
      explanation = `Potentially concerning language detected: ${detectedPotential.join(", ")}`;
      detectedWords = detectedPotential;
    }

    return {
      result,
      confidence,
      explanation,
      detectedWords,
      timestamp: new Date(),
      language: language === "auto" ? "English" : language
    };
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysisResult = await mockAnalyze(text);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case "Safe":
        return <Shield className="h-6 w-6 text-safe" />;
      case "Bullying":
        return <AlertTriangle className="h-6 w-6 text-danger" />;
      case "Potential Risk":
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };

  const getResultCardClass = (result: string) => {
    switch (result) {
      case "Safe":
        return "border-safe bg-safe-muted shadow-safe";
      case "Bullying":
        return "border-danger bg-danger-muted shadow-danger";
      case "Potential Risk":
        return "border-warning bg-warning-muted";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary text-primary-foreground rounded-full">
          <Shield className="h-5 w-5" />
          <span className="font-semibold">BullyBlocker AI Detection</span>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Paste any message, comment, or text below to analyze it for cyberbullying, harassment, or harmful content using advanced AI detection.
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Hinglish">Hinglish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Textarea
            placeholder="Paste the message or comment you want to analyze for bullying or harmful content..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-32"
          />

          <Button 
            onClick={handleAnalyze} 
            disabled={!text.trim() || isAnalyzing}
            className="w-full bg-gradient-primary hover:opacity-90"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Analyze Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className={`animate-fade-in ${getResultCardClass(result.result)}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getResultIcon(result.result)}
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {result.result === "Safe" ? "✅ Content is Safe" : 
                     result.result === "Bullying" ? "❌ Bullying Detected" : 
                     "⚠️ Potential Risk"}
                  </h3>
                  <Badge variant="outline" className="text-sm">
                    {result.confidence}% confidence
                  </Badge>
                </div>
                
                <p className="text-sm opacity-90">{result.explanation}</p>
                
                {result.detectedWords.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wide opacity-70">
                      Flagged Terms:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.detectedWords.map((word, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {result.timestamp.toLocaleTimeString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Languages className="h-3 w-3" />
                    {result.language}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};