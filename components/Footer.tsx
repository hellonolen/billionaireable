import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 py-8 px-4">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Logo / Copyright */}
                    <div className="text-center md:text-left">
                        <h2 className="font-serif text-2xl font-black tracking-tighter mb-2">BILLIONAIREABLE</h2>
                        <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                            &copy; {currentYear} All Rights Reserved.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link to="/privacy" className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-black hover:underline transition-all">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-black hover:underline transition-all">
                            Terms of Service
                        </Link>
                        <Link to="/disclaimer" className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-black hover:underline transition-all">
                            Disclaimer
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
