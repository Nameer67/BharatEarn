
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">BE</span>
              </div>
              <span className="text-lg font-bold">BharatEarn</span>
            </div>
            <p className="text-gray-400 text-sm">
              Watch videos and earn rewards. Entertainment and earning combined.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base font-semibold mb-3">Quick Links</h3>
            <div className="space-y-1">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link to="/earn" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Earn
              </Link>
              <Link to="/wallet" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Wallet
              </Link>
              <Link to="/dashboard" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Dashboard
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-base font-semibold mb-3">Contact</h3>
            <div className="space-y-1 text-gray-400 text-sm">
              <p>Email: support@bharatearn.com</p>
              <p>Phone: +91 9876543210</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="text-center">
            <p className="text-yellow-400 font-medium mb-3 text-sm">
              ⚠️ Important Disclaimer
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-gray-400 hover:text-white underline text-xs px-2 py-1">
                  Click here for important information
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle className="text-red-600 text-center text-lg">
                    ⚠️ महत्वपूर्ण सूचना / Important Notice
                  </DialogTitle>
                  <DialogDescription className="space-y-4 text-left text-sm leading-relaxed">
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <p className="font-semibold text-yellow-800 mb-2">
                        🎮 मनोरंजन के लिए मात्र / Entertainment Purpose Only
                      </p>
                      <p className="text-yellow-700">
                        यह प्लेटफॉर्म केवल मनोरंजन और शिक्षा के लिए बनाया गया है। This platform is designed solely for entertainment and educational purposes.
                      </p>
                    </div>
                    
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <p className="font-semibold text-red-800 mb-2">
                        💰 पैसे नहीं निकाले जा सकते / No Real Money Withdrawal
                      </p>
                      <p className="text-red-700">
                        यहाँ दिखाई गई सभी कमाई वर्चुअल है और असली पैसे के रूप में नहीं निकाली जा सकती। All earnings displayed are virtual and cannot be withdrawn as real money.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-800 mb-2">
                        🎯 प्लेटफॉर्म उपयोग / Platform Usage
                      </p>
                      <p className="text-blue-700">
                        कमाए गए क्रेडिट केवल इस प्लेटफॉर्म पर वीडियो देखने के लिए उपयोग किए जा सकते हैं। Earned credits can only be used within the platform to unlock videos.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="font-semibold text-gray-800 mb-2">
                        ✅ उपयोगकर्ता सहमति / User Agreement
                      </p>
                      <p className="text-gray-700">
                        इस प्लेटफॉर्म का उपयोग करके, आप इन नियमों को स्वीकार करते हैं। By using this platform, you acknowledge and accept these terms.
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <p className="text-gray-500 text-xs mt-3">
              © 2024 BharatEarn. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
