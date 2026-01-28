import React from 'react';

const GW: React.FC = () => {
    const comparisonData = [
        {
            garrett: "Core 4",
            garrettDef: "Body, Being, Balance, Business",
            billionaireable: "The Sovereign Engine",
            billionaireableDef: "Bio-Availability, Ascendance, Dynasty, Capital",
            notes: "Moving from 'Individual Production' to 'Global Sovereignty'."
        },
        {
            garrett: "The Stack",
            garrettDef: "Facts, Feelings, Focus, Fruit",
            billionaireable: "The Strategic Filter",
            billionaireableDef: "Inputs, Bias, Leverage, Outcome",
            notes: "A system for high-stakes decision making without the emotional overhead."
        },
        {
            garrett: "The Pit",
            garrettDef: "Group exposure and accountability",
            billionaireable: "The Syndicate Table",
            billionaireableDef: "Private deal stress-testing & peer auditing",
            notes: "Replacing public shame with private, elite peer scrutiny."
        },
        {
            garrett: "Wake Up, Warrior",
            garrettDef: "The call to the individual man",
            billionaireable: "Initiation, Billionaire",
            billionaireableDef: "The call to the sovereign leader",
            notes: "Shifting the target from 'Warrior' to 'Architect of Reality'."
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 p-8 md:p-16 animate-fade-in font-serif">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16 border-b border-black/5 pb-8">
                    <h1 className="text-5xl font-black tracking-tighter mb-4">GW // THE ALIGNMENT</h1>
                    <p className="text-xl text-gray-500 italic">Deconstructing the Warrior's Way into the Billionaire's Architecture.</p>
                </header>

                <section className="mb-20">
                    <h2 className="font-sans text-xs font-black uppercase tracking-[0.3em] mb-8 text-art-orange">Conceptual Mapping</h2>
                    <div className="overflow-hidden rounded-[32px] border border-black/5 shadow-2xl bg-art-offwhite/30 backdrop-blur-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black text-white">
                                    <th className="p-6 font-sans text-[10px] font-bold uppercase tracking-widest">Garrett White / Warrior</th>
                                    <th className="p-6 font-sans text-[10px] font-bold uppercase tracking-widest">Billionaireable Adopted</th>
                                    <th className="p-6 font-sans text-[10px] font-bold uppercase tracking-widest">Conversion Strategy</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5 text-black dark:text-white">
                                {comparisonData.map((row, i) => (
                                    <tr key={i} className="hover:bg-art-orange/5 transition-colors group">
                                        <td className="p-8">
                                            <div className="font-sans font-black text-lg mb-1">{row.garrett}</div>
                                            <div className="text-sm text-gray-400 italic">{row.garrettDef}</div>
                                        </td>
                                        <td className="p-8">
                                            <div className="font-sans font-black text-lg mb-1 text-art-orange">{row.billionaireable}</div>
                                            <div className="text-sm text-gray-400 italic">{row.billionaireableDef}</div>
                                        </td>
                                        <td className="p-8 text-sm font-medium leading-relaxed">
                                            {row.notes}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="p-12 bg-black rounded-[40px] text-white flex flex-col justify-between h-full shadow-2xl">
                        <div>
                            <h3 className="font-sans text-2xl font-black mb-6">The "Warrior" Tone</h3>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                Raw, directive, and confrontational. It relies on psychological tension and the breakdown of the ego to create progress.
                            </p>
                        </div>
                        <div className="pt-8 border-t border-white/10">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-art-orange">Status: Raw</span>
                        </div>
                    </div>

                    <div className="p-12 bg-art-orange rounded-[40px] text-white flex flex-col justify-between h-full shadow-2xl">
                        <div>
                            <h3 className="font-sans text-2xl font-black mb-6">The "Billionaire" Tone</h3>
                            <p className="leading-relaxed mb-8">
                                Prestigious, calm, and objective. Progress is not a fight; it is an architectural certainty. We guide, we don't argue.
                            </p>
                        </div>
                        <div className="pt-8 border-t border-white/10">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-black">Status: Absolute</span>
                        </div>
                    </div>
                </section>

                <footer className="mt-20 pt-8 border-t border-black/5 text-center">
                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        Standing by for specific term updates.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default GW;
