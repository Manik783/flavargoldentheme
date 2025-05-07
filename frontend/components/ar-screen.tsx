import { useState, useEffect, useRef } from "react";
import React from "react";
import { X } from "lucide-react";

const VegIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="#A09460" />
    <circle cx="6" cy="6" r="3" fill="#117C3F" />
  </svg>
);

const NonVegIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="#000000" stroke="#A09460" />
    <path d="M5.35048 2.625C5.70392 2.0625 6.54608 2.0625 6.89952 2.625L10.0726 8.25C10.4261 8.8125 10.0425 9.5 9.42306 9.5H2.82694C2.20745 9.5 1.82391 8.8125 2.17735 8.25L5.35048 2.625Z" fill="#9A0101" />
  </svg>
);

const ARIcon = () => (
  <svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.33333 9.16667L11 11M7.33333 9.16667V12.8333L11 14.6667M7.33333 9.16667L11 7.33333L14.6667 9.16667M11 11L14.6667 9.16667M11 11V14.6667M11 14.6667L14.6667 12.8333V9.16667M8.61667 19.25C6.56333 19.25 5.53667 19.25 4.752 18.8503C4.0621 18.4988 3.5012 17.9379 3.14967 17.248C2.75 16.4633 2.75 15.4367 2.75 13.3833M19.25 13.3833C19.25 15.4367 19.25 16.4633 18.8503 17.248C18.4988 17.9379 17.9379 18.4988 17.248 18.8503C16.4633 19.25 15.4367 19.25 13.3833 19.25M13.3833 2.75C15.4367 2.75 16.4633 2.75 17.248 3.14967C17.9379 3.5012 18.4988 4.0621 18.8503 4.752C19.25 5.53667 19.25 6.56333 19.25 8.61667M8.61667 2.75C6.56333 2.75 5.53667 2.75 4.752 3.14967C4.0621 3.5012 3.5012 4.0621 3.14967 4.752C2.75 5.53667 2.75 6.56333 2.75 8.61667" stroke="#A09460" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Define interface for model viewer element
interface ModelViewerElement extends HTMLElement {
  activateAR: () => void;
  arScale: string;
  arPlacement: string;
  shadowIntensity: number;
  exposure: number;
  loading: string;
  reveal: string;
  autoRotate: boolean;
  cameraControls: boolean;
  ar: boolean;
  arModes: string;
  src: string;
  iosSrc: string;
  environmentImage: string;
  posterColor: string;
  autoPlay: boolean;
}

interface ARScreenProps {
  isOpen: boolean;
  onClose: () => void;
  dish: {
    name: string;
    price: number;
    serves: number;
    description: string;
    isVeg: boolean;
    image: string;
    glb_url: string;
    usdz_url: string;
  };
}

export function ARScreen({ isOpen, onClose, dish }: ARScreenProps) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isModelViewerReady, setIsModelViewerReady] = useState(false);
  const modelViewerRef = useRef<ModelViewerElement | null>(null);

  // Load the model-viewer script when component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && !customElements.get("model-viewer")) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
      script.type = "module";
      
      script.onload = () => {
        setIsModelViewerReady(true);
      };
      
      document.body.appendChild(script);
    } else if (typeof window !== "undefined" && customElements.get("model-viewer")) {
      setIsModelViewerReady(true);
    }
  }, []);

  const handle3DView = () => {
    // The model is always visible now, so this is just for the button
  };

  const handleARView = () => {
    if (!isModelLoaded) {
      // Wait for model to load before activating AR
      setTimeout(() => {
        activateARMode();
      }, 500);
    } else {
      activateARMode();
    }
  };

  const activateARMode = () => {
    if (modelViewerRef.current) {
      try {
        modelViewerRef.current.activateAR();
      } catch (error) {
        console.error("Error activating AR:", error);
        alert('AR may not be supported on this device or browser.');
      }
    } else {
      alert('AR viewer is not ready yet. Please try again in a moment.');
    }
  };

  const handleModelLoad = () => {
    setIsModelLoaded(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 bg-[#000000] border-t border-[#A09460] rounded-t-3xl z-50 overflow-hidden max-h-[90vh] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-[#000000] rounded-full p-1.5 hover:bg-[#0a0a0a] border border-[#A09460]/30 transition-all duration-200 shadow-md"
        >
          <X size={20} color="#A09460" />
        </button>
        
        <div className="h-[50vh] bg-[#000000] relative">
          {!isModelViewerReady ? (
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={dish.image} 
                alt={dish.name} 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[#A09460] font-medium">
                  <span className="inline-block animate-pulse">Loading 3D viewer...</span>
                </p>
              </div>
            </div>
          ) : (
            <model-viewer
              ref={modelViewerRef}
              src={dish.glb_url}
              ios-src={dish.usdz_url}
              ar
              ar-modes="webxr scene-viewer quick-look"
              ar-scale="auto"
              ar-placement="floor"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              environment-image="neutral"
              exposure="0.8"
              loading="eager"
              reveal="auto"
              auto-play
              poster-color="#000000"
              alt={`A 3D model of ${dish.name}`}
              onLoad={handleModelLoad}
              className="w-full h-full"
              style={{ backgroundColor: '#000000' }}
            ></model-viewer>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex justify-between mb-5">
            <button 
              onClick={handleARView}
              className="luxury-button"
              disabled={!isModelLoaded}
            >
              View in AR <ARIcon />
            </button>
            <button 
              onClick={handle3DView}
              className="luxury-button"
            >
              3D View
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-1">
              {dish.isVeg ? (
                <div className="flex items-center text-xs font-medium">
                  <VegIcon />
                  <span className="gold-gradient-text ml-1">Veg</span>
                </div>
              ) : (
                <div className="flex items-center text-xs font-medium">
                  <NonVegIcon />
                  <span className="gold-gradient-text ml-1">Non-Veg</span>
                </div>
              )}
            </div>
            <h3 className="font-bold text-xl text-[#A09460]">{dish.name}</h3>
            <div>
              <p className="font-semibold text-[#A09460]">₹{dish.price}</p>
              <p className="text-xs text-gray-400">Serves {dish.serves}</p>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{dish.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}