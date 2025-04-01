export interface Habit {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface HabitRecord {
  id: number;
  habit_id: number;
  record_date: string;
  created_at: string;
}
