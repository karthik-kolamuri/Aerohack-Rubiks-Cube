import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Timer, Target, TrendingUp, Camera, FileInput } from 'lucide-react';
import { toast } from 'sonner';

interface SolverInterfaceProps {
  onSolveStart: () => void;
  isSpinning: boolean;
}

export const SolverInterface = ({ onSolveStart, isSpinning }: SolverInterfaceProps) => {
  const [solving, setSolving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [solution, setSolution] = useState<string[]>([]);
  const [stats, setStats] = useState({
    averageMoves: 17,
    solveTime: 2.4,
    totalSolves: 127,
    bestTime: 1.2
  });

  const simulateSolve = async () => {
    setSolving(true);
    setProgress(0);
    onSolveStart();
    
    toast("Initializing Kociemba's Two-Phase Algorithm...");
    
    // Simulate Phase 1
    for (let i = 0; i <= 50; i++) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    
    toast("Phase 1 Complete: Reached G1 subgroup");
    
    // Simulate Phase 2
    for (let i = 50; i <= 100; i++) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 25));
    }
    
    const moves = ["U", "R", "U'", "R'", "F", "R", "F'", "U2", "R", "U'", "R'", "U", "R", "U", "R'"];
    setSolution(moves);
    setSolving(false);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalSolves: prev.totalSolves + 1,
      averageMoves: Math.round((prev.averageMoves * prev.totalSolves + moves.length) / (prev.totalSolves + 1)),
      solveTime: Math.round((Math.random() * 2 + 1.5) * 10) / 10
    }));
    
    toast.success(`Solution found in ${moves.length} moves!`);
  };

  return (
    <div className="space-y-6">
      {/* Algorithm Status */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Kociemba's Two-Phase Algorithm
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant={solving ? "default" : "secondary"}>
              {solving ? "Solving..." : "Ready"}
            </Badge>
          </div>
          
          {solving && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {progress < 50 ? "Phase 1: Orienting pieces..." : "Phase 2: Final solving..."}
              </p>
            </div>
          )}
          
          <Button 
            onClick={simulateSolve} 
            disabled={solving || isSpinning}
            className="w-full bg-gradient-to-r from-primary to-primary-glow"
          >
            {solving ? "Solving..." : "Start Kociemba Solve"}
          </Button>
        </CardContent>
      </Card>

      {/* Input Methods */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Cube Input Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="camera" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="camera">
                <Camera className="w-4 h-4 mr-2" />
                AI Camera
              </TabsTrigger>
              <TabsTrigger value="manual">
                <FileInput className="w-4 h-4 mr-2" />
                Manual
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="camera" className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Use AI-powered computer vision to scan your physical cube
              </p>
              <Button variant="outline" className="w-full" disabled>
                <Camera className="w-4 h-4 mr-2" />
                Scan Cube (Coming Soon)
              </Button>
            </TabsContent>
            
            <TabsContent value="manual" className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Manually input your cube state using the interactive interface
              </p>
              <Button variant="outline" className="w-full" disabled>
                <FileInput className="w-4 h-4 mr-2" />
                Manual Input (Coming Soon)
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Solution Display */}
      {solution.length > 0 && (
        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Solution ({solution.length} moves)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {solution.map((move, index) => (
                <Badge key={index} variant="outline" className="font-mono">
                  {move}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Stats */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Solve Time</span>
            </div>
            <p className="text-2xl font-bold">{stats.solveTime}s</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Avg Moves</span>
            </div>
            <p className="text-2xl font-bold">{stats.averageMoves}</p>
          </div>
          
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Best Time</span>
            <p className="text-lg font-semibold">{stats.bestTime}s</p>
          </div>
          
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Total Solves</span>
            <p className="text-lg font-semibold">{stats.totalSolves}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};