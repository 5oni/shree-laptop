'use client';

import { LaptopSpecs } from '@/types';

interface LaptopSpecsDisplayProps {
  specs: LaptopSpecs;
}

export default function LaptopSpecsDisplay({ specs }: LaptopSpecsDisplayProps) {
  if (!specs || Object.keys(specs).length === 0) {
    return null;
  }

  // Helper function to filter and type items properly
  const filterItems = (items: Array<{ label: string; value: string | number | boolean | string[] } | false | undefined | string | number>) => {
    return items.filter((item): item is { label: string; value: string | number | boolean | string[] } => Boolean(item) && typeof item === 'object' && item !== null);
  };

  const renderSpecSection = (title: string, icon: string, items: Array<{ label: string; value: string | number | boolean | string[] }>) => {
    if (items.length === 0) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.label}</span>
              <span className="text-sm text-gray-800 dark:text-white font-medium">
                {Array.isArray(item.value) ? item.value.join(', ') : String(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const processorItems = filterItems([
    specs.processor && { label: 'Processor', value: specs.processor },
    specs.processorGeneration && { label: 'Generation', value: specs.processorGeneration },
    specs.processorCores && { label: 'Cores', value: `${specs.processorCores} cores` },
    specs.processorSpeed && { label: 'Base Speed', value: specs.processorSpeed },
  ]);

  const memoryItems = filterItems([
    specs.ram && { label: 'RAM', value: specs.ram },
    specs.ramType && { label: 'RAM Type', value: specs.ramType },
    specs.maxRam && { label: 'Max RAM', value: specs.maxRam },
    specs.ramUpgradeable !== undefined && { label: 'Upgradeable', value: specs.ramUpgradeable ? 'Yes' : 'No' },
  ]);

  const storageItems = filterItems([
    specs.storage && { label: 'Primary Storage', value: specs.storage },
    specs.storageType && { label: 'Storage Type', value: specs.storageType },
    specs.additionalStorage && { label: 'Additional Storage', value: specs.additionalStorage },
    specs.storageUpgradeable !== undefined && { label: 'Upgradeable', value: specs.storageUpgradeable ? 'Yes' : 'No' },
  ]);

  const graphicsItems = filterItems([
    specs.graphics && { label: 'Graphics Card', value: specs.graphics },
    specs.graphicsType && { label: 'Type', value: specs.graphicsType },
    specs.graphicsMemory && { label: 'Memory', value: specs.graphicsMemory },
  ]);

  const displayItems = filterItems([
    specs.displaySize && { label: 'Size', value: specs.displaySize },
    specs.displayResolution && { label: 'Resolution', value: specs.displayResolution },
    specs.displayType && { label: 'Type', value: specs.displayType },
    specs.displayFeatures && specs.displayFeatures.length > 0 && { label: 'Features', value: specs.displayFeatures },
  ]);

  const connectivityItems = filterItems([
    specs.ports && specs.ports.length > 0 && { label: 'Ports', value: specs.ports },
    specs.wireless && specs.wireless.length > 0 && { label: 'Wireless', value: specs.wireless },
  ]);

  const otherItems = filterItems([
    specs.operatingSystem && { label: 'Operating System', value: specs.operatingSystem },
    specs.battery && { label: 'Battery', value: specs.battery },
    specs.weight && { label: 'Weight', value: specs.weight },
    specs.dimensions && { label: 'Dimensions', value: specs.dimensions },
    specs.color && { label: 'Color', value: specs.color },
  ]);

  const upgradeItems = filterItems([
    specs.upgradeOptions?.ram && specs.upgradeOptions.ram.length > 0 && { label: 'RAM Upgrades', value: specs.upgradeOptions.ram },
    specs.upgradeOptions?.storage && specs.upgradeOptions.storage.length > 0 && { label: 'Storage Upgrades', value: specs.upgradeOptions.storage },
    specs.upgradeOptions?.other && specs.upgradeOptions.other.length > 0 && { label: 'Other Upgrades', value: specs.upgradeOptions.other },
  ]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          📋 Detailed Specifications
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Complete technical specifications and upgrade options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderSpecSection('⚡ Processor', '⚡', processorItems)}
        {renderSpecSection('🧠 Memory', '🧠', memoryItems)}
        {renderSpecSection('💾 Storage', '💾', storageItems)}
        {renderSpecSection('🎮 Graphics', '🎮', graphicsItems)}
        {renderSpecSection('🖥️ Display', '🖥️', displayItems)}
        {renderSpecSection('🔌 Connectivity', '🔌', connectivityItems)}
        {renderSpecSection('📋 Other Details', '📋', otherItems)}
        {renderSpecSection('⬆️ Upgrade Options', '⬆️', upgradeItems)}
      </div>

      {/* Upgrade Options Highlight */}
      {upgradeItems.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-2">
              🔧 Available Upgrades
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              Enhance your laptop&apos;s performance with our upgrade options
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {specs.upgradeOptions?.ram?.map((option, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                  +{option} RAM
                </span>
              ))}
              {specs.upgradeOptions?.storage?.map((option, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                  +{option} Storage
                </span>
              ))}
              {specs.upgradeOptions?.other?.map((option, index) => (
                <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm font-medium">
                  {option}
                </span>
              ))}
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-3">
              💬 Contact us for upgrade pricing and installation
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
