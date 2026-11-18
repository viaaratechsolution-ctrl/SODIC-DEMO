export type DemoScreenId =
  | 'home'
  | 'tasks'
  | 'task-details'
  | 'create-task'
  | 'my-task'
  | 'team-chat'
  | 'performance';

export interface DemoScreen {
  id: DemoScreenId;
  num: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
}
