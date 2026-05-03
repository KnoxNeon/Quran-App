import IconSidebar from './IconSidebar';
import SurahSidebar from './SurahSidebar';
import MainContent from './MainContent';
 
export default function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <IconSidebar />
      <SurahSidebar />
      <MainContent />
    </div>
  );
}