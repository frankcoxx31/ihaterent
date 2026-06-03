import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

export default function Logo({ 
  className = "h-12 w-auto", 
}: LogoProps) {
  const [imgSrc, setImgSrc] = useState<string>("/logo.jpg");

  useEffect(() => {
    const img = new Image();
    img.src = "/logo.jpg";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Assume the top-left pixel is the background color
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];
      
      const tolerance = 30; 
      const fade = 40;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const distance = Math.sqrt(
          Math.pow(r - bgR, 2) + 
          Math.pow(g - bgG, 2) + 
          Math.pow(b - bgB, 2)
        );
        
        if (distance <= tolerance) {
          data[i + 3] = 0; // Fully transparent
        } else if (distance <= tolerance + fade) {
          // Smooth transition for anti-aliased edges
          const alpha = Math.floor(((distance - tolerance) / fade) * 255);
          data[i + 3] = alpha;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setImgSrc(canvas.toDataURL('image/png'));
    };
  }, []);

  return (
    <img 
      src={imgSrc} 
      alt="Integrity Closings CLT" 
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
