Architecture Overview — Personalized Illustration Generator

┌─────────────────────────────────────────────────────────────────┐
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
│  │  • Calls Replicate API (InstantID / ControlNet)          │   │
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
└─────────────────────────────────────────────────────────────────┘


This system enables users to upload their photos and receive AI-generated personalized illustrations. It consists of three main layers:

1. Frontend (React)

The React application handles the entire user flow:

PhotoUpload Component: Allows users to upload an image (converted to Base64).

Processing Steps: Shows progress indicators while the backend processes the image.

ResultDisplay Component: Displays the final personalized illustration to the user.

2. Edge Function (Deno)

A lightweight serverless endpoint (/personalize-illustration) that:

Receives the Base64 image from the frontend.

Sends the image to the Replicate API (InstantID / ControlNet).

Returns the processed illustration back to the frontend.
This provides fast, low-latency execution at the network edge.

3. Replicate API

Replicate hosts the AI model pipeline (InstantID or similar):

Detects and extracts the user’s face.

Applies style transfer to match a chosen illustration theme.




2. Model Choice
InstantID via Replicate

InstantID is chosen for its ability to preserve facial identity while applying artistic styles.
It combines the best of face-swap and style transfer technologies.

✔ Pros

High identity preservation

Good style control via ControlNet

Single-image inference (no training)

Supports various illustration styles

Replicate provides easy API access

Alternatives Considered

PhotoMaker: Good but less style control

IP-Adapter: Requires more tuning

LoRA fine-tuning: Too slow for real-time

Pure ControlNet: Less identity preservation

Generates the final AI-rendered output image.

3. Known Limitations
Processing Time

Each personalization takes 10–30 seconds depending on model load.

Face Angle Sensitivity

Best results with front-facing photos; extreme angles reduce quality.

Style Consistency

Maintaining exact illustration style across different faces requires fine-tuning.

API Costs

Replicate charges per inference; high volume would need cost optimization.

Single Template

Current prototype uses one template; production would need template management.

4. V2 Improvements
Multiple Templates

Support various illustration styles and scenes.

Queue System

Background job processing with webhooks for better UX.

Face Pre-processing

Auto-crop, enhance, and validate face quality before processing.

Style Fine-tuning

Train custom LoRAs for exact style matching.

Batch Processing

Generate multiple pages/scenes in one request.

Caching Layer

Cache face embeddings for faster re-processing.

5. Tech Stack

* React — Frontend

* JavaScript — Language

* Tailwind CSS — Styling

* Vite — Build Tool

* Supabase — Backend

* Edge Functions — API

* Replicate — AI/ML

* InstantID — Model
