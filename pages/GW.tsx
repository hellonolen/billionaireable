import React from 'react';

const GW: React.FC = () => {
    const spreadsheetData = [
        {
            concept: "Core 4",
            original: "Body, Being, Balance, Business",
            billionaire: "THE ENGINE",
            definition: "The 4 integrated systems required to sustain $1B+ of power.",
            suggestion: "Bio-Availability, Capital-Sovereignty, Legacy-Dynasty, Mental-Ascendance.",
            priority: "CRITICAL"
        },
        {
            concept: "The Stack",
            original: "Facts, Feelings, Focus, Fruit",
            billionaire: "THE AUDIT",
            definition: "The daily strategic process to isolate facts from noise.",
            suggestion: "Fact -> Bias -> Leverage -> Move. Execution without the friction of feelings.",
            priority: "CRITICAL"
        },
        {
            concept: "The Pit",
            original: "Accountability and group exposure",
            billionaire: "THE WAR ROOM",
            definition: "The high-stakes peer scrutiny of a billionaire's architecture.",
            suggestion: "Intense, closed-door auditing of your life's logic by elite peers.",
            priority: "HIGH"
        },
        {
            concept: "The Code",
            original: "Rules of engagement for life",
            billionaire: "THE STANDARD",
            definition: "The non-negotiable protocols for maintaining sovereignty.",
            suggestion: "SOPs for communication, investment, and health. No deviations.",
            priority: "HIGH"
        },
        {
            concept: "Warrior / King",
            original: "The identity of a developing man",
            billionaire: "ARCHITECT / SOVEREIGN",
            definition: "The shift from manual production to systemic command.",
            suggestion: "Architect = Builder of Systems. Sovereign = Ruler of the Arena.",
            priority: "CRITICAL"
        }
    ];

    const weekendExperience = [
        { phase: "PRE-WORK", timeline: "14 Days Prior", focus: "The Signal", description: "Daily curated intelligence and calibration messages leading to the intensive." },
        { phase: "FRIDAY", timeline: "Night (6 PM - 10 PM)", focus: "THE DESCENT", description: "Stripping away legacy thinking and identifying the primary constraints." },
        { phase: "SATURDAY", timeline: "All Day (8 AM - 10 PM)", focus: "THE RECONSTRUCTION", description: "Total architecture of the Sovereign Engine. Mapping assets, bio, and legacy." },
        { phase: "SUNDAY", timeline: "Until 2 PM", focus: "THE DECREE", description: "Finalizing the 100-year move and establishing the immediate 90-day protocols." }
    ];

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-12 font-mono text-[10px]">
            <div className="max-w-[1800px] mx-auto bg-white shadow-2xl border border-gray-300 overflow-hidden rounded-sm">
                {/* Excel-style Header */}
                <div className="bg-[#E5E7EB] border-b border-gray-300 p-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <span className="font-bold text-gray-600">Billionaireable_Weekend_Strategy.xlsx</span>
                    </div>
                    <div className="text-gray-400">Sheet: Framework_v2</div>
                </div>

                {/* Formula Bar */}
                <div className="bg-white border-b border-gray-300 flex">
                    <div className="w-10 border-r border-gray-300 bg-gray-50 flex items-center justify-center font-bold text-gray-400 italic">fx</div>
                    <div className="flex-1 p-2 bg-blue-50 outline-none font-bold text-blue-700">
                        =CONVERT(WARRIOR, SOVEREIGN, "MAX_LEVERAGE")
                    </div>
                </div>

                {/* Section 1: CONCEPT MAPPING */}
                <div className="p-4 bg-gray-50 border-b border-gray-200 uppercase font-black text-gray-400 tracking-widest">
                    Module 1: Identity & Framework Transformation
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 font-bold">
                                <th className="border border-gray-300 w-10 bg-gray-100"></th>
                                <th className="border border-gray-300 p-2 text-left">GW CONCEPT</th>
                                <th className="border border-gray-300 p-2 text-left">BILLIONAIREABLE TERM</th>
                                <th className="border border-gray-300 p-2 text-left">SIMPLIFIED DEFINITION</th>
                                <th className="border border-gray-300 p-2 text-left bg-blue-50">PROPOSED PROTOCOL</th>
                                <th className="border border-gray-300 p-2 text-center">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spreadsheetData.map((row, i) => (
                                <tr key={i} className="hover:bg-blue-50/20 transition-colors">
                                    <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400">{i + 1}</td>
                                    <td className="border border-gray-300 p-3 font-bold">{row.concept}</td>
                                    <td className="border border-gray-300 p-3 text-art-orange font-black text-xs">{row.billionaire}</td>
                                    <td className="border border-gray-300 p-3 font-sans text-xs">{row.definition}</td>
                                    <td className="border border-gray-300 p-3 bg-blue-50 leading-relaxed font-sans text-xs font-bold">
                                        {row.suggestion}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <span className={`px-2 py-0.5 rounded-sm text-[8px] font-black border ${row.priority === 'CRITICAL' ? 'bg-black text-white border-black' :
                                                row.priority === 'HIGH' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                    'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {row.priority}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Section 2: THE WEEKEND EXPERIENCE */}
                <div className="p-4 bg-gray-50 border-y border-gray-200 uppercase font-black text-gray-400 tracking-widest mt-8">
                    Module 2: The Weekend Experience (v1.0 Timeline)
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 font-bold">
                                <th className="border border-gray-300 w-10 bg-gray-100"></th>
                                <th className="border border-gray-300 p-2 text-left">PHASE</th>
                                <th className="border border-gray-300 p-2 text-left">TIMELINE</th>
                                <th className="border border-gray-300 p-2 text-left">STRATEGIC FOCUS</th>
                                <th className="border border-gray-300 p-2 text-left bg-green-50">DELIVERABLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weekendExperience.map((row, i) => (
                                <tr key={i} className="hover:bg-green-50/20 transition-colors">
                                    <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400">{i + 1}</td>
                                    <td className="border border-gray-300 p-3 font-black text-xs uppercase">{row.phase}</td>
                                    <td className="border border-gray-300 p-3 font-bold text-gray-500">{row.timeline}</td>
                                    <td className="border border-gray-300 p-3 text-black font-black uppercase text-xs">{row.focus}</td>
                                    <td className="border border-gray-300 p-3 bg-green-50 leading-relaxed font-sans text-xs">
                                        {row.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Spreadsheet Footer */}
                <div className="bg-[#E5E7EB] border-t border-gray-300 p-1 flex gap-0.5">
                    <div className="px-4 py-1 bg-white border-x border-t border-gray-300 text-blue-600 font-bold relative -top-[5px]">
                        Alignment_Matrix
                    </div>
                    <div className="px-4 py-1 hover:bg-gray-200 cursor-pointer">
                        Weekend_Logic
                    </div>
                    <div className="px-4 py-1 hover:bg-gray-200 cursor-pointer">
                        System_Architecture
                    </div>
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto mt-8 flex flex-col md:flex-row gap-8 font-sans">
                <div className="flex-1 bg-white border border-gray-200 p-8 shadow-xl">
                    <h2 className="text-xl font-black mb-4 uppercase tracking-tighter">Clarified Vision</h2>
                    <p className="text-gray-500 leading-relaxed text-sm">
                        We've simplified the Garrett White framework into the **Billionaireable Weekend**.
                        It is no longer a "men's program." It is an **Identity Intensive**.
                        The shift is from "The Path" to **"The Architecture"**.
                    </p>
                </div>
                <div className="w-full md:w-1/3 bg-art-orange p-8 shadow-xl text-white">
                    <h2 className="text-xl font-black mb-4 uppercase tracking-tighter text-black">Master Command</h2>
                    <p className="font-bold text-black/80 leading-relaxed italic">
                        "We aren't creating Warriors. We are activating Architects of Sovereignty."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GW;
