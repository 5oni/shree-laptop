'use client';

import { useState } from 'react';
import { FreeGift } from '@/types';

interface FreeGiftFormProps {
  gifts: FreeGift[];
  onChange: (gifts: FreeGift[]) => void;
}

const GIFT_CATEGORIES = [
  { value: 'bag', label: 'Bag', icon: '🎒' },
  { value: 'keyboard', label: 'Keyboard', icon: '⌨️' },
  { value: 'mouse', label: 'Mouse', icon: '🖱️' },
  { value: 'keyguard', label: 'Keyguard', icon: '🛡️' },
  { value: 'mousepad', label: 'Mouse Pad', icon: '🖱️' },
  { value: 'stand', label: 'Laptop Stand', icon: '📐' },
  { value: 'cleaning', label: 'Cleaning Kit', icon: '🧽' },
  { value: 'airpods', label: 'AirPods', icon: '🎧' },
  { value: 'watch', label: 'Watch', icon: '⌚' },
  { value: 'other', label: 'Other', icon: '🎁' },
];

const PRE_DEFINED_GIFTS: FreeGift[] = [
  { id: '1', name: 'Laptop Bag (Handbag)', category: 'bag', isDefault: true },
  { id: '2', name: 'Laptop Bag (Pitthu)', category: 'bag', isDefault: true },
  { id: '3', name: 'Wireless Keyboard', category: 'keyboard', isDefault: true },
  { id: '4', name: 'Gaming Mouse', category: 'mouse', isDefault: true },
  { id: '5', name: 'Keyboard Cover', category: 'keyguard', isDefault: true },
  { id: '6', name: 'Gaming Mouse Pad', category: 'mousepad', isDefault: true },
  { id: '7', name: 'Adjustable Laptop Stand', category: 'stand', isDefault: true },
  { id: '8', name: 'Screen Cleaning Kit', category: 'cleaning', isDefault: true },
  { id: '9', name: 'AirPods Pro', category: 'airpods', isDefault: true },
  { id: '10', name: 'Smart Watch', category: 'watch', isDefault: true },
];

export default function FreeGiftForm({ gifts, onChange }: FreeGiftFormProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGift, setNewGift] = useState<Partial<FreeGift>>({
    name: '',
    category: 'other',
    description: '',
  });

  const addPreDefinedGift = (gift: FreeGift) => {
    if (!gifts.find(g => g.id === gift.id)) {
      onChange([...gifts, gift]);
    }
  };

  const addCustomGift = () => {
    if (newGift.name && newGift.category) {
      const gift: FreeGift = {
        id: Date.now().toString(),
        name: newGift.name,
        category: newGift.category as FreeGift['category'],
        description: newGift.description,
      };
      onChange([...gifts, gift]);
      setNewGift({ name: '', category: 'other', description: '' });
      setShowAddForm(false);
    }
  };

  const removeGift = (giftId: string) => {
    onChange(gifts.filter(g => g.id !== giftId));
  };

  const toggleGift = (gift: FreeGift) => {
    const isSelected = gifts.find(g => g.id === gift.id);
    if (isSelected) {
      removeGift(gift.id);
    } else {
      addPreDefinedGift(gift);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        🎁 Free Gifts with Laptop
      </h3>
      
      {/* Selected Gifts */}
      {gifts.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
            Selected Gifts ({gifts.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {gifts.map((gift) => (
              <div
                key={gift.id}
                className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
              >
                <span>{GIFT_CATEGORIES.find(c => c.value === gift.category)?.icon}</span>
                <span>{gift.name}</span>
                <button
                  type="button"
                  onClick={() => removeGift(gift.id)}
                  className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pre-defined Gifts */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
          Quick Add
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {PRE_DEFINED_GIFTS.map((gift) => {
            const isSelected = gifts.find(g => g.id === gift.id);
            return (
              <button
                key={gift.id}
                type="button"
                onClick={() => toggleGift(gift)}
                className={`flex items-center gap-2 p-2 rounded text-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <span>{GIFT_CATEGORIES.find(c => c.value === gift.category)?.icon}</span>
                <span className="truncate">{gift.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Gift Form */}
      {!showAddForm ? (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="w-full px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          + Add Custom Gift
        </button>
      ) : (
        <div className="space-y-3 p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gift Name
            </label>
            <input
              type="text"
              value={newGift.name || ''}
              onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter gift name"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={newGift.category || 'other'}
              onChange={(e) => setNewGift({ ...newGift, category: e.target.value as FreeGift['category'] })}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {GIFT_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description (Optional)
            </label>
            <input
              type="text"
              value={newGift.description || ''}
              onChange={(e) => setNewGift({ ...newGift, description: e.target.value })}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter description"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={addCustomGift}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
            >
              Add Gift
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
