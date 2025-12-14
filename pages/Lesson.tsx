import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { ChevronLeft, CheckCircle, Lock, Play } from 'lucide-react';
import { SKILL_DATA } from '../constants';

const Lesson: React.FC = () => {
    const { skillId, moduleId } = useParams<{ skillId: string; moduleId: string }>();
    const { getSkillCompletion, completeModule } = useProgress();
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);

    if (!skillId || !moduleId) {
        return <div>Invalid lesson</div>;
    }

    const skillData = SKILL_DATA[skillId];
    const moduleIndex = parseInt(moduleId) - 1;
    const module = skillData?.modules[moduleIndex];

    if (!module) {
        return <div>Module not found</div>;
    }

    const completion = getSkillCompletion(skillId);
    const isCompleted = completion > moduleIndex;

    const handleComplete = () => {
        completeModule(skillId, moduleIndex + 1);
        setCompleted(true);
        setTimeout(() => {
            navigate(`/skills/${skillId}`);
        }, 1500);
    };

    const getColorClass = () => {
        const colors: Record<string, string> = {
            'reality-distortion': 'orange',
            'liquidity-allocation': 'green',
            'holding-co': 'blue',
            'time-arbitrage': 'yellow',
            'bio-availability': 'orange',
            'political-capital': 'green',
            'syndicate': 'blue',
            'family-office': 'yellow',
            'dynasty-design': 'orange',
            'sovereign-flags': 'green',
            'asymmetric-bets': 'blue',
            'ascendance': 'yellow'
        };
        return colors[skillId] || 'orange';
    };

    const color = getColorClass();

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Back Button */}
            <button
                onClick={() => navigate(`/skills/${skillId}`)}
                className="flex items-center gap-2 mb-8 font-mono text-sm font-bold uppercase text-gray-400 hover:text-black transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Skill
            </button>

            {/* Module Header */}
            <div className={`bg-art-${color} rounded-[32px] p-12 mb-12 shadow-2xl`}>
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-2 bg-black/20 rounded-full font-mono text-xs font-bold uppercase text-white">
                        Module {moduleId}
                    </span>
                    {isCompleted && (
                        <span className="px-4 py-2 bg-white/20 rounded-full font-mono text-xs font-bold uppercase text-white flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                        </span>
                    )}
                </div>
                <h1 className="font-sans text-5xl font-black text-white mb-3">{module.title}</h1>
                <p className="font-mono text-sm text-white/80 uppercase">{module.duration}</p>
            </div>

            {/* Lesson Content */}
            <div className="bg-white rounded-[32px] p-12 shadow-soft-xl border border-black/10 mb-8">
                <div className="prose prose-lg max-w-none">
                    <h2 className="font-sans text-3xl font-black uppercase mb-6">Lesson Overview</h2>

                    <p className="font-serif text-lg text-gray-700 leading-relaxed mb-8">
                        {skillData?.insight || "This module contains critical frameworks and tools for mastering this skill. Complete the exercises below to mark this module as complete."}
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                        <h3 className="font-sans text-xl font-bold uppercase mb-4">Key Frameworks</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full bg-art-${color} mt-2`}></div>
                                <span className="font-serif text-base text-gray-700">First principles thinking applied to {module.title.toLowerCase()}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full bg-art-${color} mt-2`}></div>
                                <span className="font-serif text-base text-gray-700">Practical templates and worksheets</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full bg-art-${color} mt-2`}></div>
                                <span className="font-serif text-base text-gray-700">Real-world case studies from billionaires</span>
                            </li>
                        </ul>
                    </div>

                    <h3 className="font-sans text-xl font-bold uppercase mb-4">Exercise: Apply the Framework</h3>
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                        <p className="font-serif text-base text-gray-600 mb-4">
                            To complete this module, apply what you've learned:
                        </p>
                        <textarea
                            placeholder="Describe how you'll implement this in your business/life..."
                            rows={6}
                            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl font-serif text-base resize-none focus:ring-2 focus:ring-black transition-all"
                        />
                    </div>

                    {/* Tools/Downloads */}
                    {skillData?.tools && skillData.tools.length > 0 && (
                        <div className="mb-8">
                            <h3 className="font-sans text-xl font-bold uppercase mb-4">Tools & Templates</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {skillData.tools.map((tool, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                                        <span className="font-mono text-sm">{tool}</span>
                                        <button className="px-4 py-2 bg-black text-white rounded-full font-mono text-xs font-bold uppercase hover:bg-gray-800 transition-colors">
                                            Download
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Complete Button */}
            {!isCompleted && (
                <button
                    onClick={handleComplete}
                    className={`w-full py-6 rounded-full font-mono text-sm font-bold uppercase transition-all flex items-center justify-center gap-3 shadow-xl ${completed
                            ? 'bg-art-green text-white'
                            : `bg-art-${color} text-white hover:opacity-90`
                        }`}
                >
                    {completed ? (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            Module Completed!
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            Mark as Complete
                        </>
                    )}
                </button>
            )}

            {isCompleted && (
                <div className="bg-art-green rounded-[24px] p-6 text-center">
                    <p className="font-mono text-sm font-bold uppercase text-white flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        You've already completed this module
                    </p>
                </div>
            )}

        </div>
    );
};

export default Lesson;
