import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
}
