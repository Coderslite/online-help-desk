import {
    ApertureIcon,
    CopyIcon,
    LayoutDashboardIcon, LoginIcon, MessageIcon, MoodHappyIcon, ReportIcon, TypographyIcon, UserPlusIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Home' },
    {
        title: 'Dashboard',
        icon: LayoutDashboardIcon,
        to: '/'
    },
    { header: 'ticket' },
    {
        title: 'Ticket',
        icon: ReportIcon,
        to: '/ticket/'
    },
    {
        title: 'Chat',
        icon: MessageIcon,
        to: '/chat'
    },
];

export default sidebarItem;
