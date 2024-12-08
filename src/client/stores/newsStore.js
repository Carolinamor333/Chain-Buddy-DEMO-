import { create } from 'zustand';

// Mock data - replace with actual API calls in production
const mockNews = [
  {
    id: 1,
    title: 'Global Shipping Delays Expected',
    summary: 'Major ports experiencing congestion due to increased holiday season demand',
    category: 'disruptions',
    impact: 'high',
    date: '2023-12-01',
    alternatives: [
      { supplier: 'Supplier A', location: 'Vietnam', leadTime: '15 days' },
      { supplier: 'Supplier B', location: 'Mexico', leadTime: '7 days' }
    ]
  },
  {
    id: 2,
    title: 'New Sustainable Supply Chain Initiative',
    summary: 'Industry leaders commit to reducing carbon footprint in logistics',
    category: 'market',
    impact: 'medium',
    date: '2023-12-02'
  }
];

const mockDisruptions = [
  {
    id: 1,
    description: 'Port congestion in Los Angeles causing 5-day delays',
    impact: 'high',
    alternatives: [
      { route: 'Via Seattle', additionalTime: '2 days', additionalCost: '+15%' },
      { route: 'Air freight', additionalTime: '0 days', additionalCost: '+150%' }
    ]
  }
];

export const useNewsStore = create((set) => ({
  news: [],
  disruptions: [],
  loading: false,
  error: null,

  fetchNews: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ 
        news: mockNews,
        disruptions: mockDisruptions,
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to fetch news', loading: false });
    }
  },

  addNews: (newsItem) => set((state) => ({
    news: [newsItem, ...state.news]
  })),

  addDisruption: (disruption) => set((state) => ({
    disruptions: [disruption, ...state.disruptions]
  }))
}));