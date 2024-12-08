import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  ChartBarIcon,
  ChartPieIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  DocumentChartBarIcon,
  ShoppingCartIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar';
import MobileHeader from '../components/MobileHeader';
import MobileNavigation from '../components/MobileNavigation';
import ChatBot from '../components/chat/ChatBot';
import Overview from '../components/Overview';
import Analytics from '../components/Analytics';
import Inventory from '../components/Inventory';
import Suppliers from '../components/Suppliers';
import Reports from '../components/Reports';
import Orders from '../components/Orders';
import Settings from '../components/Settings';
import Profile from '../components/Profile';
import News from '../components/news/News';

const navigation = [
  { name: 'Overview', path: '/dashboard', icon: ChartPieIcon },
  { name: 'Analytics', path: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Inventory', path: '/dashboard/inventory', icon: ClipboardDocumentListIcon },
  { name: 'Orders', path: '/dashboard/orders', icon: ShoppingCartIcon },
  { name: 'Suppliers', path: '/dashboard/suppliers', icon: BuildingOfficeIcon },
  { name: 'News', path: '/dashboard/news', icon: NewspaperIcon },
  { name: 'Reports', path: '/dashboard/reports', icon: DocumentChartBarIcon }
];

const bottomNavigation = [
  { name: 'Settings', path: '/dashboard/settings', icon: Cog6ToothIcon },
  { name: 'Profile', path: '/dashboard/profile', icon: UserCircleIcon }
];

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        navigation={navigation} 
        bottomNavigation={bottomNavigation} 
      />

      {/* Mobile Header */}
      <MobileHeader onMenuToggle={() => setMobileMenuOpen(true)} />

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
        bottomNavigation={bottomNavigation}
      />

      {/* Main Content */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/news" element={<News />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
}