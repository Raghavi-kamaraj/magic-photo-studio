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



Website URL: https://pickabookart.netlify.app/

This application is a React-based web app deployed on Netlify, with backend processing handled via Supabase Edge Functions.
On the home page, I have included an “Architecture” menu option, which navigates to a dedicated Architecture page. This page visually explains the overall structure of the application, including:

Frontend Architecture (React components, routing, UI flow)

Backend Architecture (Supabase Edge Function for image transformation)

Workflow Pipeline (Photo upload → Face detection → Illustration generation → Output image)

API Integration Flow (How the frontend communicates with the Supabase function)

This page is designed to help reviewers and managers quickly understand how the application works internally, along with the component hierarchy and request flow.
