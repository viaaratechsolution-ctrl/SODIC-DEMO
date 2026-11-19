export type DemoScreenId =
  | 'home'
  | 'tasks'
  | 'task-details'
  | 'create-task'
  | 'my-task'
  | 'team-chat'
  | 'performance';

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus =
  | 'pending'
  | 'in-progress'
  | 'site-visit'
  | 'completed'
  | 'overdue';

export type MatterCategory =
  | 'reservation'
  | 'handover'
  | 'inspection'
  | 'contracts'
  | 'customer-care';

export type ProjectKey = 'east-town' | 'villette' | 'west-park';
export type ProjectFilter = 'all' | ProjectKey;

export type TaskStatusFilter = 'all' | 'in-progress' | 'completed' | 'pending';
export type PerformancePeriod = 'today' | 'week' | 'month';

export interface DemoEmployee {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  avatar: string;
  initials: string;
}

export interface MatterChecklistStep {
  id: string;
  label: string;
  labelEn?: string;
  done: boolean;
}

export interface MatterDocument {
  id: string;
  name: string;
  nameEn?: string;
  type: 'PDF' | 'DOC';
  size: string;
  statusLabel: string;
  statusLabelEn?: string;
  url?: string;
}

export interface MatterNote {
  id: string;
  text: string;
  textEn?: string;
  timestamp: string;
  timestampEn?: string;
}

export interface UnitInstallment {
  label: string;
  labelEn?: string;
  amountEgp: string;
  amountEgpEn?: string;
  dueDate: string;
  dueDateEn?: string;
  status: 'paid' | 'due' | 'overdue';
  reminderSent?: boolean;
}

export interface InspectionSnag {
  id: string;
  title: string;
  titleEn?: string;
  area: string;
  areaEn?: string;
  resolved: boolean;
}

export interface PropertyUnitMeta {
  compoundName: string;
  compoundNameEn?: string;
  unitType: string;
  unitTypeEn?: string;
  priceEgp: string;
  priceEgpEn?: string;
  statusPill: string;
  statusPillEn?: string;
}

export interface DemoTask {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  category: MatterCategory;
  projectKey: ProjectKey;
  matterRef: string;
  unitCode: string;
  clientName: string;
  clientNameEn?: string;
  compoundName: string;
  compoundNameEn?: string;
  propertyMeta?: PropertyUnitMeta;
  installment?: UnitInstallment;
  snags?: InspectionSnag[];
  assigneeId: string;
  teamMemberIds: string[];
  assignedBy: string;
  assignedByEn?: string;
  createdDate: string;
  createdDateEn?: string;
  deadline: string;
  deadlineEn?: string;
  shortDeadline: string;
  shortDeadlineEn?: string;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  image?: string;
  imageCaption?: string;
  imageCaptionEn?: string;
  stepperStages: [string, string, string, string];
  stepperStagesEn?: [string, string, string, string];
  checklistSteps: MatterChecklistStep[];
  documents: MatterDocument[];
  uploadedPhotos: string[];
  notes: MatterNote[];
  sendClientUpdate: boolean;
  alert24h: boolean;
  submittedAt?: string;
  submittedAtEn?: string;
}

export interface DemoActivity {
  id: string;
  actorName: string;
  actorNameEn?: string;
  actorAvatar: string;
  summary: string;
  summaryEn?: string;
  detail: string;
  detailEn?: string;
  time: string;
  timeEn?: string;
  kind: 'update' | 'created' | 'completed' | 'reminder';
  taskId?: string;
}

export interface DemoMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderNameEn?: string;
  senderRole: string;
  senderRoleEn?: string;
  isLead?: boolean;
  isSelf?: boolean;
  text?: string;
  textEn?: string;
  attachedTaskId?: string;
  time: string;
  timeEn?: string;
  read?: boolean;
}

export interface DemoNotification {
  id: string;
  title: string;
  titleEn?: string;
  time: string;
  timeEn?: string;
  taskId?: string;
  unread: boolean;
}
