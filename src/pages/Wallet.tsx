import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
   Wallet as WalletIcon,
   ArrowUpRight,
   ArrowDownLeft,
   CreditCard,
   History,
   TrendingUp,
   Banknote,
   ShieldCheck,
   Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Wallet() {
   const [balance, setBalance] = useState(1250.75);
   const [showDeposit, setShowDeposit] = useState(false);
   const [showWithdraw, setShowWithdraw] = useState(false);
   const [amount, setAmount] = useState('');

   const transactions = [
      { id: '1', type: 'deposit', amount: 500.00, status: 'completed', date: '2024-01-20', method: 'Stripe' },
      { id: '2', type: 'withdrawal', amount: 200.00, status: 'completed', date: '2024-01-18', method: 'Bank Transfer' },
      { id: '3', type: 'deposit', amount: 100.00, status: 'completed', date: '2024-01-15', method: 'Stripe' },
      { id: '4', type: 'earning', amount: 850.75, status: 'completed', date: '2024-01-12', method: 'Stream Revenue' },
   ];

   const handleDeposit = () => {
      if (!amount || isNaN(Number(amount))) {
         toast.error('Please enter a valid amount');
         return;
      }
      toast.success(`Redirecting to Stripe to deposit $${amount}...`);
      // Simulated delay
      setTimeout(() => {
         setBalance(prev => prev + Number(amount));
         setShowDeposit(false);
         setAmount('');
         toast.success('Funds added successfully!');
      }, 2000);
   };

   const handleWithdraw = () => {
      if (!amount || isNaN(Number(amount))) {
         toast.error('Please enter a valid amount');
         return;
      }
      if (Number(amount) > balance) {
         toast.error('Insufficient funds');
         return;
      }
      toast.success(`Processing withdrawal of $${amount} to your primary account...`);
      setTimeout(() => {
         setBalance(prev => prev - Number(amount));
         setShowWithdraw(false);
         setAmount('');
         toast.success('Withdrawal request submitted successfully!');
      }, 2000);
   };

   return (
      <MainLayout>
         <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
               <div>
                  <h1 className="text-3xl font-bold text-gradient">My Wallet</h1>
                  <p className="text-muted-foreground">Manage your funds and withdrawals</p>
               </div>
               <div className="flex items-center gap-3">
                  <div className="bg-[var(--cs-green)]/10 border border-[var(--cs-green)]/30 px-4 py-2 rounded-lg flex items-center gap-2">
                     <ShieldCheck className="h-5 w-5 text-[var(--cs-green)]" />
                     <span className="text-sm font-semibold text-[var(--cs-green)]">Secure Payments by Stripe</span>
                  </div>
               </div>
            </div>

            {/* Balance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-2 relative overflow-hidden bg-twitch-surface rounded-xl border border-border p-8 group">
                  {/* Background Glow */}
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--cs-cyan)] opacity-10 rounded-full blur-[80px] group-hover:opacity-20 transition-opacity" />
                  <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[var(--cs-magenta)] opacity-10 rounded-full blur-[80px] group-hover:opacity-20 transition-opacity" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                     <div>
                        <div className="flex items-center gap-2 text-[var(--cs-cyan)] mb-2">
                           <WalletIcon className="h-5 w-5" />
                           <span className="text-sm font-bold uppercase tracking-wider">Total Balance</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                           <span className="text-5xl font-black text-foreground">${balance.toLocaleString()}</span>
                           <span className="text-[var(--cs-green)] flex items-center gap-1 text-sm font-bold">
                              <TrendingUp className="h-4 w-4" />
                              +12.5%
                           </span>
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4 mt-8">
                        <Button
                           className="btn-cyber-brand h-12 px-8 text-base shadow-[0_0_20px_var(--cs-glow-cyan)]"
                           onClick={() => {
                              setShowDeposit(true);
                              setShowWithdraw(false);
                           }}
                        >
                           <Plus className="h-5 w-5 mr-2" />
                           Deposit Funds
                        </Button>
                        <Button
                           variant="outline"
                           className="h-12 px-8 text-base border-border hover:border-[var(--cs-magenta)] hover:text-[var(--cs-magenta)] hover:bg-[var(--cs-magenta)]/5"
                           onClick={() => {
                              setShowWithdraw(true);
                              setShowDeposit(false);
                           }}
                        >
                           <ArrowUpRight className="h-5 w-5 mr-2" />
                           Withdraw to Bank
                        </Button>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <WidgetCard title="Linked Accounts" className="h-full">
                     <div className="space-y-4">
                        <div className="p-3 bg-black/40 rounded-lg border border-border flex items-center gap-3">
                           <div className="w-10 h-10 bg-[var(--cs-cyan)]/20 rounded-full flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-[var(--cs-cyan)]" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold">Visa •••• 4242</p>
                              <p className="text-xs text-muted-foreground">Primary Card</p>
                           </div>
                           <div className="text-[var(--cs-green)] text-xs font-bold bg-[var(--cs-green)]/10 px-2 py-1 rounded">Active</div>
                        </div>
                        <div className="p-3 bg-black/40 rounded-lg border border-border flex items-center gap-3 opacity-60">
                           <div className="w-10 h-10 bg-[var(--cs-yellow)]/20 rounded-full flex items-center justify-center">
                              <Banknote className="h-5 w-5 text-[var(--cs-yellow)]" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold">Chase •••• 9876</p>
                              <p className="text-xs text-muted-foreground">Bank Account</p>
                           </div>
                        </div>
                        <Button
                           variant="ghost"
                           className="w-full border-dashed border border-border hover:border-[var(--cs-cyan)] text-xs h-10"
                           onClick={() => toast.info("Payment method integration coming soon!")}
                        >
                           + Add New Method
                        </Button>
                     </div>
                  </WidgetCard>
               </div>
            </div>

            {/* Deposit/Withdraw UI */}
            {(showDeposit || showWithdraw) && (
               <div className="bg-twitch-surface border border-[var(--cs-green)]/30 rounded-xl p-6 shadow-[0_0_30px_rgba(var(--cs-green-rgb),0.05)] animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-xl font-bold flex items-center gap-2">
                        {showDeposit ? (
                           <><Plus className="h-6 w-6 text-[var(--cs-cyan)]" /> Deposit via Stripe</>
                        ) : (
                           <><ArrowUpRight className="h-6 w-6 text-[var(--cs-magenta)]" /> Withdraw to Bank</>
                        )}
                     </h3>
                     <Button variant="ghost" size="icon" onClick={() => { setShowDeposit(false); setShowWithdraw(false); }}>
                        <Plus className="h-5 w-5 rotate-45" />
                     </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <label className="text-sm font-medium">Amount to {showDeposit ? 'Deposit' : 'Withdraw'}</label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">$</span>
                           <Input
                              type="number"
                              placeholder="0.00"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="pl-10 h-16 text-3xl font-black bg-black/40 border-border focus-visible:ring-[var(--cs-cyan)]"
                           />
                        </div>
                        <div className="flex gap-2">
                           {[10, 50, 100, 500].map(val => (
                              <button
                                 key={val}
                                 onClick={() => setAmount(val.toString())}
                                 className="flex-1 py-2 bg-twitch-hover rounded border border-border text-sm hover:border-[var(--cs-cyan)] transition-colors"
                              >
                                 +${val}
                              </button>
                           ))}
                        </div>
                     </div>
                     <div className="bg-black/20 rounded-lg p-6 border border-border flex flex-col justify-center">
                        <div className="flex justify-between mb-4">
                           <span className="text-muted-foreground">Subtotal</span>
                           <span>${Number(amount || 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                           <span className="text-muted-foreground">Transaction Fee</span>
                           <span className="text-[var(--cs-green)]">FREE</span>
                        </div>
                        <div className="border-t border-border pt-4 flex justify-between">
                           <span className="font-bold">Total</span>
                           <span className="font-bold text-xl text-[var(--cs-cyan)]">${Number(amount || 0).toFixed(2)}</span>
                        </div>
                        <Button
                           className={cn(
                              "mt-6 h-12 font-bold",
                              showDeposit ? "btn-cyber-brand" : "bg-[var(--cs-magenta)] hover:bg-[var(--cs-magenta)]/90 text-white"
                           )}
                           onClick={showDeposit ? handleDeposit : handleWithdraw}
                        >
                           Confirm {showDeposit ? 'Deposit' : 'Withdrawal'}
                        </Button>
                     </div>
                  </div>
               </div>
            )}

            {/* Recent Transactions */}
            <WidgetCard title="Recent Transactions" headerAction={<Button variant="ghost" size="sm" className="text-xs" onClick={() => toast.info("Full transaction history coming soon!")}>View All</Button>}>
               <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                     <thead>
                        <tr className="border-b border-border/50 text-muted-foreground text-left">
                           <th className="py-3 font-medium">Type</th>
                           <th className="py-3 font-medium">Date</th>
                           <th className="py-3 font-medium">Method</th>
                           <th className="py-3 font-medium text-right">Status</th>
                           <th className="py-3 font-medium text-right">Amount</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border/50">
                        {transactions.map(tx => (
                           <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                              <td className="py-4">
                                 <div className="flex items-center gap-3">
                                    <div className={cn(
                                       "w-8 h-8 rounded-full flex items-center justify-center",
                                       tx.type === 'deposit' ? "bg-[var(--cs-cyan)]/10 text-[var(--cs-cyan)]" :
                                          tx.type === 'withdrawal' ? "bg-[var(--cs-magenta)]/10 text-[var(--cs-magenta)]" :
                                             "bg-[var(--cs-green)]/10 text-[var(--cs-green)]"
                                    )}>
                                       {tx.type === 'deposit' ? <ArrowDownLeft className="h-4 w-4" /> :
                                          tx.type === 'withdrawal' ? <ArrowUpRight className="h-4 w-4" /> :
                                             <History className="h-4 w-4" />}
                                    </div>
                                    <span className="font-semibold capitalize">{tx.type}</span>
                                 </div>
                              </td>
                              <td className="py-4 text-muted-foreground font-mono">{tx.date}</td>
                              <td className="py-4 text-muted-foreground">{tx.method}</td>
                              <td className="py-4 text-right">
                                 <span className="px-2 py-0.5 rounded-full bg-[var(--cs-green)]/10 text-[var(--cs-green)] text-[10px] uppercase font-bold border border-[var(--cs-green)]/20">
                                    {tx.status}
                                 </span>
                              </td>
                              <td className={cn(
                                 "py-4 text-right font-bold text-lg",
                                 tx.type === 'withdrawal' ? "text-foreground" : "text-[var(--cs-green)]"
                              )}>
                                 {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </WidgetCard>
         </div>
      </MainLayout>
   );
}
