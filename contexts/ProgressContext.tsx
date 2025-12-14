import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Level = 'Architect' | 'Accumulator' | 'Optimizer' | 'Autonomy' | 'Perpetual';

interface SkillProgress {
    skillId: string;
    completedModules: number[];
}

interface TriangleScores {
    capital: { structure: number; flow: number; control: number };
    vitality: { energy: number; clarity: number; relationship: number };
    leverage: { tools: number; team: number; scale: number };
    date: Date;
}

interface UserProgress {
    currentLevel: Level;
    netWorth: number;
    revenue: number;
    skillProgress: SkillProgress[];
    triangleHistory: TriangleScores[];
    decisions: {
        hierarchy?: string;
        integration?: string;
        progressionRules?: string;
        financialMechanics?: string;
        brandCohesion?: string;
        userFlow?: string;
    };
}

interface ProgressContextType {
    progress: UserProgress;
    updateNetWorth: (amount: number) => void;
    updateRevenue: (amount: number) => void;
    completeModule: (skillId: string, moduleId: number) => void;
    addTriangleScore: (scores: Omit<TriangleScores, 'date'>) => void;
    updateDecision: (key: string, value: string) => void;
    getSkillCompletion: (skillId: string) => number;
    getNextLevelThreshold: (level: Level) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<UserProgress>({
        currentLevel: 'Architect',
        netWorth: 5000000,
        revenue: 0,
        skillProgress: [],
        triangleHistory: [],
        decisions: {},
    });

    const updateNetWorth = (amount: number) => {
        setProgress(prev => {
            const newNetWorth = amount;
            let newLevel = prev.currentLevel;

            if (newNetWorth >= 1000000000) newLevel = 'Perpetual';
            else if (newNetWorth >= 250000000) newLevel = 'Autonomy';
            else if (newNetWorth >= 50000000) newLevel = 'Optimizer';
            else if (newNetWorth >= 10000000) newLevel = 'Accumulator';
            else newLevel = 'Architect';

            return { ...prev, netWorth: newNetWorth, currentLevel: newLevel };
        });
    };

    const completeModule = (skillId: string, moduleId: number) => {
        setProgress(prev => {
            const existing = prev.skillProgress.find(s => s.skillId === skillId);
            const newProgress = prev.skillProgress.filter(s => s.skillId !== skillId);

            if (existing) {
                if (!existing.completedModules.includes(moduleId)) {
                    newProgress.push({
                        skillId,
                        completedModules: [...existing.completedModules, moduleId].sort()
                    });
                } else {
                    newProgress.push(existing);
                }
            } else {
                newProgress.push({ skillId, completedModules: [moduleId] });
            }

            return { ...prev, skillProgress: newProgress };
        });
    };

    const addTriangleScore = (scores: Omit<TriangleScores, 'date'>) => {
        setProgress(prev => ({
            ...prev,
            triangleHistory: [...prev.triangleHistory, { ...scores, date: new Date() }]
        }));
    };

    const updateDecision = (key: string, value: string) => {
        setProgress(prev => ({
            ...prev,
            decisions: { ...prev.decisions, [key]: value }
        }));
    };

    const getSkillCompletion = (skillId: string): number => {
        const skill = progress.skillProgress.find(s => s.skillId === skillId);
        return skill ? skill.completedModules.length : 0;
    };

    const updateRevenue = (amount: number) => {
        setProgress(prev => ({ ...prev, revenue: amount }));
    };

    const getNextLevelThreshold = (level: Level): number => {
        switch (level) {
            case 'Architect': return 50000;
            case 'Accumulator': return 1000000;
            case 'Optimizer': return 10000000;
            case 'Autonomy': return 50000000;
            case 'Perpetual': return 1000000000;
            default: return 1000000000;
        }
    };

    return (
        <ProgressContext.Provider value={{
            progress,
            updateNetWorth,
            updateRevenue,
            completeModule,
            addTriangleScore,
            updateDecision,
            getSkillCompletion,
            getNextLevelThreshold,
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) throw new Error('useProgress must be used within ProgressProvider');
    return context;
};
