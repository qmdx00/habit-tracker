import { SQLiteDatabase } from 'expo-sqlite';
import { Habit, HabitRecord } from '@/data/types';

export interface HabitRepository {
  getAll: (db: SQLiteDatabase) => Promise<Habit[]>;
  getById: (db: SQLiteDatabase, id: number) => Promise<Habit | null>;
  create: (db: SQLiteDatabase, habit: Omit<Habit, 'id' | 'created_at'>) => Promise<number>;
  update: (db: SQLiteDatabase, habit: Omit<Habit, 'created_at'>) => Promise<void>;
  delete: (db: SQLiteDatabase, id: number) => Promise<void>;
}

export interface HabitRecordRepository {
  getByHabitId: (db: SQLiteDatabase, habitId: number) => Promise<HabitRecord[]>;
  getByDateRange: (db: SQLiteDatabase, habitId: number, startDate: string, endDate: string) => Promise<HabitRecord[]>;
  checkRecordExists: (db: SQLiteDatabase, habitId: number, date: string) => Promise<boolean>;
  getCompletedHabitsByDate: (db: SQLiteDatabase, date: string) => Promise<Habit[]>;
  create: (db: SQLiteDatabase, record: Omit<HabitRecord, 'id' | 'created_at'>) => Promise<number>;
  delete: (db: SQLiteDatabase, id: number) => Promise<void>;
}
