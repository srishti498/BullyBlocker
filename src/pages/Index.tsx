import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetectionInterface } from "@/components/DetectionInterface";
import { HistoryPanel } from "@/components/HistoryPanel";
import { ModeratorDashboard } from "@/components/ModeratorDashboard";
import { TrustScore } from "@/components/TrustScore";
import { Shield, History, Settings, User } from "lucide-react";

const Index = () => {
  const [trustScore] = useState({
    score: 87,
    level: "Trusted",
    totalChecks: 45,
    safeChecks: 39
  });

  return (
    <div className="min-h-screen bg-gradient-cyber">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-full shadow-primary">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-trust bg-clip-text text-transparent">
                BullyBlocker
              </h1>
              <p className="text-muted-foreground">AI-Powered Cyberbullying Detection</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="detection" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="detection" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Detection
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  History
                </TabsTrigger>
                <TabsTrigger value="moderator" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Moderator
                </TabsTrigger>
              </TabsList>

              <TabsContent value="detection">
                <DetectionInterface />
              </TabsContent>

              <TabsContent value="history">
                <HistoryPanel />
              </TabsContent>

              <TabsContent value="moderator">
                <ModeratorDashboard />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TrustScore {...trustScore} />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-card p-4 rounded-lg shadow-elegant">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-safe" />
                  <span className="text-sm font-medium">Today's Safe Content</span>
                </div>
                <div className="text-2xl font-bold text-safe">24</div>
              </div>
              
              <div className="bg-card p-4 rounded-lg shadow-elegant">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-trust" />
                  <span className="text-sm font-medium">Community Impact</span>
                </div>
                <div className="text-2xl font-bold text-trust">+15</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
