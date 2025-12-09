import { useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
      status: 'uploading' as const,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      setUploadedFiles(prev =>
        prev.map(f =>
          f.id === fileId
            ? {
                ...f,
                progress,
                status: progress >= 100 ? 'completed' : 'uploading'
              }
            : f
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card
        className={`p-12 border-2 border-dashed transition-all ${
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`p-6 rounded-full ${isDragging ? 'bg-primary/10' : 'bg-secondary'} transition-colors`}>
            <Icon name="Upload" size={48} className={isDragging ? 'text-primary' : 'text-muted-foreground'} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {isDragging ? 'Отпустите файлы здесь' : 'Перетащите файлы сюда'}
            </h3>
            <p className="text-muted-foreground">
              или нажмите кнопку ниже для выбора файлов
            </p>
          </div>
          <label htmlFor="file-upload">
            <Button type="button" size="lg" onClick={() => document.getElementById('file-upload')?.click()}>
              <Icon name="FolderOpen" size={20} className="mr-2" />
              Выбрать файлы
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </Card>

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Загружаемые файлы</h3>
          {uploadedFiles.map((file) => (
            <Card key={file.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Icon
                      name={file.status === 'completed' ? 'CheckCircle2' : 'Loader2'}
                      size={20}
                      className={
                        file.status === 'completed'
                          ? 'text-green-600'
                          : 'text-primary animate-spin'
                      }
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {file.progress}%
                  </span>
                </div>
                <Progress value={file.progress} className="h-2" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
