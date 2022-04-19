import { Note } from './Note';

export interface Subscriber {
  name: string;
  description: string;
  currentPassword?: string;
  id: string;
  suspended: boolean;
  owner: string;
  notes: Note[];
}

export interface EditingSubscriber {
  name?: string;
  description?: string;
  currentPassword?: string;
  id?: string;
  suspended?: boolean;
  owner?: string;
  notes?: Note[];
}

export const defaultSubscriber = {
  name: '',
  description: '',
  id: '',
  suspended: false,
  owner: '',
  notes: [],
};
