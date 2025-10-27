// Fix: Add React import for React.FC type
import React from 'react';
import type { Category } from './types';
import { FoodIcon, TransportIcon, ShoppingIcon, EntertainmentIcon, HealthIcon, UtilitiesIcon, OtherIcon } from './components/Icons';

export const CATEGORIES: { name: Category; icon: React.FC<{className?: string}>; color: string }[] = [
  { name: 'Food', icon: FoodIcon, color: '#34d399' }, // emerald-400
  { name: 'Transport', icon: TransportIcon, color: '#60a5fa' }, // blue-400
  { name: 'Shopping', icon: ShoppingIcon, color: '#f472b6' }, // pink-400
  { name: 'Entertainment', icon: EntertainmentIcon, color: '#c084fc' }, // purple-400
  { name: 'Health', icon: HealthIcon, color: '#fb7185' }, // rose-400
  { name: 'Utilities', icon: UtilitiesIcon, color: '#facc15' }, // yellow-400
  { name: 'Other', icon: OtherIcon, color: '#9ca3af' }, // gray-400
];

export const CATEGORY_MAP = new Map(CATEGORIES.map(c => [c.name, c]));