'use client';

import { useState } from 'react';
import { LaptopSpecs } from '@/types';

interface LaptopSpecsFormProps {
  specs: LaptopSpecs;
  onChange: (specs: LaptopSpecs) => void;
}

// Pre-defined options for easy selection
const PROCESSOR_OPTIONS = [
  'Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9',
  'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9',
  'Intel Pentium', 'Intel Celeron', 'AMD Athlon'
];

const RAM_OPTIONS = ['4GB', '8GB', '16GB', '32GB', '64GB'];
const RAM_TYPE_OPTIONS = ['DDR4', 'DDR5', 'LPDDR4', 'LPDDR5'];
const STORAGE_OPTIONS = ['128GB', '256GB', '512GB', '1TB', '2TB', '4TB'];
const STORAGE_TYPE_OPTIONS = ['SSD', 'HDD', 'SSD+HDD'];
const GRAPHICS_OPTIONS = [
  'Intel UHD Graphics', 'Intel Iris Xe', 'NVIDIA GeForce GTX 1650',
  'NVIDIA GeForce RTX 3050', 'NVIDIA GeForce RTX 3060', 'NVIDIA GeForce RTX 3070',
  'AMD Radeon RX 5500M', 'AMD Radeon RX 6600M', 'AMD Radeon RX 6700M'
];
const DISPLAY_SIZE_OPTIONS = ['11.6"', '13.3"', '14"', '15.6"', '17.3"'];
const DISPLAY_RESOLUTION_OPTIONS = ['1366x768', '1920x1080', '2560x1440', '3840x2160'];
const OS_OPTIONS = ['Windows 11', 'Windows 10', 'macOS', 'Linux', 'Chrome OS'];

export default function LaptopSpecsForm({ specs, onChange }: LaptopSpecsFormProps) {
  const [activeTab, setActiveTab] = useState('processor');

  const updateSpec = (key: keyof LaptopSpecs, value: string | number | boolean | string[] | undefined) => {
    onChange({ ...specs, [key]: value });
  };

  const updateUpgradeOption = (category: 'ram' | 'storage' | 'other', options: string[]) => {
    onChange({
      ...specs,
      upgradeOptions: {
        ...specs.upgradeOptions,
        [category]: options
      }
    });
  };

  const addUpgradeOption = (category: 'ram' | 'storage' | 'other', option: string) => {
    const currentOptions = specs.upgradeOptions?.[category] || [];
    if (!currentOptions.includes(option)) {
      updateUpgradeOption(category, [...currentOptions, option]);
    }
  };

  const removeUpgradeOption = (category: 'ram' | 'storage' | 'other', option: string) => {
    const currentOptions = specs.upgradeOptions?.[category] || [];
    updateUpgradeOption(category, currentOptions.filter(opt => opt !== option));
  };

  const tabs = [
    { id: 'processor', label: 'Processor', icon: '⚡' },
    { id: 'memory', label: 'Memory', icon: '🧠' },
    { id: 'storage', label: 'Storage', icon: '💾' },
    { id: 'graphics', label: 'Graphics', icon: '🎮' },
    { id: 'display', label: 'Display', icon: '🖥️' },
    { id: 'connectivity', label: 'Connectivity', icon: '🔌' },
    { id: 'other', label: 'Other', icon: '📋' },
    { id: 'upgrades', label: 'Upgrades', icon: '⬆️' }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-600">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-1 px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-3">
        {activeTab === 'processor' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">⚡ Processor Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Processor
                </label>
                <select
                  value={specs.processor || ''}
                  onChange={(e) => updateSpec('processor', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Processor</option>
                  {PROCESSOR_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Generation
                </label>
                <input
                  type="text"
                  value={specs.processorGeneration || ''}
                  onChange={(e) => updateSpec('processorGeneration', e.target.value)}
                  placeholder="e.g., 12th Gen, 11th Gen"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cores
                </label>
                <input
                  type="number"
                  value={specs.processorCores || ''}
                  onChange={(e) => updateSpec('processorCores', parseInt(e.target.value) || undefined)}
                  placeholder="e.g., 4, 6, 8"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Base Speed
                </label>
                <input
                  type="text"
                  value={specs.processorSpeed || ''}
                  onChange={(e) => updateSpec('processorSpeed', e.target.value)}
                  placeholder="e.g., 2.4GHz, 3.2GHz"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">🧠 Memory (RAM) Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  RAM Size
                </label>
                <select
                  value={specs.ram || ''}
                  onChange={(e) => updateSpec('ram', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select RAM Size</option>
                  {RAM_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  RAM Type
                </label>
                <select
                  value={specs.ramType || ''}
                  onChange={(e) => updateSpec('ramType', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select RAM Type</option>
                  {RAM_TYPE_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Maximum RAM
                </label>
                <select
                  value={specs.maxRam || ''}
                  onChange={(e) => updateSpec('maxRam', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Max RAM</option>
                  {RAM_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ramUpgradeable"
                  checked={specs.ramUpgradeable || false}
                  onChange={(e) => updateSpec('ramUpgradeable', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="ramUpgradeable" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  RAM Upgradeable
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'storage' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">💾 Storage Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Primary Storage
                </label>
                <select
                  value={specs.storage || ''}
                  onChange={(e) => updateSpec('storage', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Storage Size</option>
                  {STORAGE_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Storage Type
                </label>
                <select
                  value={specs.storageType || ''}
                  onChange={(e) => updateSpec('storageType', e.target.value as 'SSD' | 'HDD' | 'SSD+HDD')}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Storage Type</option>
                  {STORAGE_TYPE_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Storage
                </label>
                <input
                  type="text"
                  value={specs.additionalStorage || ''}
                  onChange={(e) => updateSpec('additionalStorage', e.target.value)}
                  placeholder="e.g., 1TB HDD, 256GB SSD"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="storageUpgradeable"
                  checked={specs.storageUpgradeable || false}
                  onChange={(e) => updateSpec('storageUpgradeable', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="storageUpgradeable" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Storage Upgradeable
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'graphics' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">🎮 Graphics Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Graphics Card
                </label>
                <select
                  value={specs.graphics || ''}
                  onChange={(e) => updateSpec('graphics', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Graphics Card</option>
                  {GRAPHICS_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Graphics Type
                </label>
                <select
                  value={specs.graphicsType || ''}
                  onChange={(e) => updateSpec('graphicsType', e.target.value as 'Integrated' | 'Dedicated')}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Graphics Type</option>
                  <option value="Integrated">Integrated</option>
                  <option value="Dedicated">Dedicated</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Graphics Memory
                </label>
                <input
                  type="text"
                  value={specs.graphicsMemory || ''}
                  onChange={(e) => updateSpec('graphicsMemory', e.target.value)}
                  placeholder="e.g., 4GB, 8GB, Shared"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'display' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">🖥️ Display Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Display Size
                </label>
                <select
                  value={specs.displaySize || ''}
                  onChange={(e) => updateSpec('displaySize', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Display Size</option>
                  {DISPLAY_SIZE_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Resolution
                </label>
                <select
                  value={specs.displayResolution || ''}
                  onChange={(e) => updateSpec('displayResolution', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Resolution</option>
                  {DISPLAY_RESOLUTION_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Display Type
                </label>
                <input
                  type="text"
                  value={specs.displayType || ''}
                  onChange={(e) => updateSpec('displayType', e.target.value)}
                  placeholder="e.g., IPS, TN, OLED, Retina"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'connectivity' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">🔌 Connectivity Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ports
                </label>
                <input
                  type="text"
                  value={specs.ports?.join(', ') || ''}
                  onChange={(e) => updateSpec('ports', e.target.value.split(',').map(p => p.trim()).filter(p => p))}
                  placeholder="e.g., USB 3.0, HDMI, USB-C, Ethernet"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Wireless Connectivity
                </label>
                <input
                  type="text"
                  value={specs.wireless?.join(', ') || ''}
                  onChange={(e) => updateSpec('wireless', e.target.value.split(',').map(w => w.trim()).filter(w => w))}
                  placeholder="e.g., Wi-Fi 6, Bluetooth 5.0"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'other' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">📋 Other Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Operating System
                </label>
                <select
                  value={specs.operatingSystem || ''}
                  onChange={(e) => updateSpec('operatingSystem', e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select OS</option>
                  {OS_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Battery
                </label>
                <input
                  type="text"
                  value={specs.battery || ''}
                  onChange={(e) => updateSpec('battery', e.target.value)}
                  placeholder="e.g., 3-cell, 4-cell, 6-cell"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  value={specs.weight || ''}
                  onChange={(e) => updateSpec('weight', e.target.value)}
                  placeholder="e.g., 1.5kg, 2.1kg"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  value={specs.color || ''}
                  onChange={(e) => updateSpec('color', e.target.value)}
                  placeholder="e.g., Silver, Black, Space Gray"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upgrades' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">⬆️ Upgrade Options</h3>
            
            {/* RAM Upgrades */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">RAM Upgrade Options</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {RAM_OPTIONS.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addUpgradeOption('ram', option);
                    }}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    + {option}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {specs.upgradeOptions?.ram?.map(option => (
                  <span
                    key={option}
                    className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full flex items-center gap-1"
                  >
                    {option}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeUpgradeOption('ram', option);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Storage Upgrades */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Storage Upgrade Options</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {STORAGE_OPTIONS.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addUpgradeOption('storage', option);
                    }}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    + {option}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {specs.upgradeOptions?.storage?.map(option => (
                  <span
                    key={option}
                    className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full flex items-center gap-1"
                  >
                    {option}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeUpgradeOption('storage', option);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Other Upgrades */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Other Upgrade Options</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {['Graphics Card', 'Display Upgrade', 'Keyboard Backlight', 'Webcam', 'Fingerprint Reader'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addUpgradeOption('other', option);
                    }}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    + {option}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {specs.upgradeOptions?.other?.map(option => (
                  <span
                    key={option}
                    className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full flex items-center gap-1"
                  >
                    {option}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeUpgradeOption('other', option);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
