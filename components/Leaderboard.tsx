import React, { useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Medal } from 'lucide-react';
import { Rank } from '../types';

// Mock Data representing other hunters in the world
const MOCK_HUNTERS = [
    { id: 'h1', name: 'Sung Jinwoo', level: 146, xp: 9999999, rank: 'S' as Rank },
    { id: 'h2', name: 'Thomas Andre', level: 120, xp: 5000000, rank: 'National' as Rank },
    { id: 'h3', name: 'Liu Zhigang', level: 118, xp: 4800000, rank: 'National' as Rank },
    { id: 'h4', name: 'Go Gun-Hee', level: 105, xp: 3200000, rank: 'S' as Rank },
    { id: 'h5', name: 'Cha Hae-In', level: 95, xp: 2100000, rank: 'S' as Rank },
    { id: 'h6', name: 'Baek Yoon-Ho', level: 92, xp: 1900000, rank: 'S' as Rank },
    { id: 'h7', name: 'Choi Jong-In', level: 90, xp: 1850000, rank: 'S' as Rank },
    { id: 'h8', name: 'Woo Jin-Chul', level: 85, xp: 1500000, rank: 'A' as Rank },
    { id: 'h9', name: 'Yoo Jinho', level: 40, xp: 50000, rank: 'D' as Rank },
    { id: 'h10', name: 'Lee Joo-Hee', level: 25, xp: 15000, rank: 'B' as Rank },
    { id: 'h11', name: 'Song Chi-Yul', level: 60, xp: 200000, rank: 'C' as Rank },
    { id: 'h12', name: 'Park Heejin', level: 55, xp: 180000, rank: 'B' as Rank },
];

export const Leaderboard: React.FC = () => {
    const { player } = useGame();

    const sortedLeaderboard = useMemo(() => {
        const allHunters = [
            ...MOCK_HUNTERS,
            { 
                id: 'player', 
                name: player.username, 
                level: player.level, 
                xp: player.xp, 
                rank: player.rank 
            }
        ];
        // Sort by Level descending, then XP descending
        return allHunters.sort((a, b) => {
            if (b.level !== a.level) return b.level - a.level;
            return b.xp - a.xp;
        });
    }, [player.username, player.level, player.xp, player.rank]);

    const playerRank = sortedLeaderboard.findIndex(h => h.id === 'player') + 1;

    const getRankIcon = (index: number) => {
        if (index === 0) return <Trophy className="text-sys-gold drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" size={20} />;
        if (index === 1) return <Medal className="text-gray-300" size={20} />;
        if (index === 2) return <Medal className="text-orange-700" size={20} />;
        return <span className="font-mono text-gray-500 font-bold">#{index + 1}</span>;
    };

    const getRowStyle = (rankIndex: number, isPlayer: boolean) => {
        if (isPlayer) return 'bg-sys-blue/20 border-sys-blue shadow-neon z-10 scale-[1.02]';
        if (rankIndex === 0) return 'bg-sys-gold/10 border-sys-gold/50';
        return 'bg-sys-black border-transparent hover:border-gray-700';
    };

    return (
        <div className="pb-20 animate-fade-in space-y-6">
             <div className="border-b border-sys-blue/30 pb-2 mb-6">
                <h2 className="text-xl font-bold uppercase text-sys-blue tracking-[0.2em]">Global Ranking</h2>
                <div className="flex justify-between items-end mt-2">
                    <p className="text-xs text-gray-400">Official Hunter Association Data.</p>
                    <div className="text-xs text-sys-gold font-bold uppercase">Your Rank: #{playerRank}</div>
                </div>
            </div>

            <div className="space-y-2">
                {sortedLeaderboard.map((hunter, index) => {
                    const isPlayer = hunter.id === 'player';
                    return (
                        <div 
                            key={hunter.id}
                            className={`
                                flex items-center justify-between p-3 border-l-4 transition-all duration-300
                                ${getRowStyle(index, isPlayer)}
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-8 flex justify-center items-center">
                                    {getRankIcon(index)}
                                </div>
                                <div>
                                    <div className={`font-bold uppercase text-sm ${isPlayer ? 'text-sys-blue' : 'text-white'}`}>
                                        {hunter.name} {isPlayer && <span className="text-[9px] ml-1 bg-sys-blue text-white px-1 rounded-sm">YOU</span>}
                                    </div>
                                    <div className="text-[10px] text-gray-500">
                                        LVL.{hunter.level} • <span className={`${hunter.rank === 'S' || hunter.rank === 'National' ? 'text-sys-purple' : ''}`}>{hunter.rank}-Rank</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-mono text-gray-400">
                                    {hunter.xp.toLocaleString()} XP
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="text-center text-[10px] text-gray-600 mt-8 font-mono border-t border-white/5 pt-4">
                // SYSTEM NOTICE: Rankings are updated in real-time.
                <br/>
                Surpass the limits to ascend.
            </div>
        </div>
    );
};