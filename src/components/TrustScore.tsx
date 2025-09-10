import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Award } from "lucide-react";

interface TrustScoreProps {
  score: number;
  level: string;
  totalChecks: number;
  safeChecks: number;
}

export const TrustScore = ({ score, level, totalChecks, safeChecks }: TrustScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-safe";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-trust" />
          Trust Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}
          </div>
          <Badge variant={getScoreBadgeVariant(score)} className="text-sm">
            {level} User
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Safe Content Ratio</span>
            </div>
            <span className="text-sm font-semibold">
              {totalChecks > 0 ? Math.round((safeChecks / totalChecks) * 100) : 0}%
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Total Checks</span>
            </div>
            <span className="text-sm font-semibold">{totalChecks}</span>
          </div>
        </div>

        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(score, 100)}%` }}
          />
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Your trust score increases with safe content checks and positive community engagement.
        </p>
      </CardContent>
    </Card>
  );
};