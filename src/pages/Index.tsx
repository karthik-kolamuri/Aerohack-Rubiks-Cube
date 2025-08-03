import { useState } from 'react';
import { CubeCanvas } from '@/components/CubeCanvas';
import { SolverInterface } from '@/components/SolverInterface';
import { TechSpecs } from '@/components/TechSpecs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Box, 
  Zap, 
  Brain, 
  Target, 
  Trophy,
  Github,
  ExternalLink
} from 'lucide-react';
import cubeHero from '@/assets/cube-hero.jpg';

const Index = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentTab, setCurrentTab] = useState('solver');

  const handleAnimationToggle = () => {
    setIsAnimating(!isAnimating);
  };

  const handleShuffle = () => {
    // Shuffle logic would go here
    console.log('Shuffling cube...');
  };

  const handleSolve = () => {
    // This will be handled by the SolverInterface
    setCurrentTab('solver');
  };

  const handleSolveStart = () => {
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-bg)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${cubeHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Box className="w-8 h-8 text-primary" />
              <Badge variant="outline" className="border-primary/30">
                AeroHack Final Round
              </Badge>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Rubik's Cube Solver
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI-powered cube solving using Kociemba's Two-Phase Algorithm. 
              Achieving near-optimal solutions in under 19 moves with cutting-edge performance.
            </p>
            
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">&lt;19 moves average</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Kociemba Algorithm</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">2-5 second solves</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - 3D Cube */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Interactive 3D Cube</h3>
                <CubeCanvas
                  isAnimating={isAnimating}
                  onAnimationToggle={handleAnimationToggle}
                  onShuffle={handleShuffle}
                  onSolve={handleSolve}
                />
                <p className="text-sm text-muted-foreground">
                  Drag to rotate • Scroll to zoom
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column - Controls and Info */}
          <div className="lg:col-span-2">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-background/50">
                <TabsTrigger value="solver" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Solver
                </TabsTrigger>
                <TabsTrigger value="specs" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Tech Specs
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="solver">
                <SolverInterface 
                  onSolveStart={handleSolveStart}
                  isSpinning={isAnimating}
                />
              </TabsContent>

              <TabsContent value="specs">
                <TechSpecs />
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-accent" />
                      Project Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      This project represents a quantum leap from traditional Rubik's cube solvers. 
                      By implementing Kociemba's Two-Phase Algorithm with advanced data structures 
                      and AI-powered features, we achieve unprecedented performance and user experience.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                        <h4 className="font-semibold text-primary mb-2">Algorithm Excellence</h4>
                        <p className="text-sm text-muted-foreground">
                          Near-optimal solutions using domain-specific optimization
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-accent/20 bg-accent/5">
                        <h4 className="font-semibold text-accent mb-2">User Experience</h4>
                        <p className="text-sm text-muted-foreground">
                          Intuitive 3D interface with AI-powered input methods
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        View Source
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Future Roadmap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">Phase 1</Badge>
                        <span className="text-sm">AI Computer Vision Input</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">Phase 2</Badge>
                        <span className="text-sm">NxN Cube Solver Extension</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">Phase 3</Badge>
                        <span className="text-sm">Robotics Integration</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">Phase 4</Badge>
                        <span className="text-sm">API & Community Platform</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
