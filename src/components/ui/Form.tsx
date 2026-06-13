"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

// ==========================================
// 1. Floating Label Input Component
// ==========================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type = "text", onFocus, onBlur, onChange, value, defaultValue, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasVal, setHasVal] = useState(!!value || !!defaultValue);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasVal(!!e.target.value);
      if (onBlur) onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasVal(!!e.target.value);
      if (onChange) onChange(e);
    };

    // Label should float up when focused or contains text
    const shouldFloat = isFocused || hasVal;

    return (
      <div className="relative w-full mb-6 group">
        <input
          ref={ref}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={cn(
            "w-full bg-white/[0.01] text-white font-sans text-xs pt-6 pb-2.5 px-4 border-b border-white/10 rounded-none outline-none transition-all duration-300 focus:border-luxury-brass/80 focus:bg-white/[0.03] placeholder-transparent",
            className
          )}
          {...props}
        />
        
        {/* Floating Label */}
        <label
          className={cn(
            "absolute left-4 pointer-events-none font-sans text-xs tracking-wider uppercase transition-all duration-300 ease-luxury",
            shouldFloat
              ? "top-2 text-[9px] text-luxury-brass font-bold tracking-[0.2em]"
              : "top-1/2 -translate-y-1/2 text-luxury-silver"
          )}
        >
          {label}
        </label>
        
        {/* Golden underline glow */}
        <span className={cn(
          "absolute bottom-0 left-0 w-0 h-[1.5px] bg-luxury-brass transition-all duration-500 ease-luxury",
          isFocused ? "w-full" : "group-hover:w-1/3 group-hover:bg-white/30"
        )} />
      </div>
    );
  }
);
Input.displayName = "Input";

// ==========================================
// 2. Floating Label Textarea Component
// ==========================================
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, onFocus, onBlur, onChange, value, defaultValue, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasVal, setHasVal] = useState(!!value || !!defaultValue);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasVal(!!e.target.value);
      if (onBlur) onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasVal(!!e.target.value);
      if (onChange) onChange(e);
    };

    const shouldFloat = isFocused || hasVal;

    return (
      <div className="relative w-full mb-6 group">
        <textarea
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={cn(
            "w-full bg-white/[0.01] text-white font-sans text-xs pt-6 pb-2.5 px-4 border-b border-white/10 rounded-none outline-none transition-all duration-300 focus:border-luxury-brass/80 focus:bg-white/[0.03] min-h-[100px] resize-y placeholder-transparent",
            className
          )}
          {...props}
        />
        
        {/* Floating Label */}
        <label
          className={cn(
            "absolute left-4 pointer-events-none font-sans text-xs tracking-wider uppercase transition-all duration-300 ease-luxury",
            shouldFloat
              ? "top-2 text-[9px] text-luxury-brass font-bold tracking-[0.2em]"
              : "top-5 text-luxury-silver"
          )}
        >
          {label}
        </label>
        
        {/* Golden underline glow */}
        <span className={cn(
          "absolute bottom-0 left-0 w-0 h-[1.5px] bg-luxury-brass transition-all duration-500 ease-luxury",
          isFocused ? "w-full" : "group-hover:w-1/3 group-hover:bg-white/30"
        )} />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// ==========================================
// 3. Glass Select Field Component
// ==========================================
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="relative w-full mb-6 group">
        {/* Label */}
        <span className="block text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-luxury-brass mb-1">
          {label}
        </span>
        
        <div className="relative">
          <select
            ref={ref}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full bg-luxury-charcoal/80 text-white font-sans text-xs py-3 px-4 border border-white/10 rounded-none outline-none appearance-none transition-all duration-300 focus:border-luxury-brass/60 backdrop-blur-md cursor-pointer",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-luxury-obsidian text-white">
                {opt.label}
              </option>
            ))}
          </select>
          
          {/* Arrow icon */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-luxury-silver">
            <Icon icon="solar:alt-arrow-down-line-duotone" className="w-4 h-4" />
          </div>
        </div>
        
        {/* Subtle hover background highlight */}
        <span className={cn(
          "absolute inset-x-0 bottom-0 h-[1px] bg-luxury-brass transition-all duration-500 ease-luxury opacity-0",
          isFocused ? "opacity-100" : "group-hover:opacity-40"
        )} />
      </div>
    );
  }
);
Select.displayName = "Select";
