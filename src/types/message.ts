export interface MessageCreateParams {
  id: bigint;
  name: string;
  organization: string;
  email: string;
  comment: string;
  createdAt: Date;
}
