import React, { useState } from 'react';
import { 
  Chrome, 
  Apple, 
  Slack, 
  Mail, 
  ArrowRight, 
  Component 
} from 'lucide-react';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering with:", email);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col items-center justify-center font-sans text-[#172B4D] p-4">
      {/* Brand Logo Section */}
      <div className="mb-8 flex items-center gap-3 group cursor-default">
        <div className="bg-[#0052CC] p-2 rounded-lg transition-transform group-hover:rotate-12">
          <Component className="text-white w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-[#0052CC]">
          NEXUS
        </h1>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-[400px] bg-white border border-[#DFE1E6] rounded-md px-8 py-10 transition-all">
        <header className="text-center mb-8">
          <h2 className="text-[#172B4D] text-xl font-bold mb-2">Create your account</h2>
          <p className="text-[#5E6C84] text-sm">Join thousands of developers today.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A5ADBA] group-focus-within:text-[#0052CC] transition-colors" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter work email"
              className="w-full pl-10 pr-4 py-2.5 bg-[#F4F5F7] border-2 border-transparent rounded-md outline-none focus:bg-white focus:border-[#4C9AFF] transition-all placeholder:text-[#A5ADBA] text-sm"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-[#0052CC] hover:bg-[#0747A6] active:scale-[0.98] text-white font-semibold py-2.5 rounded-md transition-all flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-[#DFE1E6]"></div>
          <span className="px-3 text-[10px] text-[#8993A4] font-bold uppercase tracking-widest">OR</span>
          <div className="flex-grow border-t border-[#DFE1E6]"></div>
        </div>

        {/* Social Authentication */}
        <div className="space-y-3">
          <SocialButton 
            icon={<Chrome className="w-4 h-4 text-[#EA4335]" />} 
            label="Continue with Google" 
          />
          <SocialButton 
            icon={<Apple className="w-4 h-4 fill-current" />} 
            label="Continue with Apple" 
          />
          <SocialButton 
            icon={<Slack className="w-4 h-4 text-[#4A154B]" />} 
            label="Continue with Slack" 
          />
        </div>

        <footer className="mt-8 pt-6 border-t border-[#DFE1E6] text-center">
          <p className="text-sm text-[#5E6C84]">
            Already have an account?{' '}
            <a href="#" className="text-[#0052CC] font-medium hover:underline">Log in</a>
          </p>
        </footer>
      </div>

      {/* Legal Footer */}
      <div className="mt-8 flex items-center gap-4 text-[11px] text-[#5E6C84] font-medium">
        <a href="#" className="hover:text-[#0052CC] transition-colors">Privacy Policy</a>
        <div className="w-1 h-1 bg-[#DFE1E6] rounded-full"></div>
        <a href="#" className="hover:text-[#0052CC] transition-colors">Terms of Service</a>
      </div>
    </div>
  );
};

// Reusable Social Button Component
const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-[#DFE1E6] bg-white hover:bg-[#F4F5F7] active:bg-[#EBECF0] py-2.5 rounded-md font-semibold text-[#42526E] text-sm transition-all"
    >
      {icon}
      {label}
    </button>
  );
};

export default RegisterPage;