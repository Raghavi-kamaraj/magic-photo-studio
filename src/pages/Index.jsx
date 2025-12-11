import React, { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { PhotoUpload } from '@/components/PhotoUpload';
import { ProcessingSteps } from '@/components/ProcessingSteps';
import { ResultDisplay } from '@/components/ResultDisplay';
import { Sparkles, BookOpen, Image, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [appState, setAppState] = useState('idle');
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [personalizedImage, setPersonalizedImage] = useState(null);

  const handlePhotoSelected = useCallback(async (file) => {
    try {
      setAppState('uploading');
      setCurrentStep(1);
      
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result;
        setUploadedPhoto(base64);
        
        setAppState('processing');
        setCurrentStep(2);
        
        // Face detection step
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentStep(3);
        
        try {
          // Call the edge function for AI transformation
          const { data, error } = await supabase.functions.invoke('personalize-illustration', {
            body: { photo: base64 }
          });
          
          if (error) {
            console.error('Function error:', error);
            throw new Error(error.message || 'Failed to process image');
          }
          
          if (data?.personalizedImage) {
            setPersonalizedImage(data.personalizedImage);
            setAppState('complete');
            toast.success('Photo transformed into illustration!');
          } else if (data?.error) {
            throw new Error(data.error);
          } else {
            throw new Error('No image returned from AI');
          }
        } catch (apiError) {
          console.error('API Error:', apiError);
          setAppState('error');
          toast.error(apiError.message || 'Failed to transform image');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing photo:', error);
      setAppState('error');
      toast.error('Failed to process photo. Please try again.');
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState('idle');
    setCurrentStep(1);
    setUploadedPhoto(null);
    setPersonalizedImage(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (!personalizedImage) return;
    
    const link = document.createElement('a');
    link.href = personalizedImage;
    link.download = 'lovable-personalized.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  }, [personalizedImage]);

  return (
    <div className="min-h-screen bg-gradient-hero paper-texture">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {appState === 'complete' && uploadedPhoto && personalizedImage ? (
          <ResultDisplay
            originalImage={uploadedPhoto}
            personalizedImage={personalizedImage}
            onReset={handleReset}
            onDownload={handleDownload}
          />
        ) : (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light text-lavender text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Personalization
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4 leading-tight">
                Make Your Child the
                <span className="text-coral block">Hero of the Story</span>
              </h1>
              
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
                Upload a photo and watch as AI transforms it into a beautiful 
                illustrated character for personalized storybooks
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sage-light">
                  <Image className="w-4 h-4 text-sage" />
                  <span className="text-sage text-sm font-medium">Face Detection</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10">
                  <Wand2 className="w-4 h-4 text-coral" />
                  <span className="text-coral text-sm font-medium">Style Transfer</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light">
                  <BookOpen className="w-4 h-4 text-lavender" />
                  <span className="text-lavender text-sm font-medium">Illustration Ready</span>
                </div>
              </div>
            </div>

            {/* Processing Steps */}
            {(appState === 'uploading' || appState === 'processing') && (
              <ProcessingSteps currentStep={currentStep} />
            )}

            {/* Upload Component */}
            <div className="animate-slide-up delay-200">
              <PhotoUpload 
                onPhotoSelected={handlePhotoSelected}
                isProcessing={appState === 'uploading' || appState === 'processing'}
              />
            </div>

            {/* Demo Tip */}
            {appState === 'idle' && (
              <div className="mt-8 text-center animate-fade-in delay-300">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Tip:</span> For best results, use a clear, front-facing photo with good lighting
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sage-light/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
