import { useState, useEffect, useRef } from "react";
import React from "react";

const VegIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="#117C3F" />
    <circle cx="6" cy="6" r="3" fill="#117C3F" />
  </svg>
);

const NonVegIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="white" stroke="#FF0000" />
    <path d="M5.35048 2.625C5.70392 2.0625 6.54608 2.0625 6.89952 2.625L10.0726 8.25C10.4261 8.8125 10.0425 9.5 9.42306 9.5H2.82694C2.20745 9.5 1.82391 8.8125 2.17735 8.25L5.35048 2.625Z" fill="#FF0000" />
  </svg>
);

const ARIcon = () => (
  <svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.33333 9.16667L11 11M7.33333 9.16667V12.8333L11 14.6667M7.33333 9.16667L11 7.33333L14.6667 9.16667M11 11L14.6667 9.16667M11 11V14.6667M11 14.6667L14.6667 12.8333V9.16667M8.61667 19.25C6.56333 19.25 5.53667 19.25 4.752 18.8503C4.0621 18.4988 3.5012 17.9379 3.14967 17.248C2.75 16.4633 2.75 15.4367 2.75 13.3833M19.25 13.3833C19.25 15.4367 19.25 16.4633 18.8503 17.248C18.4988 17.9379 17.9379 18.4988 17.248 18.8503C16.4633 19.25 15.4367 19.25 13.3833 19.25M13.3833 2.75C15.4367 2.75 16.4633 2.75 17.248 3.14967C17.9379 3.5012 18.4988 4.0621 18.8503 4.752C19.25 5.53667 19.25 6.56333 19.25 8.61667M8.61667 2.75C6.56333 2.75 5.53667 2.75 4.752 3.14967C4.0621 3.5012 3.5012 4.0621 3.14967 4.752C2.75 5.53667 2.75 6.56333 2.75 8.61667" stroke="#E05D3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

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
    iosSrc: string;
  };
}

export function ARScreen({ isOpen, onClose, dish }: ARScreenProps) {
  const [showModel, setShowModel] = useState(false);
  const modelViewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !customElements.get("model-viewer")) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
      script.type = "module";
      document.body.appendChild(script);
    }
  }, []);

  const handle3DView = () => {
    setShowModel(true);
  };

  const handleARView = () => {
    if (!showModel) {
      setShowModel(true); // Ensure 3D model is loaded
      setTimeout(() => {
        if (modelViewerRef.current && 'activateAR' in modelViewerRef.current) {
          (modelViewerRef.current as any).activateAR();
        } else {
          alert('AR is not supported on this device.');
        }
      }, 100);
    } else {
      if (modelViewerRef.current && 'activateAR' in modelViewerRef.current) {
        (modelViewerRef.current as any).activateAR();
      } else {
        alert('AR is not supported on this device.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 overflow-hidden max-h-[90vh]">
        <div className="h-[50vh] bg-gray-100 relative">
          {!showModel ? (
            <img 
              src={dish.image} 
              alt={dish.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <model-viewer
              ref={modelViewerRef as any}
              src={dish.glb_url}
              ios-src={dish.iosSrc}
              ar
              ar-modes="scene-viewer quick-look"
              camera-controls
              alt={`A 3D model of ${dish.name}`}
              className="w-full h-full"
              style={{ display: 'block' }}
            />
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between mb-6">
            <button 
              onClick={handleARView}
              className="flex items-center gap-1 border border-[#E05D3A] text-[#E05D3A] py-2 px-3 rounded-[10px] text-sm font-medium">
              View in AR <ARIcon />
            </button>
            <button 
              onClick={handle3DView}
              className="border-[1px] border-[#E05D3A] text-[#E05D3A] py-2 px-3 rounded-[10px] text-sm font-medium">
              3D
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">{dish.isVeg ? <VegIcon /> : <NonVegIcon />}</div>
            <h3 className="font-bold text-lg">{dish.name}</h3>
            <p className="font-semibold">₹{dish.price} 
              <p><span className="text-xs text-gray-500">Serves {dish.serves}</span></p> 
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">{dish.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}