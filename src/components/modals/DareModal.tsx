import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sword, Zap, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DareModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    streamerName: string;
}

export function DareModal({ isOpen, onOpenChange, streamerName }: DareModalProps) {
    const [dare, setDare] = useState("");
    const [reward, setReward] = useState("");

    const handleSendDare = () => {
        if (!dare || !reward) {
            toast.error("Please fill in both the dare and the reward.");
            return;
        }
        toast.success("Dare sent!", {
            description: `Your challenge for ${streamerName} is pending approval.`
        });
        onOpenChange(false);
        setDare("");
        setReward("");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-twitch-surface border-border sm:max-w-[500px] shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                        <Sword className="h-6 w-6 text-[var(--cs-yellow)]" />
                        Dare <span className="text-[var(--cs-yellow)]">{streamerName}</span>
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Challenges the streamer to do something live. If they accept and complete it, you pay the reward.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--cs-cyan)] uppercase tracking-wider">The Challenge</label>
                        <Textarea
                            placeholder="e.g. Try to win the next match using only a pistol..."
                            className="bg-black/20 border-border focus-visible:ring-[var(--cs-yellow)] min-h-[100px]"
                            value={dare}
                            onChange={(e) => setDare(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--cs-green)] uppercase tracking-wider">Reward (Bits/Tips)</label>
                        <div className="relative group">
                            <Input
                                type="number"
                                placeholder="Amount..."
                                className="pl-10 bg-black/20 border-border focus-visible:ring-[var(--cs-green)]"
                                value={reward}
                                onChange={(e) => setReward(e.target.value)}
                            />
                            <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--cs-green)]" />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 text-right">
                            Balance: 1,200 bits
                        </p>
                    </div>

                    <div className="bg-black/40 p-3 rounded-lg border border-white/5 space-y-2">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 text-[var(--cs-cyan)] mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-foreground">Escrow Guarantee</p>
                                <p className="text-[10px] text-muted-foreground">The reward will be held safely and only released upon successful completion verified by community mods.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button
                        className="btn-cyber-brand"
                        onClick={handleSendDare}
                    >
                        Send Dare
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
