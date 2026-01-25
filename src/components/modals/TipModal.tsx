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
import { Zap, Heart, Sparkles, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TipModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    streamerName: string;
}

export function TipModal({ isOpen, onOpenChange, streamerName }: TipModalProps) {
    const [amount, setAmount] = useState("");
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

    const presets = [100, 500, 1000, 5000];

    const handleSendTip = () => {
        if (!amount && !selectedPreset) {
            toast.error("Please enter or select a tip amount.");
            return;
        }
        toast.success(`You tipped ${streamerName}!`, {
            description: "Thanks for supporting the creator."
        });
        onOpenChange(false);
        setAmount("");
        setSelectedPreset(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-twitch-surface border-border sm:max-w-[400px] shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                        <Zap className="h-6 w-6 text-[var(--cs-cyan)]" />
                        Tip <span className="text-[var(--cs-cyan)]">{streamerName}</span>
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Directly support the streamer with a bits tip.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="grid grid-cols-2 gap-2">
                        {presets.map((p) => (
                            <button
                                key={p}
                                onClick={() => {
                                    setSelectedPreset(p);
                                    setAmount("");
                                }}
                                className={cn(
                                    "p-3 rounded-lg border font-bold transition-all duration-300 flex flex-col items-center gap-1",
                                    selectedPreset === p
                                        ? "bg-[var(--cs-cyan)]/20 border-[var(--cs-cyan)] text-[var(--cs-cyan)] shadow-[0_0_15px_rgba(0,255,247,0.2)]"
                                        : "bg-black/20 border-border hover:border-white/20"
                                )}
                            >
                                <div className="flex items-center gap-1">
                                    <Zap className="h-4 w-4" />
                                    {p}
                                </div>
                                <span className="text-[10px] text-muted-foreground">Bits</span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Custom Amount</label>
                        <div className="relative group">
                            <Input
                                type="number"
                                placeholder="Enter bits..."
                                className="pl-10 bg-black/20 border-border focus-visible:ring-[var(--cs-cyan)]"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setSelectedPreset(null);
                                }}
                            />
                            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--cs-yellow)]" />
                        </div>
                    </div>

                    <div className="bg-black/40 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[var(--cs-magenta)]/10 flex items-center justify-center">
                                <Heart className="h-4 w-4 text-[var(--cs-magenta)]" />
                            </div>
                            <span className="text-sm font-medium">Monthly Top Tippers</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs text-[var(--cs-cyan)]">View All</Button>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        className="w-full btn-cyber-brand"
                        onClick={handleSendTip}
                    >
                        <Send className="h-4 w-4 mr-2" />
                        Send Tip
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
