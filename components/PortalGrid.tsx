
import React from 'react';
import { Session } from '@supabase/supabase-js';
import PortalItem from './PortalItem';
import { 
    NotebookIcon, CloudIcon, SparkleIcon, DocumentIcon, UsersIcon, FormIcon
} from './icons/Icons';

type Page = 'grid' | 'documents' | 'admin';

interface PortalGridProps {
    session: Session;
    openProblemStatementModal: () => void;
    onNavigate: (page: Page) => void;
}

interface PortalItemType {
    id: number;
    title: string;
    icon: React.ReactNode;
    action?: { type: 'link'; href: string } | { type: 'modal' } | { type: 'navigate'; page: Page };
}

const PortalGrid: React.FC<PortalGridProps> = ({ session, openProblemStatementModal, onNavigate }) => {
    
    const baseItems: PortalItemType[] = [
        { 
          id: 9, 
          title: 'Notebook LLM Đổi mới sáng tạo', 
          icon: <NotebookIcon />,
          action: { type: 'link', href: 'https://colab.research.google.com/' }
        },
        { 
          id: 10, 
          title: 'ChatGPTs tra cứu thông tin', 
          icon: <CloudIcon />,
          action: { type: 'link', href: 'https://chat.openai.com/' }
        },
        { 
          id: 11, 
          title: 'Problem/Statement', 
          icon: <SparkleIcon />,
          action: { type: 'modal' }
        },
        { 
          id: 12, 
          title: 'Tài liệu học tập', 
          icon: <DocumentIcon />,
          action: { type: 'navigate', page: 'documents' }
        },
        {
          id: 14,
          title: 'Khảo sát ý kiến Youth',
          icon: <FormIcon />,
          action: { type: 'link', href: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DHmf9DHYokaJjSeQKotJDwN2J9SELfpCiqjKgiobkEZURTQyWEk3S0VJMTBBT0hXTzBIUE9TRU5FUS4u' }
        }
    ];

    const isSuperAdmin = session.user.email === 'vpi.sonnt@pvn.vn';

    if (isSuperAdmin) {
        baseItems.push({
            id: 13,
            title: 'Quản lý Admin',
            icon: <UsersIcon />,
            action: { type: 'navigate', page: 'admin' }
        });
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {baseItems.map(item => (
                <PortalItem 
                    key={item.id} 
                    title={item.title} 
                    icon={item.icon}
                    action={item.action}
                    openProblemStatementModal={openProblemStatementModal}
                    onNavigate={onNavigate}
                />
            ))}
        </div>
    );
};

export default PortalGrid;