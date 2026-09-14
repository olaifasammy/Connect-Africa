export interface SendNotificationRequestDto {
  recipientId: string;
  type: string;
  title: string;
  content: string;
  channel: string;
  targetUrl?: string | null;
  templateId?: string | null;
}

export interface NotificationResponseDto {
  id: string;
  recipientId: string;
  type: string;
  title: string;
  content: string;
  targetUrl: string | null;
  channel: string;
  status: string;
  isRead: boolean;
  createdAt: string;
  templateId: string | null;
}

export interface NotificationInboxResponseDto {
  notifications: NotificationResponseDto[];
  unreadCount: number;
}

export interface NotificationUnreadCountResponseDto {
  unreadCount: number;
}

export interface MarkAllAsReadResponseDto {
  updatedCount: number;
}
