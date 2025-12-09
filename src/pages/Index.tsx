import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Dashboard from '@/components/Dashboard';
import FileManager from '@/components/FileManager';
import UploadZone from '@/components/UploadZone';

type TabType = 'home' | 'files' | 'upload';

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const navItems = [
    { id: 'home' as TabType, label: 'Главная', icon: 'Home' },
    { id: 'files' as TabType, label: 'Мои файлы', icon: 'FolderOpen' },
    { id: 'upload' as TabType, label: 'Загрузка', icon: 'Upload' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border fixed left-0 top-0">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Database" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-sidebar-foreground">player0101010</h1>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    activeTab === item.id
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon name={item.icon} size={20} className="mr-3" />
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-sidebar-border">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Icon name="Settings" size={20} className="mr-3" />
                  Настройки
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Icon name="HelpCircle" size={20} className="mr-3" />
                  Помощь
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 w-64 p-6 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="User" size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Администратор
                </p>
                <p className="text-xs text-sidebar-foreground/70">admin@company.com</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 ml-64">
          <header className="border-b border-border bg-card">
            <div className="px-8 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {navItems.find(item => item.id === activeTab)?.label}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon">
                  <Icon name="Bell" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Search" size={20} />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-8">
            {activeTab === 'home' && <Dashboard />}
            {activeTab === 'files' && <FileManager />}
            {activeTab === 'upload' && <UploadZone />}
          </div>
        </main>
      </div>
    </div>
  );
}
