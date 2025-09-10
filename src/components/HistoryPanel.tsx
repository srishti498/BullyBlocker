import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, AlertTriangle, Search, Filter, Clock, Flag } from "lucide-react";

interface HistoryItem {
  id: string;
  text: string;
  result: "Safe" | "Bullying" | "Potential Risk";
  confidence: number;
  timestamp: Date;
  language: string;
  detectedWords: string[];
}

// Mock data
const mockHistory: HistoryItem[] = [
  {
    id: "1",
    text: "You're such an amazing person! Keep up the great work!",
    result: "Safe",
    confidence: 98,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    language: "English",
    detectedWords: []
  },
  {
    id: "2", 
    text: "You're so stupid and worthless, nobody likes you",
    result: "Bullying",
    confidence: 94,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    language: "English",
    detectedWords: ["stupid", "worthless"]
  },
  {
    id: "3",
    text: "That's kind of weird behavior if you ask me",
    result: "Potential Risk",
    confidence: 67,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    language: "English", 
    detectedWords: ["weird"]
  },
  {
    id: "4",
    text: "Thanks for helping me with the project today!",
    result: "Safe",
    confidence: 96,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    language: "English",
    detectedWords: []
  }
];

export const HistoryPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResult, setFilterResult] = useState("all");
  const [history] = useState<HistoryItem[]>(mockHistory);

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterResult === "all" || item.result === filterResult;
    return matchesSearch && matchesFilter;
  });

  const getResultIcon = (result: string) => {
    switch (result) {
      case "Safe":
        return <Shield className="h-4 w-4 text-safe" />;
      case "Bullying":
        return <AlertTriangle className="h-4 w-4 text-danger" />;
      case "Potential Risk":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getResultBadge = (result: string, confidence: number) => {
    const variant = result === "Safe" ? "default" : result === "Bullying" ? "destructive" : "secondary";
    return (
      <Badge variant={variant} className="text-xs">
        {result} ({confidence}%)
      </Badge>
    );
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-trust" />
          Detection History
        </CardTitle>
        
        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterResult} onValueChange={setFilterResult}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              <SelectItem value="Safe">Safe Only</SelectItem>
              <SelectItem value="Bullying">Bullying Only</SelectItem>
              <SelectItem value="Potential Risk">Potential Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No history found matching your criteria.</p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <Card key={item.id} className="border border-border/50">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {getResultIcon(item.result)}
                      {getResultBadge(item.result, item.confidence)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Flag className="h-3 w-3 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm bg-muted/30 p-3 rounded border-l-2 border-l-border">
                    "{item.text}"
                  </p>
                  
                  {item.detectedWords.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Flagged Terms:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.detectedWords.map((word, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {word}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>{item.timestamp.toLocaleString()}</span>
                    <span>{item.language}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};