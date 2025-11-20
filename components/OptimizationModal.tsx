import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HelpCircle, Calculator } from "lucide-react";

export function OptimizationModal() {
  const [dose, setDose] = useState("");
  const [strength, setStrength] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const d = parseFloat(dose);
    const s = parseFloat(strength);

    if (isNaN(d) || d <= 0 || isNaN(s) || s <= 0) {
      setError("Please enter valid positive numbers.");
      setResult(null);
      return;
    }

    // Logic: We want dose volume to be 0.1 mL (10 units)
    // V_total = (0.1 * S) / D
    // Example: Dose 0.25mg, Strength 10mg. V = (0.1 * 10) / 0.25 = 4mL.
    // Verify: 10mg/4mL = 2.5mg/mL. 0.25mg / 2.5 = 0.1mL. Correct.
    
    const volumeToAdd = (0.1 * s) / d;
    setResult(volumeToAdd);
    setError(null);
  };

  const handleIDK = () => {
    setDose("");
    setStrength("");
    setResult(null);
    setError("You are unqualified to research peptides.");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calculator className="h-4 w-4" />
          How much to add?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Optimize Reconstitution</DialogTitle>
          <DialogDescription>
            Calculate how much water to add so your dose equals exactly 10 units (0.1mL) on the syringe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="opt-dose" className="text-right">
              My Dose (mg)
            </Label>
            <Input
              id="opt-dose"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              className="col-span-3"
              placeholder="e.g. 0.25"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="opt-strength" className="text-right">
              Vial (mg)
            </Label>
            <Input
              id="opt-strength"
              value={strength}
              onChange={(e) => setStrength(e.target.value)}
              className="col-span-3"
              placeholder="e.g. 10"
              type="number"
            />
          </div>
        </div>
        
        {result !== null && (
          <div className="bg-secondary/50 p-4 rounded-lg text-center mb-4">
             <p className="text-sm text-muted-foreground">Add this much water:</p>
             <p className="text-3xl font-bold text-primary">{result.toFixed(2)} mL</p>
             <p className="text-xs text-muted-foreground mt-2">
               Your dose of {dose}mg will then be exactly 10 units.
             </p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md text-center text-sm font-medium mb-4">
            {error}
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
           <Button variant="destructive" onClick={handleIDK}>
            IDK?
          </Button>
          <Button onClick={handleCalculate}>Calculate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

