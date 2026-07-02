import { useEffect, useRef } from 'react';

interface FilmGrainProps {
  iso: number;
}

export default function FilmGrain({ iso }: FilmGrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    
    // We render a small 128x128 noise pattern and stretch it with pixelated rendering.
    // This is computationally lightweight and creates a gorgeous, warm, tactile grain.
    const width = 128;
    const height = 128;
    canvas.width = width;
    canvas.height = height;

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    const updateGrain = () => {
      // Calculate grain strength based on ISO.
      // Higher ISO increases the grain intensity (contrast of pixels) and transparency.
      const normalizedIso = Math.min(Math.max((iso - 64) / (6400 - 64), 0), 1);
      
      // High ISO = bigger noise deviations
      const grainRange = 15 + normalizedIso * 65; 
      // Base alpha density
      const alphaBase = 18 + normalizedIso * 28;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * grainRange;
        // Gray values
        const val = Math.max(0, Math.min(255, 128 + noise));
        
        data[i] = val;     // R
        data[i + 1] = val; // G
        data[i + 2] = val; // B
        
        // Randomize alpha slightly per pixel for high fidelity organic static
        data[i + 3] = Math.max(5, alphaBase + (Math.random() - 0.5) * 8); 
      }

      ctx.putImageData(imgData, 0, 0);
      
      // We throttle animation updates to 30 FPS to feel more "cinematic/analog" and save battery
      setTimeout(() => {
        animationId = requestAnimationFrame(updateGrain);
      }, 33);
    };

    updateGrain();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [iso]);

  // Base overall opacity transition for the grain overlay
  const normalizedIso = Math.min(Math.max((iso - 64) / (6400 - 64), 0), 1);
  const opacity = 0.12 + normalizedIso * 0.28;

  return (
    <canvas
      id="film-grain-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-45 mix-blend-overlay"
      style={{
        opacity: opacity,
        imageRendering: 'pixelated',
      }}
    />
  );
}
