import { SQLiteDatabase } from 'expo-sqlite';
import { Habit, HabitRecord } from './types';

export interface HabitRepository {
  readonly db: SQLiteDatabase;

  getAll: () => Promise<Habit[]>;
  getById: (id: number) => Promise<Habit | null>;
  create: (habit: Omit<Habit, 'id' | 'created_at'>) => Promise<number>;
  update: (habit: Omit<Habit, 'created_at'>) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export interface HabitRecordRepository {
  readonly db: SQLiteDatabase;

  getByHabitId: (habitId: number) => Promise<HabitRecord[]>;
  getByDateRange: (habitId: number, startDate: string, endDate: string) => Promise<HabitRecord[]>;
  checkRecordExists: (habitId: number, date: string) => Promise<boolean>;
  create: (record: Omit<HabitRecord, 'id' | 'created_at'>) => Promise<number>;
  delete: (id: number) => Promise<void>;
}
