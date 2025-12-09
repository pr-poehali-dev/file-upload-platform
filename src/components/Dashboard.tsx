import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <div className="flex items-center gap-1">
              <Icon
                name={trendUp ? 'TrendingUp' : 'TrendingDown'}
                size={16}
                className={trendUp ? 'text-green-600' : 'text-red-600'}
              />
              <span className={`text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const stats = [
    {
      title: 'Всего файлов',
      value: '1,247',
      icon: 'Files',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Использовано места',
      value: '24.8 GB',
      icon: 'HardDrive',
      trend: '+2.3 GB',
      trendUp: true,
    },
    {
      title: 'Папок',
      value: '86',
      icon: 'Folder',
      trend: '+5',
      trendUp: true,
    },
    {
      title: 'Общий доступ',
      value: '34',
      icon: 'Share2',
      trend: '-2',
      trendUp: false,
    },
  ];

  const recentFiles = [
    { name: 'Отчет_Q4_2024.pdf', size: '2.4 MB', time: '5 мин назад', type: 'pdf' },
    { name: 'Презентация_продаж.pptx', size: '5.1 MB', time: '1 час назад', type: 'pptx' },
    { name: 'Финансовая_таблица.xlsx', size: '890 KB', time: '3 часа назад', type: 'xlsx' },
    { name: 'Договор_2024.docx', size: '156 KB', time: 'Вчера', type: 'docx' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Добро пожаловать в player0101010</h2>
        <p className="text-muted-foreground">
          Управляйте файлами вашей организации эффективно и безопасно
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Недавние файлы</h3>
          <button className="text-primary hover:underline text-sm font-medium">
            Смотреть все
          </button>
        </div>
        <div className="space-y-4">
          {recentFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0">
                <Icon name="FileText" size={24} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {file.size} • {file.time}
                </p>
              </div>
              <Icon name="MoreVertical" size={20} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Хранилище</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Использовано</span>
                <span className="font-medium">24.8 GB из 100 GB</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div className="bg-primary h-3 rounded-full" style={{ width: '24.8%' }} />
              </div>
            </div>
            <div className="pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm">Документы</span>
                </div>
                <span className="text-sm font-medium">12.4 GB</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm">Медиа</span>
                </div>
                <span className="text-sm font-medium">8.2 GB</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm">Другое</span>
                </div>
                <span className="text-sm font-medium">4.2 GB</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Активность</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Загружено 5 новых файлов</p>
                <p className="text-xs text-muted-foreground">2 минуты назад</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Создана папка "Проект 2024"</p>
                <p className="text-xs text-muted-foreground">1 час назад</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Файл открыт для общего доступа</p>
                <p className="text-xs text-muted-foreground">3 часа назад</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Удалено 12 файлов</p>
                <p className="text-xs text-muted-foreground">Вчера</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
