export interface ModuleConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon?: string;
  enabled: boolean;
  pagesPerDay: number; // How many pages each day uses
  renderPage: (
    doc: any, // jsPDF instance
    pageNumber: number,
    dayNumber: number,
    quote: string
  ) => Promise<number>; // Returns next page number
}

export interface JournalConfig {
  modules: ModuleConfig[];
  duration: number; // days
  northStar: string;
}

export interface FormState {
  selectedModules: string[]; // Array of module IDs
  duration: 7 | 14 | 21 | 30;
  northStar: string;
}
