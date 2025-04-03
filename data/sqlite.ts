import * as SQLite from 'expo-sqlite';
import { HabitRepository, HabitRecordRepository } from '@/data/repository';
import { Habit, HabitRecord } from '@/data/types';

export const habitSQLiteRepository: HabitRepository = {
  getAll: async (db: SQLite.SQLiteDatabase): Promise<Habit[]> => {
    const statement = await db.prepareAsync('SELECT * FROM habits ORDER BY created_at DESC');
    try {
      const result = await statement.executeAsync<Habit>([]);
      return await result.getAllAsync();
    } catch (error) {
      console.error('获取所有习惯失败:', error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  },
  getById: async (db: SQLite.SQLiteDatabase, id: number): Promise<Habit | null> => {
    const statement = await db.prepareAsync('SELECT * FROM habits WHERE id = ?');
    try {
      const result = await statement.executeAsync<Habit>([id]);
      return await result.getFirstAsync();
    } catch (error) {
      console.error(`获取习惯 #${id} 失败:`, error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  },
  create: async (db: SQLite.SQLiteDatabase, habit: Omit<Habit, 'id' | 'created_at'>): Promise<number> => {
    try {
      const result = await db.runAsync('INSERT INTO habits (name, description) VALUES (?, ?)', [habit.name, habit.description]);
      return result.lastInsertRowId;
    } catch (error) {
      console.error('创建习惯失败:', error);
      throw error;
    }
  },
  update: async (db: SQLite.SQLiteDatabase, habit: Omit<Habit, 'created_at'>): Promise<void> => {
    try {
      await db.runAsync('UPDATE habits SET name = ?, description = ? WHERE id = ?', [habit.name, habit.description, habit.id]);
    } catch (error) {
      console.error(`更新习惯 #${habit.id} 失败:`, error);
      throw error;
    }
  },
  delete: async (db: SQLite.SQLiteDatabase, id: number): Promise<void> => {
    try {
      await db.runAsync('DELETE FROM habits WHERE id = ?', [id]);
    } catch (error) {
      console.error(`删除习惯 #${id} 失败:`, error);
      throw error;
    }
  }
}


export const habitRecordSQLiteRepository: HabitRecordRepository = {
  getByHabitId: async (db: SQLite.SQLiteDatabase, habitId: number): Promise<HabitRecord[]> => {
    const statement = await db.prepareAsync('SELECT * FROM habit_records WHERE habit_id = ? ORDER BY record_date DESC');
    try {
      const result = await statement.executeAsync<HabitRecord>([habitId]);
      return await result.getAllAsync();
    } catch (error) {
      console.error(`获取习惯 #${habitId} 的打卡记录失败:`, error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  },
  getByDateRange: async (db: SQLite.SQLiteDatabase, habitId: number, startDate: string, endDate: string): Promise<HabitRecord[]> => {
    const statement = await db.prepareAsync(
      'SELECT * FROM habit_records WHERE habit_id = ? AND record_date BETWEEN ? AND ? ORDER BY record_date DESC'
    );
    try {
      const result = await statement.executeAsync<HabitRecord>([habitId, startDate, endDate]);
      return await result.getAllAsync();
    } catch (error) {
      console.error(`获取习惯 #${habitId} 在 ${startDate} 至 ${endDate} 期间的打卡记录失败:`, error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  },
  checkRecordExists: async (db: SQLite.SQLiteDatabase, habitId: number, date: string): Promise<boolean> => {
    const statement = await db.prepareAsync(
      'SELECT COUNT(*) as count FROM habit_records WHERE habit_id = ? AND date(record_date) = date(?)'
    );
    try {
      const result = await statement.executeAsync<{ count: number }>([habitId, date]);
      const record = await result.getFirstAsync();
      const exists = record ? record.count > 0 : false;
      return exists;
    } catch (error) {
      console.error(`检查习惯 #${habitId} 在 ${date} 的打卡记录失败:`, error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  },
  getCompletedHabitsByDate: async (db: SQLite.SQLiteDatabase, date: string): Promise<Habit[]> => {
    try {
      // 使用单一SQL查询获取所有在该日期有打卡记录的习惯
      const sql = `
        SELECT h.* FROM habits h
        INNER JOIN habit_records hr ON h.id = hr.habit_id
        WHERE date(hr.record_date) = date(?)
        GROUP BY h.id
        ORDER BY h.created_at DESC
      `;

      return await db.getAllAsync<Habit>(sql, [date]);
    } catch (error) {
      console.error(`获取 ${date} 的已完成习惯失败:`, error);
      throw error;
    }
  },
  create: async (db: SQLite.SQLiteDatabase, record: Omit<HabitRecord, 'id' | 'created_at'>): Promise<number> => {
    try {
      const formattedDate = record.record_date;
      const result = await db.runAsync(
        'INSERT INTO habit_records (habit_id, record_date) VALUES (?, date(?))',
        [record.habit_id, formattedDate]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error(`创建习惯 #${record.habit_id} 在 ${record.record_date} 的打卡记录失败:`, error);
      throw error;
    }
  },
  delete: async (db: SQLite.SQLiteDatabase, id: number): Promise<void> => {
    try {
      await db.runAsync('DELETE FROM habit_records WHERE id = ?', [id]);
    } catch (error) {
      console.error(`删除打卡记录 #${id} 失败:`, error);
      throw error;
    }
  }
}
