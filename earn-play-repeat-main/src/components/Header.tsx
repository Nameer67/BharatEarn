
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet, Home, Play, Settings, Users } from "lucide-react";

interface HeaderProps {
  user: any;
  setUser: (user: any) => void;
  isAdmin: boolean;
}

const Header = ({ user, setUser, isAdmin }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogin = () => {
    // Placeholder for login functionality
    setUser({ name: "Demo User", email: "demo@bharatearn.com", balance: 0 });
  };

  const handleLogout = () => {
    setUser(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">BE</span>
            </div>
            <span className="text-lg sm:text-2xl font-bold text-gray-900 hidden xs:block">BharatEarn</span>
            <span className="text-lg font-bold text-gray-900 block xs:hidden">BE</span>
          </Link>

          {/* Mobile Navigation - Always visible when user is logged in */}
          {user && (
            <nav className="md:hidden flex items-center space-x-1">
              <Link
                to="/earn"
                className={`flex flex-col items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  isActive("/earn") 
                    ? "text-indigo-600 bg-indigo-50" 
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                <Play className="w-4 h-4" />
                <span>Earn</span>
              </Link>
              
              <Link
                to="/refer"
                className={`flex flex-col items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  isActive("/refer") 
                    ? "text-indigo-600 bg-indigo-50" 
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Refer</span>
              </Link>
              
              <Link
                to="/wallet"
                className={`flex flex-col items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  isActive("/wallet") 
                    ? "text-indigo-600 bg-indigo-50" 
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Wallet</span>
              </Link>
            </nav>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/") 
                  ? "text-indigo-600 bg-indigo-50" 
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            {user && (
              <>
                <Link
                  to="/earn"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/earn") 
                      ? "text-indigo-600 bg-indigo-50" 
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>Earn</span>
                </Link>
                
                <Link
                  to="/refer"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/refer") 
                      ? "text-indigo-600 bg-indigo-50" 
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Refer & Earn</span>
                </Link>
                
                <Link
                  to="/wallet"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/wallet") 
                      ? "text-indigo-600 bg-indigo-50" 
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>Wallet</span>
                </Link>
                
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/dashboard") 
                      ? "text-indigo-600 bg-indigo-50" 
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/admin") 
                        ? "text-indigo-600 bg-indigo-50" 
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>Admin Panel</span>
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* User Actions and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Balance and Login/Logout for Mobile */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="text-xs sm:text-sm">
                  <span className="text-gray-600 hidden sm:inline">Balance: </span>
                  <span className="font-semibold text-indigo-600">₹{user.balance || 0}</span>
                </div>
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-1"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5 text-gray-600" />
                    ) : (
                      <Menu className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                </div>
                <Button variant="outline" onClick={handleLogout} className="hidden md:block">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button onClick={handleLogin} className="bg-indigo-600 hover:bg-indigo-700 text-sm px-3 py-2">
                  Login
                </Button>
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-1"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5 text-gray-600" />
                    ) : (
                      <Menu className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu - Only for additional options */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/") 
                    ? "text-indigo-600 bg-indigo-50" 
                    : "text-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive("/dashboard") 
                        ? "text-indigo-600 bg-indigo-50" 
                        : "text-gray-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/admin") 
                          ? "text-indigo-600 bg-indigo-50" 
                          : "text-gray-700"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="px-3">
                      <Button variant="outline" onClick={handleLogout} className="w-full">
                        Logout
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
