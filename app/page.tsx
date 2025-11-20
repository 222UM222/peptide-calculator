'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Droplet, Thermometer, Syringe } from "lucide-react";
import { SyringeAnimation, SyringeSize } from "@/components/SyringeAnimation";
import { APP_TITLE } from "@/const";
import { SelectionInput } from "@/components/SelectionInput";
import { OptimizationModal } from "@/components/OptimizationModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Common preset values
const DOSE_PRESETS_MG = [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 5];
const DOSE_PRESETS_MCG = [100, 250, 500, 750, 1000, 2000, 3000, 5000];
const PEPTIDE_STRENGTH_PRESETS = [2, 5, 10, 15, 20, 30];
const WATER_VOLUME_PRESETS = [1, 2, 3, 4, 5, 10];

export default function Home() {
  const [dose, setDose] = useState(0.25); // stored in mg internally
  const [doseUnit, setDoseUnit] = useState<'mg' | 'mcg'>('mg');
  const [peptideStrength, setPeptideStrength] = useState(10); // mg
  const [waterVolume, setWaterVolume] = useState(2); // mL
  
  const [customDose, setCustomDose] = useState("");
  const [useCustomDose, setUseCustomDose] = useState(false);
  
  const [customStrength, setCustomStrength] = useState("");
  const [useCustomStrength, setUseCustomStrength] = useState(false);
  
  const [customWater, setCustomWater] = useState("");
  const [useCustomWater, setUseCustomWater] = useState(false);
  
  const [syringeSize, setSyringeSize] = useState<SyringeSize>(100);

  // Handle dose change based on current unit
  const handleDoseChange = (val: number) => {
    if (doseUnit === 'mg') {
      setDose(val);
    } else {
      setDose(val / 1000);
    }
    setUseCustomDose(false);
    setCustomDose("");
  };

  const handleCustomDoseChange = (valStr: string) => {
    setCustomDose(valStr);
    const val = parseFloat(valStr);
    if (!isNaN(val) && val > 0) {
      if (doseUnit === 'mg') {
        setDose(val);
      } else {
        setDose(val / 1000);
      }
      setUseCustomDose(true);
    }
  };

  const handleStrengthChange = (val: number) => {
    setPeptideStrength(val);
    setUseCustomStrength(false);
    setCustomStrength("");
  };

  const handleCustomStrengthChange = (valStr: string) => {
    setCustomStrength(valStr);
    const val = parseFloat(valStr);
    if (!isNaN(val) && val > 0) {
      setPeptideStrength(val);
      setUseCustomStrength(true);
    }
  };

  const handleWaterChange = (val: number) => {
    setWaterVolume(val);
    setUseCustomWater(false);
    setCustomWater("");
  };

  const handleCustomWaterChange = (valStr: string) => {
    setCustomWater(valStr);
    const val = parseFloat(valStr);
    if (!isNaN(val) && val > 0) {
      setWaterVolume(val);
      setUseCustomWater(true);
    }
  };

  // Calculations
  const concentration = peptideStrength / waterVolume; // mg/mL
  const volumePerDose = dose / concentration; // mL
  const syringeUnits = volumePerDose * 100; // units on 100-unit syringe

  // Helper for displaying current dose value in selected unit
  const displayDoseValue = doseUnit === 'mg' ? dose : dose * 1000;

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container py-12 md:py-16">
        {/* Header - 8-point grid spacing */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="mb-4">{APP_TITLE}</h1>
          <p className="text-muted-foreground text-lg">
            Calculate reconstitution measurements for accurate peptide dosing
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Calculator Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* Syringe Type Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Syringe Type</Label>
                <Select
                  value={syringeSize.toString()}
                  onValueChange={(v) => setSyringeSize(parseInt(v) as SyringeSize)}
                >
                  <SelectTrigger className="w-full min-h-[44px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 Units (1mL)</SelectItem>
                    <SelectItem value="50">50 Units (0.5mL)</SelectItem>
                    <SelectItem value="30">30 Units (0.3mL)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dose Selection */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Label className="text-base font-semibold">Desired Dose</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-muted-foreground">
                      0.1 mg = 100 mcg(μg)
                    </span>
                    <Tabs 
                      value={doseUnit} 
                      onValueChange={(v: string) => setDoseUnit(v as 'mg' | 'mcg')}
                      className="w-fit"
                    >
                      <TabsList>
                        <TabsTrigger value="mg">mg</TabsTrigger>
                        <TabsTrigger value="mcg">mcg</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                
                <SelectionInput 
                  label="" // Label is handled above for custom layout
                  presets={doseUnit === 'mg' ? DOSE_PRESETS_MG : DOSE_PRESETS_MCG}
                  value={displayDoseValue}
                  onChange={handleDoseChange}
                  unit={doseUnit}
                  customValue={customDose}
                  onCustomChange={handleCustomDoseChange}
                  isCustom={useCustomDose}
                  onCustomFocus={() => setUseCustomDose(true)}
                />
              </div>

              {/* Peptide Strength */}
              <SelectionInput 
                label="Peptide Vial Strength"
                presets={PEPTIDE_STRENGTH_PRESETS}
                value={peptideStrength}
                onChange={handleStrengthChange}
                unit="mg"
                customValue={customStrength}
                onCustomChange={handleCustomStrengthChange}
                isCustom={useCustomStrength}
                onCustomFocus={() => setUseCustomStrength(true)}
              />

              {/* Water Volume */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Bacteriostatic Water Volume</Label>
                  <OptimizationModal />
                </div>
                <SelectionInput 
                  label=""
                  presets={WATER_VOLUME_PRESETS}
                  value={waterVolume}
                  onChange={handleWaterChange}
                  unit="mL"
                  customValue={customWater}
                  onCustomChange={handleCustomWaterChange}
                  isCustom={useCustomWater}
                  onCustomFocus={() => setUseCustomWater(true)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Section - Enhanced visual hierarchy */}
          <Card className="border-primary/30 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Calculation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-secondary/30 rounded-xl border border-border/50 backdrop-blur-md">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Concentration</p>
                  <p className="text-4xl font-bold text-primary mb-2">{concentration.toFixed(2)}</p>
                  <p className="text-sm font-medium text-muted-foreground">mg/mL</p>
                </div>
                <div className="text-center p-6 bg-secondary/30 rounded-xl border border-border/50 backdrop-blur-md">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Volume per Dose</p>
                  <p className="text-4xl font-bold text-primary mb-2">{volumePerDose.toFixed(3)}</p>
                  <p className="text-sm font-medium text-muted-foreground">mL</p>
                </div>
                <div className="text-center p-6 bg-secondary/30 rounded-xl border border-border/50 backdrop-blur-md">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Syringe Units</p>
                  <p className="text-4xl font-bold text-primary mb-2">{syringeUnits.toFixed(1)}</p>
                  <p className="text-sm font-medium text-muted-foreground">units</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Syringe Guide - Prominent display */}
          <Card className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
            <CardHeader>
              <div className="flex items-center gap-3">
                <Syringe className="w-7 h-7 text-primary" />
                <CardTitle>Syringe Guide</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full aspect-[3/1] md:aspect-[3.5/1] max-w-4xl mx-auto px-4">
                 <SyringeAnimation units={syringeUnits} size={syringeSize} />
              </div>
              
              <div className="text-center px-6 pb-8 pt-2">
                <p className="text-base font-medium text-muted-foreground mb-4">
                  Draw to this mark on your {syringeSize}-unit insulin syringe:
                </p>
                <div className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-2xl shadow-lg mb-4">
                  <span className="text-4xl font-bold leading-none mr-2">{syringeUnits.toFixed(1)}</span>
                  <span className="text-xl font-semibold">units</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  This equals <span className="font-semibold text-foreground">{volumePerDose.toFixed(3)}mL</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Safety Information - Warning style */}
          <Card className="border-destructive/40 bg-destructive/5 shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-7 h-7 text-destructive" />
                <CardTitle>Safety Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Droplet className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Use Sterile Bacteriostatic Water</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Always use sterile bacteriostatic water for injection. Never use regular water or other solvents.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Thermometer className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Storage Instructions</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Refrigerate reconstituted peptides at 36-46°F (2-8°C). Do not freeze. Use within recommended timeframe.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Research Purposes Only</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This calculator is for research and educational purposes. Consult a healthcare professional before use.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
