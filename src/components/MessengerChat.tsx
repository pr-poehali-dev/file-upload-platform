import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  online?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text?: string;
  time: string;
  isOwn: boolean;
  file?: {
    name: string;
    size: string;
    type: string;
    url?: string;
  };
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Иван Петров',
    phone: '+7 905 123-45-67',
    lastMessage: 'Отправил файл презентации',
    lastMessageTime: '10:30',
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    phone: '+7 916 234-56-78',
    lastMessage: 'Спасибо за документы!',
    lastMessageTime: 'Вчера',
    online: false,
  },
  {
    id: '3',
    name: 'Алексей Смирнов',
    phone: '+7 926 345-67-89',
    lastMessage: 'Когда будет готов отчет?',
    lastMessageTime: '15 дек',
    unreadCount: 1,
    online: true,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    text: 'Привет! Можешь поделиться файлом?',
    time: '10:25',
    isOwn: false,
  },
  {
    id: '2',
    senderId: 'me',
    text: 'Конечно, сейчас отправлю',
    time: '10:26',
    isOwn: true,
  },
  {
    id: '3',
    senderId: '1',
    time: '10:28',
    isOwn: false,
    file: {
      name: 'Презентация_Q4.pptx',
      size: '5.2 MB',
      type: 'pptx',
    },
  },
  {
    id: '4',
    senderId: 'me',
    time: '10:30',
    isOwn: true,
    file: {
      name: 'Отчет_финансы.pdf',
      size: '2.1 MB',
      type: 'pdf',
    },
  },
  {
    id: '5',
    senderId: '1',
    text: 'Спасибо, скачал!',
    time: '10:32',
    isOwn: false,
  },
];

export default function MessengerChat() {
  const [contacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [messageText, setMessageText] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: messageText,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !selectedContact) return;

    const file = e.target.files[0];
    const fileMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      file: {
        name: file.name,
        size: formatFileSize(file.size),
        type: file.name.split('.').pop() || 'file',
      },
    };

    setMessages([...messages, fileMessage]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownloadFile = (fileName: string) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileName;
    link.click();
  };

  const getFileIcon = (type: string) => {
    const ext = type.toLowerCase();
    switch (ext) {
      case 'pdf': return 'FileText';
      case 'pptx': case 'ppt': return 'Presentation';
      case 'xlsx': case 'xls': return 'Sheet';
      case 'docx': case 'doc': return 'FileText';
      case 'jpg': case 'png': case 'jpeg': return 'Image';
      case 'zip': case 'rar': return 'Archive';
      default: return 'File';
    }
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
  );

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-4">
      <Card className="w-80 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Сообщения</h3>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowAddContact(!showAddContact)}
            >
              <Icon name="UserPlus" size={20} />
            </Button>
          </div>

          {showAddContact && (
            <div className="mb-4 space-y-2 p-3 bg-secondary rounded-lg">
              <Input
                placeholder="+7 900 000-00-00"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
              <Button className="w-full" size="sm">
                <Icon name="Search" size={16} className="mr-2" />
                Найти пользователя
              </Button>
            </div>
          )}

          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Поиск контактов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedContact?.id === contact.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-secondary'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12 bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {contact.name.charAt(0)}
                      </span>
                    </Avatar>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium truncate">{contact.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {contact.lastMessageTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.lastMessage}
                      </p>
                      {contact.unreadCount && contact.unreadCount > 0 && (
                        <Badge className="ml-2 h-5 min-w-5 rounded-full px-1.5 text-xs">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {selectedContact ? (
        <Card className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 bg-primary/20 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {selectedContact.name.charAt(0)}
                </span>
              </Avatar>
              <div>
                <p className="font-semibold">{selectedContact.name}</p>
                <p className="text-sm text-muted-foreground">{selectedContact.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Icon name="Phone" size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="Video" size={20} />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isOwn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    {message.file ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background/10 border border-background/20">
                          <Icon
                            name={getFileIcon(message.file.type)}
                            size={32}
                            className={message.isOwn ? 'text-primary-foreground' : 'text-primary'}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{message.file.name}</p>
                            <p className={`text-xs ${
                              message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {message.file.size}
                            </p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className={message.isOwn ? 'text-primary-foreground hover:bg-background/20' : ''}
                            onClick={() => handleDownloadFile(message.file!.name)}
                          >
                            <Icon name="Download" size={20} />
                          </Button>
                        </div>
                        <p
                          className={`text-xs ${
                            message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}
                        >
                          {message.time}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <label htmlFor="file-attach">
                <Button variant="outline" size="icon" type="button" onClick={() => document.getElementById('file-attach')?.click()}>
                  <Icon name="Paperclip" size={20} />
                </Button>
              </label>
              <input
                id="file-attach"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Input
                placeholder="Введите сообщение..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Icon name="MessageSquare" size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Выберите контакт для начала общения</p>
          </div>
        </Card>
      )}
    </div>
  );
}