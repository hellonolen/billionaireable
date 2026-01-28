import React from 'react';

const GW: React.FC = () => {
    const spreadsheetData = [
        {
            concept: "Core 4",
            original: "Body, Being, Balance, Business",
            billionaire: "The Sovereign Engine",
            suggestion: "Vertical Integration of the Self. Systematize health (Bio) and legacy (Dynasty) as capital assets, not just lifestyle choices.",
            priority: "HIGH"
        },
        {
            concept: "The Stack",
            original: "Facts, Feelings, Focus, Fruit",
            billionaire: "The First Principles Filter",
            suggestion: "The 'Strategic Audit'. A digital workflow to strip emotion from $10M+ decisions. Input -> Bias Audit -> Leverage Scan -> Outcome.",
            priority: "CRITICAL"
        },
        {
            concept: "The Pit",
            original: "Public exposure & group accountability",
            billionaire: "The Syndicate Audit",
            suggestion: "Replace 'Shame' with 'Skin in the Game'. Peer-to-peer auditing of deal structures where participants have mutual financial interests.",
            priority: "MEDIUM"
        },
        {
            concept: "Warrior / King",
            original: "The progression of the man",
            billionaire: "Architect / Sovereign",
            suggestion: "The scale is not 'strength', it is 'Leverage'. From Operator (Manual) to Architect (Systems) to Sovereign (Unchecked Power).",
            priority: "HIGH"
        },
        {
            concept: "The Code",
            original: "Daily rules for behavior",
            billionaire: "The Protocol",
            suggestion: "Non-negotiable SOPs for the Family Office. Defined rules for capital deployment, media interaction, and bio-optimization.",
            priority: "HIGH"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-12 font-mono text-xs">
            <div className="max-w-[1800px] mx-auto bg-white shadow-2xl border border-gray-300 overflow-hidden rounded-sm">
                {/* Excel-style Header */}
                <div className="bg-[#E5E7EB] border-b border-gray-300 p-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <span className="font-bold text-gray-600">Billionaireable_GW_Alignment_Matrix.xlsx</span>
                    </div>
                    <div className="text-gray-400">Sheet 1 / 1</div>
                </div>

                {/* Toolbar */}
                <div className="bg-white border-b border-gray-200 p-1 flex gap-4 text-gray-500 overflow-x-auto">
                    {['File', 'Edit', 'View', 'Insert', 'Format', 'Data', 'Tools', 'Sovereignty'].map(item => (
                        <span key={item} className="px-2 py-1 hover:bg-gray-100 cursor-pointer">{item}</span>
                    ))}
                </div>

                {/* Formula Bar */}
                <div className="bg-white border-b border-gray-300 flex">
                    <div className="w-10 border-r border-gray-300 bg-gray-50 flex items-center justify-center font-bold text-gray-400 italic">fx</div>
                    <div className="flex-1 p-2 bg-white outline-none">
                        =IF(STATUS=="WARRIOR", "UPGRADE", "SOVEREIGN")
                    </div>
                </div>

                {/* Spreadsheet Body */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="w-10 border border-gray-300"></th>
                                {['A', 'B', 'C', 'D', 'E'].map(col => (
                                    <th key={col} className="border border-gray-300 p-1 text-center font-normal text-gray-500">{col}</th>
                                ))}
                            </tr>
                            <tr className="bg-gray-200 text-gray-700 font-bold">
                                <td className="border border-gray-300 bg-gray-100 text-center">1</td>
                                <td className="border border-gray-300 p-3">Garrett White Concept</td>
                                <td className="border border-gray-300 p-3">Original Definition</td>
                                <td className="border border-gray-300 p-3">Billionaireable Term</td>
                                <td className="border border-gray-300 p-3 bg-blue-50">Suggestion / Evolution (AI)</td>
                                <td className="border border-gray-300 p-3 text-center">Priority</td>
                            </tr>
                        </thead>
                        <tbody>
                            {spreadsheetData.map((row, i) => (
                                <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400">{i + 2}</td>
                                    <td className="border border-gray-300 p-3 font-bold">{row.concept}</td>
                                    <td className="border border-gray-300 p-3 text-gray-500">{row.original}</td>
                                    <td className="border border-gray-300 p-3 font-bold text-art-orange uppercase tracking-tighter text-sm">{row.billionaire}</td>
                                    <td className="border border-gray-300 p-3 bg-blue-50/50 leading-relaxed font-sans text-sm">
                                        {row.suggestion}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${row.priority === 'CRITICAL' ? 'bg-red-100 text-red-700 border-red-200' :
                                                row.priority === 'HIGH' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                    'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {row.priority}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {/* Empty Rows to simulate Excel */}
                            {[...Array(10)].map((_, i) => (
                                <tr key={i + 10}>
                                    <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400">{i + 7}</td>
                                    <td className="border border-gray-300 p-3"></td>
                                    <td className="border border-gray-300 p-3"></td>
                                    <td className="border border-gray-300 p-3"></td>
                                    <td className="border border-gray-300 p-3 bg-blue-50/20"></td>
                                    <td className="border border-gray-300 p-3"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Tabs */}
                <div className="bg-[#E5E7EB] border-t border-gray-300 p-1 flex gap-0.5">
                    <div className="px-4 py-1 bg-white border-x border-t border-gray-300 text-blue-600 font-bold relative -top-[5px]">
                        Alignment_Matrix
                    </div>
                    <div className="px-4 py-1 hover:bg-gray-200 cursor-pointer">
                        User_Flows
                    </div>
                    <div className="px-4 py-1 hover:bg-gray-200 cursor-pointer text-gray-400">
                        +
                    </div>
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto mt-8 flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-black text-white p-8 rounded-sm shadow-xl font-sans">
                    <h2 className="text-xl font-black mb-4 uppercase tracking-tighter">Strategic Thesis</h2>
                    <p className="text-gray-400 leading-relaxed">
                        We are stripping the "Vulnerability" and "Struggle" out of the G-White frameworks.
                        For the Billionaire, transformation is a matter of **Resource Allocation** and **Architecture**, not just willpower.
                        The suggestion column focuses on how to turn these into automated system components.
                    </p>
                </div>
                <div className="w-full md:w-1/3 bg-art-orange p-8 rounded-sm shadow-xl font-sans text-white">
                    <h2 className="text-xl font-black mb-4 uppercase tracking-tighter text-black">Action Item</h2>
                    <p className="font-bold text-black/80">
                        Select a row to begin deep implementation of the AI-suggested protocol.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GW;
