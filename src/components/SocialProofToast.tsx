/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { PurchaseNotification } from "../types";

const firstNames = ["Tiago", "Diogo", "Gonçalo", "Miguel", "Duarte", "Afonso", "Rodrigo", "Pedro", "André", "João", "Francisco", "Lourenço"];
const lastInitials = ["S.", "M.", "F.", "P.", "C.", "R.", "L.", "N.", "B.", "T.", "G.", "A."];
const locations = [
  { city: "Lisboa", region: "Portugal" },
  { city: "Porto", region: "Portugal" },
  { city: "Braga", region: "Portugal" },
  { city: "Coimbra", region: "Portugal" },
  { city: "Faro", region: "Portugal" },
  { city: "Aveiro", region: "Portugal" },
  { city: "Setúbal", region: "Portugal" },
  { city: "Funchal", region: "Portugal" },
  { city: "Guimarães", region: "Portugal" },
  { city: "Cascais", region: "Portugal" },
  { city: "Viseu", region: "Portugal" },
  { city: "Leiria", region: "Portugal" },
];

export default function SocialProofToast() {
  const [notification, setNotification] = useState<PurchaseNotification | null>(null);

  useEffect(() => {
    // Function to generate a random buyer
    const generateBuyer = () => {
      const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastInitials[Math.floor(Math.random() * lastInitials.length)]}`;
      const location = locations[Math.floor(Math.random() * locations.length)];
      const minAgo = Math.floor(Math.random() * 25) + 2;
      
      setNotification({
        name,
        city: location.city,
        region: location.region,
        timeAgo: `Compra aprovada há ${minAgo} minutos`
      });
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(() => {
      generateBuyer();
    }, 3000);

    // Loop notification interval: show for 5s, hide for 7s
    const interval = setInterval(() => {
      setNotification(null); // Hide current
      setTimeout(() => {
        generateBuyer(); // Show new
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none max-w-[280px] w-[85vw]">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="flex items-center gap-2.5 p-2.5 pr-4 rounded-lg bg-slate-900/95 border border-brand-orange/20 shadow-xl backdrop-blur-md pointer-events-auto"
          >
            {/* Icon check */}
            <div className="relative flex-shrink-0 w-7 h-7 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <ShieldCheck className="w-4 h-4" />
            </div>

            {/* Compact Notification content */}
            <div className="flex-1 min-w-0 text-xs">
              <p className="text-slate-200 font-medium truncate">
                <span className="font-bold text-white">{notification.name}</span> acabou de comprar!
              </p>
              <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <span>{notification.city}, Portugal</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Acesso imediato</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
