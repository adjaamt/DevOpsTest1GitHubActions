'use client';

import { useState, useEffect } from 'react';

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface ListingFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
  onPriceChange: (min: string, max: string) => void;
  onReset: () => void;
}

export default function ListingFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  onSubcategoryChange,
  onPriceChange,
  onReset,
}: ListingFiltersProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const availableSubcategories = currentCategory?.subcategories || [];

  useEffect(() => {
    setSelectedSubcategory('all');
  }, [selectedCategory]);

  const handlePriceChange = (value: string, type: 'min' | 'max') => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (type === 'min') {
      setMinPrice(numericValue);
      onPriceChange(numericValue, maxPrice);
    } else {
      setMaxPrice(numericValue);
      onPriceChange(minPrice, numericValue);
    }
  };

  const adjustPrice = (amount: number, type: 'min' | 'max') => {
    const currentValue = parseInt(type === 'min' ? minPrice : maxPrice) || 0;
    const newValue = Math.max(0, currentValue + amount);
    if (type === 'min') {
      setMinPrice(newValue.toString());
      onPriceChange(newValue.toString(), maxPrice);
    } else {
      setMaxPrice(newValue.toString());
      onPriceChange(minPrice, newValue.toString());
    }
  };

  const handleReset = () => {
    setSelectedSubcategory('all');
    setMinPrice('');
    setMaxPrice('');
    onReset();
  };

  return (
    <div className="card sticky top-24">
      <h2 className="text-xl font-bold text-brand mb-6">Filtres</h2>
      
      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full flex justify-between items-center text-left font-semibold text-brand mb-3"
        >
          <span>Catégorie</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isCategoryOpen && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer py-1">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="form-radio text-accent"
                />
                <span className="text-muted">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Subcategory Filter */}
      {selectedCategory !== 'all' && availableSubcategories.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setIsSubcategoryOpen(!isSubcategoryOpen)}
            className="w-full flex justify-between items-center text-left font-semibold text-brand mb-3"
          >
            <span>Sous-catégorie</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${isSubcategoryOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isSubcategoryOpen && (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {availableSubcategories.map((subcategory) => (
                <label key={subcategory.id} className="flex items-center space-x-2 cursor-pointer py-1">
                  <input
                    type="radio"
                    name="subcategory"
                    value={subcategory.id}
                    checked={selectedSubcategory === subcategory.id}
                    onChange={(e) => {
                      setSelectedSubcategory(e.target.value);
                      onSubcategoryChange(e.target.value);
                    }}
                    className="form-radio text-accent"
                  />
                  <span className="text-muted">{subcategory.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-brand mb-3">Prix</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">Prix minimum</label>
            <div className="flex items-center">
              <button
                onClick={() => adjustPrice(-1000, 'min')}
                className="px-2 py-1 border border-muted rounded-l hover:bg-muted/10"
              >
                -
              </button>
              <input
                type="text"
                value={minPrice}
                onChange={(e) => handlePriceChange(e.target.value, 'min')}
                placeholder="0"
                className="input rounded-none w-full text-center"
              />
              <button
                onClick={() => adjustPrice(1000, 'min')}
                className="px-2 py-1 border border-muted rounded-r hover:bg-muted/10"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">Prix maximum</label>
            <div className="flex items-center">
              <button
                onClick={() => adjustPrice(-1000, 'max')}
                className="px-2 py-1 border border-muted rounded-l hover:bg-muted/10"
              >
                -
              </button>
              <input
                type="text"
                value={maxPrice}
                onChange={(e) => handlePriceChange(e.target.value, 'max')}
                placeholder="Max"
                className="input rounded-none w-full text-center"
              />
              <button
                onClick={() => adjustPrice(1000, 'max')}
                className="px-2 py-1 border border-muted rounded-r hover:bg-muted/10"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={handleReset}
        className="btn-secondary w-full"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
} 