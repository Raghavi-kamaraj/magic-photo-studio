import React from 'react';
import { Check, Lightbulb, AlertTriangle, ArrowUp } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero paper-texture">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <a 
            href="/"
            className="inline-block mb-6 text-coral hover:text-coral-light transition-colors font-display"
          >
            ← Back to App
          </a>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Architecture & Documentation
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technical overview of the Pickabook personalization prototype
          </p>
        </div>

        {/* Architecture Diagram */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-coral text-primary-foreground flex items-center justify-center text-sm">1</span>
            System Architecture
          </h2>
          <div className="bg-card rounded-3xl p-6 shadow-card">
            <div className="bg-parchment rounded-2xl p-8 font-mono text-sm">
              <pre className="whitespace-pre-wrap text-foreground/80">
{`┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ PhotoUpload │  │  Processing │  │    ResultDisplay        │  │
│  │  Component  │──│    Steps    │──│      Component          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EDGE FUNCTION (Deno)                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 /personalize-illustration                │   │
│  │  • Receives base64 photo                                 │   │
│  │  • Calls Replicate API (InstantID / ControlNet)         │   │
│  │  • Returns personalized illustration                     │   │
│  └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REPLICATE API                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Model: InstantID (or similar face-swap model)          │   │
│  │  • Face detection & extraction                           │   │
│  │  • Style transfer to illustration style                  │   │
│  │  • Composite into template                               │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </div>
        </section>

        {/* Model Choice */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-sage text-primary-foreground flex items-center justify-center text-sm">2</span>
            Model Choice
          </h2>
          <div className="bg-card rounded-3xl p-6 shadow-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sage-light flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-sage" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-2">InstantID via Replicate</h3>
                <p className="text-muted-foreground mb-4">
                  InstantID is chosen for its ability to preserve facial identity while applying artistic styles. 
                  It combines the best of face-swap and style transfer technologies.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-sage-light/30 rounded-2xl p-4">
                <h4 className="font-display text-foreground mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage" /> Pros
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• High identity preservation</li>
                  <li>• Good style control via ControlNet</li>
                  <li>• Single-image inference (no training)</li>
                  <li>• Supports various illustration styles</li>
                  <li>• Replicate provides easy API access</li>
                </ul>
              </div>
              <div className="bg-lavender-light/30 rounded-2xl p-4">
                <h4 className="font-display text-foreground mb-2">Alternatives Considered</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>PhotoMaker:</strong> Good but less style control</li>
                  <li><strong>IP-Adapter:</strong> Requires more tuning</li>
                  <li><strong>LoRA fine-tuning:</strong> Too slow for real-time</li>
                  <li><strong>Pure ControlNet:</strong> Less identity preservation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-lavender text-primary-foreground flex items-center justify-center text-sm">3</span>
            Known Limitations
          </h2>
          <div className="bg-card rounded-3xl p-6 shadow-card">
            <div className="space-y-4">
              {[
                {
                  title: "Processing Time",
                  description: "Each personalization takes 10-30 seconds depending on model load",
                },
                {
                  title: "Face Angle Sensitivity",
                  description: "Best results with front-facing photos; extreme angles reduce quality",
                },
                {
                  title: "Style Consistency",
                  description: "Maintaining exact illustration style across different faces requires fine-tuning",
                },
                {
                  title: "API Costs",
                  description: "Replicate charges per inference; high volume would need cost optimization",
                },
                {
                  title: "Single Template",
                  description: "Current prototype uses one template; production would need template management",
                },
              ].map((limitation, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-parchment rounded-2xl">
                  <AlertTriangle className="w-5 h-5 text-sunshine flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-foreground">{limitation.title}</h4>
                    <p className="text-sm text-muted-foreground">{limitation.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* V2 Improvements */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-coral text-primary-foreground flex items-center justify-center text-sm">4</span>
            V2 Improvements
          </h2>
          <div className="bg-card rounded-3xl p-6 shadow-card">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Multiple Templates",
                  description: "Support various illustration styles and scenes",
                },
                {
                  title: "Queue System",
                  description: "Background job processing with webhooks for better UX",
                },
                {
                  title: "Face Pre-processing",
                  description: "Auto-crop, enhance, and validate face quality before processing",
                },
                {
                  title: "Style Fine-tuning",
                  description: "Train custom LoRAs for exact style matching",
                },
                {
                  title: "Batch Processing",
                  description: "Generate multiple pages/scenes in one request",
                },
                {
                  title: "Caching Layer",
                  description: "Cache face embeddings for faster re-processing",
                },
              ].map((improvement, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-coral/5 rounded-2xl border border-coral/20">
                  <ArrowUp className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-foreground">{improvement.title}</h4>
                    <p className="text-sm text-muted-foreground">{improvement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-sunshine text-primary-foreground flex items-center justify-center text-sm">5</span>
            Tech Stack
          </h2>
          <div className="bg-card rounded-3xl p-6 shadow-card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "React", category: "Frontend" },
                { name: "TypeScript", category: "Language" },
                { name: "Tailwind CSS", category: "Styling" },
                { name: "Vite", category: "Build Tool" },
                { name: "Supabase", category: "Backend" },
                { name: "Edge Functions", category: "API" },
                { name: "Replicate", category: "AI/ML" },
                { name: "InstantID", category: "Model" },
              ].map((tech, index) => (
                <div key={index} className="text-center p-4 bg-parchment rounded-2xl">
                  <p className="font-display text-foreground">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
