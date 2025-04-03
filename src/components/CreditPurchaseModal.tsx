import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { purchaseCredits } from '../services/auth';
import { toast } from 'sonner';

interface CreditPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const CREDIT_PACKAGES = [
  { amount: 100, price: 25, popular: false, icon: "✨" },
  { amount: 500, price: 90, popular: true, icon: "🔥" },
  { amount: 1000, price: 175, popular: false, icon: "⚡" },
];  

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Razorpay API credentials
const RAZORPAY_KEY_ID = "rzp_test_BRLNwkXJVOGoQE";

export const CreditPurchaseModal = ({ isOpen, onClose, userId }: CreditPurchaseModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePurchase = async (amount: number, price: number) => {
    try {
      setIsLoading(true);
      setSelectedPackage(amount);
      
      // Create a Razorpay checkout instance
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: price * 100, // Amount in paise
        currency: "INR",
        name: "Image Generation Credits",
        description: `Purchase ${amount} credits`,
        handler: async function(response: any) {
          if (response.razorpay_payment_id) {
            // Process the credit purchase after successful payment
            const success = await purchaseCredits(userId, amount, price);
            if (success) {
              toast.success(`Successfully purchased ${amount} credits!`);
              onClose();
            } else {
              toast.error('Failed to process credits. Please contact support.');
            }
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com"
        },
        theme: {
          color: "#3B82F6"
        }
      };
      
      // Create a new instance of Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(false);
      setSelectedPackage(null);
    }
  };

  const getValueText = (amount: number, price: number) => {
    const pricePerCredit = price / amount;
    if (amount === 100) return "Basic";
    if (amount === 500) return "Best Value";
    if (amount === 1000) return "Pro Pack";
    return `${(pricePerCredit * 100).toFixed(1)}₹ per credit`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#2d2d2d] max-w-md">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-white text-2xl font-bold">Power Up Your Creativity</DialogTitle>
          <DialogDescription className="text-gray-400 text-base mt-2">
            Purchase credits to generate more amazing images
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-6">
          {CREDIT_PACKAGES.map((pkg) => (
            <div
              key={pkg.amount}
              className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                pkg.popular 
                  ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                  : 'border-[#2d2d2d] hover:border-blue-500/50'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{pkg.icon}</span>
                    <div>
                      <h3 className="text-white font-bold text-xl">{pkg.amount} Credits</h3>
                      <p className="text-blue-400 text-sm">{getValueText(pkg.amount, pkg.price)}</p>
                    </div>
                  </div>
                  <div className="text-white text-2xl font-bold">₹{pkg.price}</div>
                </div>
                
                <Button 
                  className={`w-full py-5 text-white font-medium text-base ${
                    pkg.popular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-[#2d2d2d] hover:bg-[#3d3d3d]'
                  }`}
                  onClick={() => handlePurchase(pkg.amount, pkg.price)}
                  disabled={isLoading}
                >
                  {isLoading && selectedPackage === pkg.amount ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Buy Now'
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-2 text-center text-xs text-gray-500">
          Secure payments powered by Razorpay. Credits will be added instantly to your account.
        </div>
      </DialogContent>
    </Dialog>
  );
}; 