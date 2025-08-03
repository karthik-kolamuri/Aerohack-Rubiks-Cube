import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, 
  Database, 
  Zap, 
  Code, 
  GitBranch, 
  Layers,
  Brain,
  Settings
} from 'lucide-react';
import algorithmBg from '@/assets/algorithm-bg.jpg';

export const TechSpecs = () => {
  return (
    <div className="space-y-6">
      <Card 
        className="border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 17, 23, 0.85), rgba(13, 17, 23, 0.85)), url(${algorithmBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Algorithm Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-background/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="phases">Two Phases</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Algorithm</span>
                  </div>
                  <Badge variant="outline">Kociemba's Two-Phase</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Complexity</span>
                  </div>
                  <Badge variant="outline">O(b^d) with pruning</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Memory</span>
                  </div>
                  <Badge variant="outline">~80MB Prune Tables</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Search</span>
                  </div>
                  <Badge variant="outline">IDA* with Heuristics</Badge>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="phases" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <h4 className="font-semibold text-primary mb-2">Phase 1: G0 → G1</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Orient all pieces and position middle edges
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Max 12 moves</Badge>
                    <Badge variant="secondary">All moves allowed</Badge>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-accent/20 bg-accent/5">
                  <h4 className="font-semibold text-accent mb-2">Phase 2: G1 → Solved</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Complete solve with restricted moves
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Max 18 moves</Badge>
                    <Badge variant="secondary">Limited moveset</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-sm">Average Moves</span>
                  <Badge variant="outline">&lt;19 moves</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-sm">Solve Time</span>
                  <Badge variant="outline">2-5 seconds</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-sm">Success Rate</span>
                  <Badge variant="outline">100%</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-sm">State Space</span>
                  <Badge variant="outline">4.33 × 10¹⁹</Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Data Structures */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-accent" />
            Advanced Data Structures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-border bg-background/30">
              <h4 className="font-medium mb-1">Cubie Representation</h4>
              <p className="text-xs text-muted-foreground">
                4-tuple (ρ, σ, v, w) for permutations and orientations
              </p>
            </div>
            
            <div className="p-3 rounded-lg border border-border bg-background/30">
              <h4 className="font-medium mb-1">Prune Tables</h4>
              <p className="text-xs text-muted-foreground">
                Precomputed pattern databases for optimal heuristics
              </p>
            </div>
            
            <div className="p-3 rounded-lg border border-border bg-background/30">
              <h4 className="font-medium mb-1">Move Engine</h4>
              <p className="text-xs text-muted-foreground">
                Efficient group theory operations on cube states
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Details */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Implementation Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <span className="text-sm font-medium">Frontend</span>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">React</Badge>
                <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                <Badge variant="secondary" className="text-xs">Three.js</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium">Algorithms</span>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">Kociemba</Badge>
                <Badge variant="secondary" className="text-xs">IDA*</Badge>
                <Badge variant="secondary" className="text-xs">Pruning</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium">Design</span>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">Tailwind</Badge>
                <Badge variant="secondary" className="text-xs">shadcn/ui</Badge>
                <Badge variant="secondary" className="text-xs">Responsive</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium">Future</span>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">AI Vision</Badge>
                <Badge variant="secondary" className="text-xs">NxN Cubes</Badge>
                <Badge variant="secondary" className="text-xs">APIs</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};