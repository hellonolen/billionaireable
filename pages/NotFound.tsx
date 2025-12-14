import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-serif text-9xl font-black text-black tracking-tighter mb-4">404</h1>
            <p className="font-serif text-2xl text-gray-400 mb-12">"This path leads nowhere."</p>

            <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest hover:bg-art-orange hover:text-black transition-all duration-300 shadow-soft-xl"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to The Path
            </button>
        </div>
    );
};

export default NotFound;
