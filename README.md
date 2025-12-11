Architecture Overview — Personalized Illustration Generator

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

Generates the final AI-rendered output image.
