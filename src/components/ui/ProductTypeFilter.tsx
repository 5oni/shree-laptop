'use client';

interface ProductTypeFilterProps {
  activeType: string;
  onTypeChange: (type: string) => void;
}

export default function ProductTypeFilter({ activeType, onTypeChange }: ProductTypeFilterProps) {
  const types = [
    { id: 'all', label: 'All Products' },
    { id: 'laptop', label: 'Laptops' },
    { id: 'accessory', label: 'Accessories' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 animate-fade-in">
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-500 transform hover:scale-105 ${
              activeType === type.id
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/80'
            }`}
          >
            <div className="flex items-center">
              {type.id === 'all' && (
                <div className={`transition-all duration-500 ${activeType === type.id ? 'text-white animate-pulse-slow' : 'text-primary-500 dark:text-primary-400'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
              )}
              {type.id === 'laptop' && (
                <div className={`transition-all duration-500 ${activeType === type.id ? 'text-white animate-pulse-slow' : 'text-primary-500 dark:text-primary-400'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {type.id === 'accessory' && (
                <div className={`transition-all duration-500 ${activeType === type.id ? 'text-white animate-pulse-slow' : 'text-primary-500 dark:text-primary-400'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              )}
              <span className="font-raleway">{type.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 