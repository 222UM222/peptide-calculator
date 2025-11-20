import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SelectionInputProps {
  label: string;
  presets: number[];
  value: number;
  onChange: (value: number) => void;
  unit: string;
  customValue: string;
  onCustomChange: (value: string) => void;
  isCustom: boolean;
  onCustomFocus?: () => void;
}

export function SelectionInput({
  label,
  presets,
  value,
  onChange,
  unit,
  customValue,
  onCustomChange,
  isCustom,
  onCustomFocus
}: SelectionInputProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">{label}</Label>
      <div className="flex flex-wrap gap-3">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`min-h-[44px] px-6 py-3 rounded-xl font-medium transition-all ${
              value === preset && !isCustom
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {preset}{unit}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <Label className="text-sm font-medium">Custom:</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Enter custom..."
            value={customValue}
            onChange={(e) => onCustomChange(e.target.value)}
            onFocus={onCustomFocus}
            className="w-48 min-h-[44px]"
          />
          <span className="text-sm font-medium text-muted-foreground">{unit}</span>
        </div>
      </div>
    </div>
  );
}

