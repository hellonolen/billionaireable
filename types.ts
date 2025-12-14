import { ReactNode } from "react";

export interface Metric {
  label: string;
  value: string | number;
  change?: number; // percentage
  trend?: 'up' | 'down' | 'neutral';
  subtext?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number; // For comparison or secondary series
}

export interface CardData {
  id: string;
  title: string;
  type: 'chart' | 'list' | 'stats' | 'feed' | 'progress' | 'curriculum';
  previewMetrics: Metric[];
  chartData?: ChartDataPoint[];
  listItems?: any[];
  description: string;
  colorTheme?: 'orange' | 'green' | 'blue' | 'yellow' | 'white'; // Architectural colors
}

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface MarketAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  category: string;
}

export interface ContentItem {
  id: string;
  title: string;
  guest: string;
  duration: string;
  category: string;
  thumbnailColor: string;
  locked?: boolean;
}

// Curriculum Types
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
}

export interface Topic {
  id: string;
  title: string;
  lessons: Lesson[]; // 7 lessons
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  topics: Topic[]; // 5 areas/topics
}

export interface CurriculumArea {
  id: string;
  title: string;
  description: string;
  trainings: TrainingModule[]; // 3 trainings
  colorTheme: 'orange' | 'green' | 'blue' | 'yellow' | 'white';
}
