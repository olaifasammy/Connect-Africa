export interface SendNotificationRequestDto {
  recipientId: string;
  templateId: string;
  channel: string;
}

export interface NotificationResponseDto {
  id: string;
  status: string;
}
