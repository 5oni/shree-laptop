'use client';

import React from 'react';
import { LaptopCondition } from '@/types';

interface LaptopConditionFormProps {
  condition: LaptopCondition;
  onChange: (condition: LaptopCondition) => void;
}

const CONDITION_OPTIONS = {
  overall: [
    { value: 'excellent', label: 'Excellent', description: 'No scratches, no dents, perfect condition', color: 'green' },
    { value: 'good', label: 'Good', description: 'Minor scratches or dents, overall good condition', color: 'blue' },
    { value: 'poor', label: 'Poor', description: 'Visible scratches, dents, or color fading', color: 'red' },
  ],
  scratches: [
    { value: 'none', label: 'None', color: 'green' },
    { value: 'minor', label: 'Minor', color: 'blue' },
    { value: 'moderate', label: 'Moderate', color: 'yellow' },
    { value: 'severe', label: 'Severe', color: 'red' },
  ],
  dents: [
    { value: 'none', label: 'None', color: 'green' },
    { value: 'minor', label: 'Minor', color: 'blue' },
    { value: 'moderate', label: 'Moderate', color: 'yellow' },
    { value: 'severe', label: 'Severe', color: 'red' },
  ],
  colorFading: [
    { value: 'none', label: 'None', color: 'green' },
    { value: 'slight', label: 'Slight', color: 'blue' },
    { value: 'moderate', label: 'Moderate', color: 'yellow' },
    { value: 'severe', label: 'Severe', color: 'red' },
  ],
  screenCondition: [
    { value: 'perfect', label: 'Perfect', color: 'green' },
    { value: 'good', label: 'Good', color: 'blue' },
    { value: 'minor_issues', label: 'Minor Issues', color: 'yellow' },
    { value: 'major_issues', label: 'Major Issues', color: 'red' },
  ],
  keyboardCondition: [
    { value: 'perfect', label: 'Perfect', color: 'green' },
    { value: 'good', label: 'Good', color: 'blue' },
    { value: 'minor_issues', label: 'Minor Issues', color: 'yellow' },
    { value: 'major_issues', label: 'Major Issues', color: 'red' },
  ],
  batteryHealth: [
    { value: 'excellent', label: 'Excellent (90-100%)', color: 'green' },
    { value: 'good', label: 'Good (70-89%)', color: 'blue' },
    { value: 'fair', label: 'Fair (50-69%)', color: 'yellow' },
    { value: 'poor', label: 'Poor (<50%)', color: 'red' },
  ],
};

const getColorClasses = (color: string) => {
  const colors = {
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-700',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-700',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-700',
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export default function LaptopConditionForm({ condition, onChange }: LaptopConditionFormProps) {
  const updateOverallCondition = (overall: LaptopCondition['overall']) => {
    onChange({
      ...condition,
      overall,
      details: {
        ...condition.details,
        // Auto-set some details based on overall condition
        scratches: overall === 'excellent' ? 'none' : overall === 'good' ? 'minor' : 'moderate',
        dents: overall === 'excellent' ? 'none' : overall === 'good' ? 'minor' : 'moderate',
        colorFading: overall === 'excellent' ? 'none' : overall === 'good' ? 'slight' : 'moderate',
        screenCondition: overall === 'excellent' ? 'perfect' : overall === 'good' ? 'good' : 'minor_issues',
        keyboardCondition: overall === 'excellent' ? 'perfect' : overall === 'good' ? 'good' : 'minor_issues',
        batteryHealth: overall === 'excellent' ? 'excellent' : overall === 'good' ? 'good' : 'fair',
      },
    });
  };

  const updateDetail = (key: keyof LaptopCondition['details'], value: string | boolean) => {
    onChange({
      ...condition,
      details: {
        ...condition.details,
        [key]: value,
      },
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        🔍 Laptop Condition Assessment
      </h3>
      
      {/* Overall Condition */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Overall Condition
        </label>
        <div className="grid grid-cols-1 gap-2">
          {CONDITION_OPTIONS.overall.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateOverallCondition(option.value as LaptopCondition['overall'])}
              className={`p-3 rounded-lg border text-left transition-colors ${
                condition.overall === option.value
                  ? getColorClasses(option.color)
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs opacity-75 mt-1">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Assessment */}
      <div className="space-y-4">
        <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Detailed Assessment
        </h4>
        
        {/* Physical Condition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Scratches
            </label>
            <select
              value={condition.details.scratches || 'none'}
              onChange={(e) => updateDetail('scratches', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {CONDITION_OPTIONS.scratches.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Dents
            </label>
            <select
              value={condition.details.dents || 'none'}
              onChange={(e) => updateDetail('dents', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {CONDITION_OPTIONS.dents.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Color Fading
            </label>
            <select
              value={condition.details.colorFading || 'none'}
              onChange={(e) => updateDetail('colorFading', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {CONDITION_OPTIONS.colorFading.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Screen Condition
            </label>
            <select
              value={condition.details.screenCondition || 'perfect'}
              onChange={(e) => updateDetail('screenCondition', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {CONDITION_OPTIONS.screenCondition.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Keyboard Condition
            </label>
            <select
              value={condition.details.keyboardCondition || 'perfect'}
              onChange={(e) => updateDetail('keyboardCondition', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {CONDITION_OPTIONS.keyboardCondition.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Battery Health
            </label>
            <select
              value={condition.details.batteryHealth || 'excellent'}
              onChange={(e) => updateDetail('batteryHealth', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {CONDITION_OPTIONS.batteryHealth.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Accessories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Charger Included
            </label>
            <select
              value={condition.details.chargerIncluded ? 'yes' : 'no'}
              onChange={(e) => updateDetail('chargerIncluded', e.target.value === 'yes')}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Original Box Included
            </label>
            <select
              value={condition.details.boxIncluded ? 'yes' : 'no'}
              onChange={(e) => updateDetail('boxIncluded', e.target.value === 'yes')}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Warranty */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Warranty Remaining
          </label>
          <input
            type="text"
            value={condition.details.warrantyRemaining || ''}
            onChange={(e) => updateDetail('warrantyRemaining', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., 1 year, 6 months, Expired"
          />
        </div>
      </div>
    </div>
  );
}
