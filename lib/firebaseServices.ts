// src/lib/firebaseServices.ts
import {
  collection, addDoc, getDocs, query, where,
  orderBy, doc, updateDoc, deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';

// 支出データの型定義
export interface Expense {
  id?: string;
  month: string;
  category: string;
  amount: number;
  description?: string;
  date?: string;
}

// 収入データの型定義
export interface Income {
  id?: string;
  month: string;
  category: string;
  amount: number;
  description?: string;
}

// 月次資産データの型定義
export interface MonthlyAsset {
  id?: string;
  month: string;
  total_amount: number;
}

// 資産配分データの型定義
export interface AssetAllocation {
  id?: string;
  month: string;
  category: string;
  amount: number;
  percentage: number;
}

// カテゴリの型定義
export interface Category {
  id?: string;
  type: 'income' | 'expense' | 'asset';
  name: string;
  description?: string;
}

// === 支出データ操作 ===
export const fetchExpenses = async (month?: string): Promise<Expense[]> => {
  let q = collection(db, 'expenses');

  if (month) {
    q = query(q, where('month', '==', month), orderBy('date', 'desc'));
  } else {
    q = query(q, orderBy('month', 'desc'), orderBy('date', 'desc'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Expense));
};

export const addExpense = async (expense: Expense): Promise<string> => {
  const docRef = await addDoc(collection(db, 'expenses'), expense);
  return docRef.id;
};

export const updateExpense = async (id: string, expense: Partial<Expense>): Promise<void> => {
  const docRef = doc(db, 'expenses', id);
  await updateDoc(docRef, expense);
};

export const deleteExpense = async (id: string): Promise<void> => {
  const docRef = doc(db, 'expenses', id);
  await deleteDoc(docRef);
};

// === 収入データ操作 ===
export const fetchIncomes = async (month?: string): Promise<Income[]> => {
  let q = collection(db, 'incomes');

  if (month) {
    q = query(q, where('month', '==', month));
  } else {
    q = query(q, orderBy('month', 'desc'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Income));
};

export const addIncome = async (income: Income): Promise<string> => {
  const docRef = await addDoc(collection(db, 'incomes'), income);
  return docRef.id;
};

// === 月次資産データ操作 ===
export const fetchMonthlyAssets = async (): Promise<MonthlyAsset[]> => {
  const q = query(collection(db, 'monthly_assets'), orderBy('month', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as MonthlyAsset));
};

export const addMonthlyAsset = async (asset: MonthlyAsset): Promise<string> => {
  const docRef = await addDoc(collection(db, 'monthly_assets'), asset);
  return docRef.id;
};

// === 資産配分データ操作 ===
export const fetchAssetAllocations = async (month: string): Promise<AssetAllocation[]> => {
  const q = query(collection(db, 'asset_allocations'), where('month', '==', month));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as AssetAllocation));
};

export const addAssetAllocation = async (allocation: AssetAllocation): Promise<string> => {
  const docRef = await addDoc(collection(db, 'asset_allocations'), allocation);
  return docRef.id;
};

// === カテゴリデータ操作 ===
export const fetchCategories = async (type?: 'income' | 'expense' | 'asset'): Promise<Category[]> => {
  let q = collection(db, 'categories');

  if (type) {
    q = query(q, where('type', '==', type));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Category));
};

export const addCategory = async (category: Category): Promise<string> => {
  const docRef = await addDoc(collection(db, 'categories'), category);
  return docRef.id;
};