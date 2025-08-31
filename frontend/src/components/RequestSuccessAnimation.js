import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

const RequestSuccessAnimation = ({ onClose }) => {
  const [stage, setStage] = useState('start');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('sending'), 100);
    const timer2 = setTimeout(() => setStage('sent'), 1500);
    const timer3 = setTimeout(() => onClose(), 3000); // Auto-close after 3 seconds

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <style>{`
        .circle-bg { animation: expand 1.5s ease-out forwards; }
        .icon-check { animation: draw-check 0.5s 1.5s ease-in-out forwards; }
        .text-reveal { animation: fade-in 0.5s 2s ease-in forwards; }
        @keyframes expand { 0% { transform: scale(0); } 100% { transform: scale(1); } }
        @keyframes draw-check { 0% { stroke-dashoffset: 100; } 100% { stroke-dashoffset: 0; } }
        @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="text-center">
        <div className={`relative w-32 h-32 rounded-full bg-primary flex items-center justify-center ${stage === 'sending' ? 'circle-bg' : 'scale-0'}`}>
          <Check
            className={`w-16 h-16 text-white ${stage === 'sent' ? 'icon-check' : 'opacity-0'}`}
            style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
          />
        </div>
        <div className={`mt-6 text-white text-2xl font-bold ${stage === 'sent' ? 'text-reveal' : 'opacity-0'}`}>
          Request Sent!
        </div>
      </div>
    </div>
  );
};

export default RequestSuccessAnimation;
