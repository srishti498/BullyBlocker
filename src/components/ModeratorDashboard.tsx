import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye,
  Flag,
  Users,
  TrendingDown,
  TrendingUp
} from "lucide-react";

interface FlaggedItem {
  id: string;
  text: string;
  result: "Bullying" | "Potential Risk";
  confidence: number;
  timestamp: Date;
  reportedBy: string;
  status: "pending" | "approved" | "rejected";
  detectedWords: string[];
}

interface ModeratorStats {
  totalReports: number;
  pendingReports: number;
  approvedToday: number;
  falsePositives: number;
}

// Mock data
const mockFlaggedItems: FlaggedItem[] = [
  {
    id: "1",
    text: "You're such a loser, nobody will ever like you",
    result: "Bullying", 
    confidence: 92,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    reportedBy: "user123",
    status: "pending",
    detectedWords: ["loser"]
  },
  {
    id: "2",
    text: "That's a weird way to do things, don't you think?",
    result: "Potential Risk",
    confidence: 68,
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    reportedBy: "user456", 
    status: "pending",
    detectedWords: ["weird"]
  },
  {
    id: "3",
    text: "You're stupid if you believe that nonsense",
    result: "Bullying",
    confidence: 87,
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    reportedBy: "user789",
    status: "approved",
    detectedWords: ["stupid"]
  }
];

const mockStats: ModeratorStats = {
  totalReports: 156,
  pendingReports: 23,
  approvedToday: 12,
  falsePositives: 8
};

export const ModeratorDashboard = () => {
  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>(mockFlaggedItems);
  const [filterStatus, setFilterStatus] = useState("pending");
  const [stats] = useState<ModeratorStats>(mockStats);

  const handleApprove = (id: string) => {
    setFlaggedItems(items =>
      items.map(item =>
        item.id === id ? { ...item, status: "approved" as const } : item
      )
    );
  };

  const handleReject = (id: string) => {
    setFlaggedItems(items =>
      items.map(item =>
        item.id === id ? { ...item, status: "rejected" as const } : item
      )
    );
  };

  const filteredItems = flaggedItems.filter(item => 
    filterStatus === "all" || item.status === filterStatus
  );

  const getResultIcon = (result: string) => {
    return result === "Bullying" 
      ? <AlertTriangle className="h-4 w-4 text-danger" />
      : <AlertTriangle className="h-4 w-4 text-warning" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending Review</Badge>;
      case "approved":
        return <Badge variant="destructive">Confirmed Bullying</Badge>;
      case "rejected":
        return <Badge variant="default">False Positive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary text-primary-foreground rounded-full">
          <Shield className="h-5 w-5" />
          <span className="font-semibold">Moderator Dashboard</span>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Review and moderate flagged content to improve detection accuracy and maintain community safety.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{stats.totalReports}</p>
              </div>
              <Flag className="h-8 w-8 text-trust" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{stats.pendingReports}</p>
              </div>
              <Eye className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold text-danger">{stats.approvedToday}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-danger" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">False Positives</p>
                <p className="text-2xl font-bold text-safe">{stats.falsePositives}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-safe" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Flagged Content Review */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-trust" />
              Flagged Content Review
            </CardTitle>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No flagged content found for the selected filter.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="border border-border/50">
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {getResultIcon(item.result)}
                        <div>
                          <Badge variant="outline" className="text-xs mb-1">
                            {item.result} - {item.confidence}% confidence
                          </Badge>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(item.status)}
                          </div>
                        </div>
                      </div>
                      
                      {item.status === "pending" && (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReject(item.id)}
                            className="text-safe border-safe hover:bg-safe hover:text-safe-foreground"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            False Positive
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApprove(item.id)}
                            className="text-danger border-danger hover:bg-danger hover:text-danger-foreground"  
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Confirm Bullying
                          </Button>
                        </div>
                      )}
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
                      <div className="flex items-center gap-4">
                        <span>{item.timestamp.toLocaleString()}</span>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Reported by {item.reportedBy}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};