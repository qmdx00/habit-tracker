import * as SQLite from 'expo-sqlite';
import { HabitRepository, HabitRecordRepository } from './repository';
import { Habit, HabitRecord } from './types';


export const habitSQLiteRepository: HabitRepository = {
  db: SQLite.useSQLiteContext(),

  getAll: async (): Promise<Habit[]> => {
    const statement = await habitSQLiteRepository.db.prepareAsync('SELECT * FROM habits ORDER BY created_at DESC');
    try {
      const result = await statement.executeAsync<Habit>([]);
      return await result.getAllAsync();
    } finally {
      await statement.finalizeAsync();
    }
  },
  getById: async (id: number): Promise<Habit | null> => {
    const statement = await habitSQLiteRepository.db.prepareAsync('SELECT * FROM habits WHERE id = ?');
    try {
      const result = await statement.executeAsync<Habit>([id]);
      return await result.getFirstAsync();
    } finally {
      await statement.finalizeAsync();
    }
  },
  create: async (habit: Omit<Habit, 'id' | 'created_at'>): Promise<number> => {
    const result = await habitSQLiteRepository.db.runAsync('INSERT INTO habits (name, description) VALUES (?, ?)', [habit.name, habit.description]);
    return result.lastInsertRowId;
  },
  update: async (habit: Omit<Habit, 'created_at'>): Promise<void> => {
    await habitSQLiteRepository.db.runAsync('UPDATE habits SET name = ?, description = ? WHERE id = ?', [habit.name, habit.description, habit.id]);
  },
  delete: async (id: number): Promise<void> => {
    await habitSQLiteRepository.db.runAsync('DELETE FROM habits WHERE id = ?', [id]);
  }
}


export const habitRecordSQLiteRepository: HabitRecordRepository = {
  db: SQLite.useSQLiteContext(),

  getByHabitId: async (habitId: number): Promise<HabitRecord[]> => {
    const statement = await habitRecordSQLiteRepository.db.prepareAsync('SELECT * FROM habit_records WHERE habit_id = ? ORDER BY record_date DESC');
    try {
      const result = await statement.executeAsync<HabitRecord>([habitId]);
      return await result.getAllAsync();
    } finally {
      await statement.finalizeAsync();
    }
  },
  getByDateRange: async (habitId: number, startDate: string, endDate: string): Promise<HabitRecord[]> => {
    const statement = await habitRecordSQLiteRepository.db.prepareAsync(
      'SELECT * FROM habit_records WHERE habit_id = ? AND record_date BETWEEN ? AND ? ORDER BY record_date DESC'
    );
    try {
      const result = await statement.executeAsync<HabitRecord>([habitId, startDate, endDate]);
      return await result.getAllAsync();
    } finally {
      await statement.finalizeAsync();
    }
  },
  checkRecordExists: async (habitId: number, date: string): Promise<boolean> => {
    const statement = await habitRecordSQLiteRepository.db.prepareAsync(
      'SELECT COUNT(*) as count FROM habit_records WHERE habit_id = ? AND date(record_date) = date(?)'
    );
    try {
      const result = await statement.executeAsync<{ count: number }>([habitId, date]);
      const record = await result.getFirstAsync();
      return record ? record.count > 0 : false;
    } finally {
      await statement.finalizeAsync();
    }
  },
  create: async (record: Omit<HabitRecord, 'id' | 'created_at'>): Promise<number> => {
    const result = await habitRecordSQLiteRepository.db.runAsync('INSERT INTO habit_records (habit_id, record_date) VALUES (?, ?)', [record.habit_id, record.record_date]);
    return result.lastInsertRowId;
  },
  delete: async (id: number): Promise<void> => {
    await habitRecordSQLiteRepository.db.runAsync('DELETE FROM habit_records WHERE id = ?', [id]);
  }
}
