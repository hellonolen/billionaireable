import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, ChevronDown, ChevronUp, Brain } from 'lucide-react';
import { DASHBOARD_CARDS, BILLIONAIRE_PATH } from '../constants';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

interface DetailViewProps {
    cardId: string;
    onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ cardId, onBack }) => {
    const dashboardData = DASHBOARD_CARDS.find(c => c.id === cardId);
    const curriculumData = BILLIONAIRE_PATH[cardId];

    const [openModule, setOpenModule] = useState<string | null>(null);
    const [openTopic, setOpenTopic] = useState<number | null>(1);
    const [expandedModule, setExpandedModule] = useState<number | null>(1);
    const [playingLesson, setPlayingLesson] = useState<number | null>(null);

    if (!dashboardData) return <div>Card not found</div>;

    const isCurriculum = !!curriculumData;

    const toggleModule = (id: string) => setOpenModule(openModule === id ? null : id);
    const toggleTopic = (id: string) => setOpenTopic(openTopic === id ? null : id);

    // Helper for coloring
    const getThemeColor = (theme: string | undefined) => {
        switch (theme) {
            case 'orange': return 'text-art-orange';
            case 'green': return 'text-art-green';
            case 'blue': return 'text-art-blue';
            case 'yellow': return 'text-art-yellow';
            default: return 'text-gray-500';
        }
    }

    const getBgThemeColor = (theme: string | undefined) => {
        switch (theme) {
            case 'orange': return 'bg-art-orange';
            case 'green': return 'bg-art-green';
            case 'blue': return 'bg-art-blue';
            case 'yellow': return 'bg-art-yellow';
            default: return 'bg-black';
        }
    }

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-12 animate-fade-in">

            {/* Navigation */}
            <button onClick={onBack} className="group flex items-center gap-3 font-mono text-xs font-bold uppercase px-6 py-3 rounded-full bg-white shadow-soft-xl hover:scale-105 transition-all mb-12 w-fit text-gray-500 hover:text-black">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Path
            </button>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
                <div>
                    <div className={`inline-block px-4 py-1.5 mb-6 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest bg-white shadow-sm text-gray-500`}>
                        {isCurriculum ? 'Strategic Module' : 'Operational Dashboard'}
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-black uppercase leading-[0.9] tracking-tighter mb-6">
                        {isCurriculum ? curriculumData.title : dashboardData.title}
                    </h1>
                    <p className="font-sans text-2xl font-medium text-gray-500 max-w-3xl leading-relaxed">
                        {isCurriculum ? curriculumData.description : dashboardData.description}
                    </p>
                </div>

                {isCurriculum && (
                    <button className="bg-black text-white px-10 py-5 rounded-full font-mono text-sm font-bold uppercase hover:scale-105 transition-transform flex items-center gap-3 shadow-soft-xl hover:bg-art-orange hover:text-black">
                        <Play className="w-5 h-5 fill-current" /> Begin Training Module
                    </button>
                )}
            </div>

            {/* Content Area */}
            {isCurriculum ? (
                // CURRICULUM VIEW
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left: Progress & Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-10 rounded-[48px] shadow-soft-xl border border-gray-50">
                            <h3 className="font-mono text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest">Competency Matrix</h3>
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-7xl font-black font-serif text-black">12%</span>
                                <span className="text-xs font-bold uppercase bg-gray-100 text-gray-500 px-2 py-1 rounded">Apprentice</span>
                            </div>
                            <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                                <div className={`h-full w-[12%] rounded-full ${getBgThemeColor(dashboardData.colorTheme)}`}></div>
                            </div>
                        </div>

                        <div className={`p-10 rounded-[48px] shadow-soft-xl border border-gray-50 ${getBgThemeColor(dashboardData.colorTheme)}`}>
                            <Brain className="w-8 h-8 mb-6 text-white" />
                            <h3 className="font-bold text-lg uppercase mb-3 tracking-tight text-white">Strategic Insight</h3>
                            <p className="font-serif text-xl opacity-90 leading-relaxed text-white">
                                "Your pattern recognition in {curriculumData.title} suggests a hesitation to delegate. Focus on the 'Radical Delegation' module today."
                            </p>
                        </div>
                    </div>

                    {/* Right: The Curriculum Tree */}
                    <div className="lg:col-span-8 space-y-16">
                        {curriculumData.trainings.map((training) => (
                            <div key={training.id} className="space-y-8">
                                {/* Module Header - Standalone */}
                                <div className="px-4 md:px-0">
                                    <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Training Module</span>
                                    <h2 className="font-sans text-4xl font-black uppercase tracking-tight mb-2">{training.title}</h2>
                                    <p className="font-serif text-xl text-gray-500 max-w-2xl">{training.description}</p>
                                </div>

                                {/* Topics as Individual Cards */}
                                <div className="space-y-4">
                                    {training.topics.map((topic) => (
                                        <div key={topic.id} className="bg-white rounded-[32px] overflow-hidden shadow-soft-xl border border-gray-50 transition-all duration-300">
                                            {/* Topic Header (Clickable) */}
                                            <button
                                                onClick={() => setOpenTopic(openTopic === topic.id ? null : topic.id)}
                                                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                                            >
                                                <h3 className="font-bold font-sans text-xl uppercase tracking-tight text-gray-900">{topic.title}</h3>
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 transition-transform duration-300 ${openTopic === topic.id ? 'rotate-180 bg-black text-white border-black' : 'bg-white text-gray-400'}`}>
                                                    <ChevronDown className="w-5 h-5" />
                                                </div>
                                            </button>

                                            {/* Expandable Content (Lessons) */}
                                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openTopic === topic.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="p-8 pt-0 border-t border-gray-50 bg-gray-50/30">
                                                    <div className="space-y-2 pt-6">
                                                        {topic.lessons.map((lesson, idx) => (
                                                            <div key={lesson.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white hover:shadow-sm group cursor-pointer transition-all border border-transparent hover:border-gray-100">
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${lesson.isCompleted ? 'bg-black text-white border-black' : 'bg-transparent border-gray-200 text-gray-400'}`}>
                                                                        {lesson.isCompleted ? <CheckCircle className="w-4 h-4" /> : <span className="font-mono text-[10px] font-bold">{idx + 1}</span>}
                                                                    </div>
                                                                    <div>
                                                                        <p className={`font-bold text-sm ${playingLesson === lesson.id ? 'text-art-blue' : 'text-black'}`}>{lesson.title}</p>
                                                                        <p className="font-mono text-[10px] text-gray-400 uppercase mt-1">{lesson.duration}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setPlayingLesson(playingLesson === lesson.id ? null : lesson.id);
                                                                        }}
                                                                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest transition-all ${playingLesson === lesson.id ? 'bg-art-blue text-white shadow-lg scale-105' : 'bg-black text-white opacity-0 group-hover:opacity-100 hover:bg-gray-800'}`}
                                                                    >
                                                                        {playingLesson === lesson.id ? (
                                                                            <>
                                                                                <div className="flex gap-1 h-3 items-end">
                                                                                    <div className="w-0.5 bg-white h-full animate-[bounce_1s_infinite]"></div>
                                                                                    <div className="w-0.5 bg-white h-2/3 animate-[bounce_1.2s_infinite]"></div>
                                                                                    <div className="w-0.5 bg-white h-full animate-[bounce_0.8s_infinite]"></div>
                                                                                </div>
                                                                                Playing
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Play className="w-3 h-3 fill-current" /> Listen
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // OPERATIONAL DASHBOARD VIEW
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 h-[600px] bg-white rounded-[48px] p-10 shadow-soft-xl border border-gray-100">
                        <ResponsiveContainer width="100%" height="100%">
                            {dashboardData.type === 'chart' || dashboardData.type === 'curriculum' ? (
                                <BarChart data={dashboardData.chartData || [{ name: 'Asset A', value: 65 }, { name: 'Asset B', value: 45 }, { name: 'Asset C', value: 85 }]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Inter', fontWeight: 600 }} axisLine={false} tickLine={false} dy={20} />
                                    <YAxis tick={{ fontSize: 12, fontFamily: 'Inter', fontWeight: 600 }} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: '#f9fafb', radius: 16 }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} />
                                    <Bar dataKey="value" fill="black" radius={[8, 8, 0, 0]} barSize={60} />
                                </BarChart>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-300 font-mono uppercase tracking-widest">Data Visualization Unavailable</div>
                            )}
                        </ResponsiveContainer>
                    </div>
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-10 rounded-[48px] shadow-soft-xl border border-gray-100">
                            <h3 className="font-mono text-xs font-bold uppercase text-gray-400 mb-8 tracking-widest">Key Performance Indicators</h3>
                            {dashboardData.previewMetrics.map((m, i) => (
                                <div key={i} className="mb-8 last:mb-0">
                                    <div className="text-5xl font-black mb-2 tracking-tighter">{m.value}</div>
                                    <div className="text-xs font-bold uppercase text-gray-500 tracking-wide">{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DetailView;