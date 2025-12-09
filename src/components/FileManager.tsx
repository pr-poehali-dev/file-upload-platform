import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  path: string;
}

const mockFiles: FileItem[] = [
  { id: '1', name: 'Документы', type: 'folder', modified: '2024-12-05', path: '/documents' },
  { id: '2', name: 'Проекты', type: 'folder', modified: '2024-12-08', path: '/projects' },
  { id: '3', name: 'Отчет_Q4.pdf', type: 'file', size: '2.4 MB', modified: '2024-12-09', path: '/report.pdf' },
  { id: '4', name: 'Презентация.pptx', type: 'file', size: '5.1 MB', modified: '2024-12-07', path: '/presentation.pptx' },
  { id: '5', name: 'Таблица_данных.xlsx', type: 'file', size: '890 KB', modified: '2024-12-06', path: '/data.xlsx' },
  { id: '6', name: 'Архив', type: 'folder', modified: '2024-11-28', path: '/archive' },
];

export default function FileManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [files] = useState<FileItem[]>(mockFiles);
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('list');

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') return 'Folder';
    const ext = item.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'FileText';
      case 'pptx': case 'ppt': return 'Presentation';
      case 'xlsx': case 'xls': return 'Sheet';
      case 'docx': case 'doc': return 'FileText';
      case 'jpg': case 'png': case 'jpeg': return 'Image';
      default: return 'File';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск файлов и папок..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedView === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setSelectedView('list')}
          >
            <Icon name="List" size={20} />
          </Button>
          <Button
            variant={selectedView === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setSelectedView('grid')}
          >
            <Icon name="Grid3x3" size={20} />
          </Button>
        </div>
      </div>

      {selectedView === 'list' ? (
        <div className="space-y-2">
          {filteredFiles.map((item) => (
            <Card
              key={item.id}
              className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Icon
                    name={getFileIcon(item)}
                    size={24}
                    className={item.type === 'folder' ? 'text-primary' : 'text-muted-foreground'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.modified}
                    {item.size && ` • ${item.size}`}
                  </p>
                </div>
                <Badge variant={item.type === 'folder' ? 'default' : 'secondary'}>
                  {item.type === 'folder' ? 'Папка' : 'Файл'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFiles.map((item) => (
            <Card
              key={item.id}
              className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <Icon
                  name={getFileIcon(item)}
                  size={48}
                  className={item.type === 'folder' ? 'text-primary' : 'text-muted-foreground'}
                />
                <div className="w-full">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.size || 'Папка'}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Ничего не найдено</p>
        </div>
      )}
    </div>
  );
}
