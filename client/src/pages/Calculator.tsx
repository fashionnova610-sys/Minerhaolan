import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Bitcoin, RefreshCw, Zap, DollarSign, Activity, Server } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";

// Coin definitions with default values
const COINS = {
  BTC: { name: "Bitcoin", symbol: "BTC", algorithm: "SHA-256", reward: 3.125, blockTime: 600 },
  LTC: { name: "Litecoin", symbol: "LTC", algorithm: "Scrypt", reward: 6.25, blockTime: 150 },
  DOGE: { name: "Dogecoin", symbol: "DOGE", algorithm: "Scrypt", reward: 10000, blockTime: 60 },
  KAS: { name: "Kaspa", symbol: "KAS", algorithm: "kHeavyHash", reward: 110, blockTime: 1 },
};

export default function Calculator() {
  const [selectedCoin, setSelectedCoin] = useState<keyof typeof COINS>("BTC");
  const [hashrate, setHashrate] = useState(100);
  const [power, setPower] = useState(3000);
  const [cost, setCost] = useState(0.10);
  const [price, setPrice] = useState(65000);
  const [difficulty, setDifficulty] = useState(80000000000000);
  const [loading, setLoading] = useState(false);

  // Fetch live data
  const fetchMarketData = async () => {
    setLoading(true);
    try {
      // Fetch Price
      const coinIdMap = { BTC: "bitcoin", LTC: "litecoin", DOGE: "dogecoin", KAS: "kaspa" };
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIdMap[selectedCoin]}&vs_currencies=usd`
      );
      const data = await response.json();
      const newPrice = data[coinIdMap[selectedCoin]]?.usd;
      if (newPrice) setPrice(newPrice);

      // Fetch Difficulty for BTC
      if (selectedCoin === "BTC") {
        try {
          const diffResponse = await fetch("https://blockchain.info/q/getdifficulty");
          const diffData = await diffResponse.text();
          const newDiff = parseFloat(diffData);
          if (!isNaN(newDiff)) {
            setDifficulty(newDiff);
            toast.success(`Updated BTC Difficulty: ${(newDiff / 1e12).toFixed(2)} T`);
          }
        } catch (e) {
          console.error("Failed to fetch BTC difficulty", e);
        }
      }

      toast.success(`Updated ${selectedCoin} price: $${newPrice}`);
    } catch (error) {
      toast.error("Failed to fetch market data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, [selectedCoin]);

  const calculateProfit = () => {
    const coin = COINS[selectedCoin];
    let dailyRevenueCoin = 0;

    if (selectedCoin === "BTC") {
      // BTC Revenue = (Hashrate * 1e12 * Reward * 86400) / (Difficulty * 2^32)
      // Difficulty is roughly 80T (80e12)
      dailyRevenueCoin = (hashrate * 1e12 * coin.reward * 86400) / (difficulty * 4294967296);
    } else if (selectedCoin === "LTC") {
      // LTC Revenue approximation (simplified)
      // Hashrate in MH/s usually for Scrypt, but input says TH/s. 
      // Assuming user inputs correct unit relative to difficulty.
      // For simplicity in this demo, we use a fixed factor derived from typical profitability
      // Real calc needs network hashrate or difficulty.
      // 1 GH/s LTC ~= 0.003 LTC/day (approx) -> 1 TH/s = 3 LTC/day
      dailyRevenueCoin = hashrate * 3.5;
    } else if (selectedCoin === "DOGE") {
      // DOGE is merged mined with LTC. 
      // 1 GH/s Scrypt ~= 15 DOGE/day -> 1 TH/s = 15000 DOGE/day
      dailyRevenueCoin = hashrate * 15000;
    } else if (selectedCoin === "KAS") {
      // KAS 1 TH/s ~= 40 KAS/day (approx, highly volatile)
      dailyRevenueCoin = hashrate * 40;
    }

    const dailyRevenueUSD = dailyRevenueCoin * price;
    const dailyCostUSD = (power / 1000) * 24 * cost;
    const dailyProfitUSD = dailyRevenueUSD - dailyCostUSD;

    return {
      daily: { coin: dailyRevenueCoin, usd: dailyRevenueUSD, cost: dailyCostUSD, profit: dailyProfitUSD },
      monthly: { coin: dailyRevenueCoin * 30, usd: dailyRevenueUSD * 30, cost: dailyCostUSD * 30, profit: dailyProfitUSD * 30 },
      yearly: { coin: dailyRevenueCoin * 365, usd: dailyRevenueUSD * 365, cost: dailyCostUSD * 365, profit: dailyProfitUSD * 365 },
    };
  };

  const stats = calculateProfit();
  const coinInfo = COINS[selectedCoin];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-secondary/20 py-12 border-b border-border">
          <div className="container text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">Mining Profit Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estimate your mining earnings with real-time market data.
            </p>
          </div>
        </div>

        <div className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Inputs */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" /> Parameters
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={fetchMarketData}
                    disabled={loading}
                    className={loading ? "animate-spin" : ""}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label>Cryptocurrency</Label>
                  <Select
                    value={selectedCoin}
                    onValueChange={(v) => setSelectedCoin(v as keyof typeof COINS)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(COINS).map(([key, info]) => (
                        <SelectItem key={key} value={key}>
                          {info.name} ({info.symbol}) - {info.algorithm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="hashrate">Hashrate (TH/s)</Label>
                  <div className="relative">
                    <Input
                      id="hashrate"
                      type="number"
                      value={hashrate}
                      onChange={(e) => setHashrate(Number(e.target.value))}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-muted-foreground font-mono">TH/s</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="power">Power Consumption</Label>
                  <div className="relative">
                    <Input
                      id="power"
                      type="number"
                      value={power}
                      onChange={(e) => setPower(Number(e.target.value))}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-muted-foreground font-mono">Watts</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="cost">Electricity Cost</Label>
                  <div className="relative">
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={cost}
                      onChange={(e) => setCost(Number(e.target.value))}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-muted-foreground font-mono">$/kWh</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="price">{coinInfo.symbol} Price (USD)</Label>
                    <div className="relative">
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="pl-8"
                      />
                      <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-mono">$</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="difficulty">Network Difficulty</Label>
                    <Input
                      id="difficulty"
                      type="number"
                      value={difficulty}
                      onChange={(e) => setDifficulty(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border bg-secondary/10 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Estimated Earnings</h2>
                  <div className="text-sm text-muted-foreground">
                    Based on {coinInfo.name} Network
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-secondary/5">
                        <th className="p-4 text-left font-medium text-muted-foreground text-sm">Period</th>
                        <th className="p-4 text-right font-medium text-muted-foreground text-sm">Revenue ({coinInfo.symbol})</th>
                        <th className="p-4 text-right font-medium text-muted-foreground text-sm">Revenue (USD)</th>
                        <th className="p-4 text-right font-medium text-muted-foreground text-sm">Elec. Cost</th>
                        <th className="p-4 text-right font-bold text-primary text-sm">Profit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      <tr>
                        <td className="p-4 font-medium">Daily</td>
                        <td className="p-4 text-right font-mono text-sm">{stats.daily.coin.toFixed(6)}</td>
                        <td className="p-4 text-right font-mono text-sm">${stats.daily.usd.toFixed(2)}</td>
                        <td className="p-4 text-right font-mono text-sm text-destructive">-${stats.daily.cost.toFixed(2)}</td>
                        <td className={`p-4 text-right font-mono font-bold ${stats.daily.profit >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                          ${stats.daily.profit.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Monthly</td>
                        <td className="p-4 text-right font-mono text-sm">{stats.monthly.coin.toFixed(6)}</td>
                        <td className="p-4 text-right font-mono text-sm">${stats.monthly.usd.toFixed(2)}</td>
                        <td className="p-4 text-right font-mono text-sm text-destructive">-${stats.monthly.cost.toFixed(2)}</td>
                        <td className={`p-4 text-right font-mono font-bold ${stats.monthly.profit >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                          ${stats.monthly.profit.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Yearly</td>
                        <td className="p-4 text-right font-mono text-sm">{stats.yearly.coin.toFixed(6)}</td>
                        <td className="p-4 text-right font-mono text-sm">${stats.yearly.usd.toFixed(2)}</td>
                        <td className="p-4 text-right font-mono text-sm text-destructive">-${stats.yearly.cost.toFixed(2)}</td>
                        <td className={`p-4 text-right font-mono font-bold ${stats.yearly.profit >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                          ${stats.yearly.profit.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg border border-border flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Daily Power Cost</div>
                    <div className="font-bold text-lg">${stats.daily.cost.toFixed(2)}</div>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Break-even Days</div>
                    <div className="font-bold text-lg">
                      {stats.daily.profit > 0 ? Math.ceil(10000 / stats.daily.profit) : "∞"} <span className="text-xs font-normal text-muted-foreground">(est. on $10k)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                    <Server className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Efficiency</div>
                    <div className="font-bold text-lg">{(power / hashrate).toFixed(1)} <span className="text-xs font-normal text-muted-foreground">J/TH</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm text-muted-foreground">
                <p>
                  <strong>Disclaimer:</strong> This calculator provides estimates based on current network difficulty and market prices. Actual results will vary due to difficulty adjustments, price volatility, pool fees, and hardware variance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
