import React from 'react';
import styles from './Table.module.css';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  keyField?: keyof T;
}

export function Table<T extends { id: number | string }>({
  columns,
  data,
  onRowClick,
  keyField = 'id' as keyof T,
}: TableProps<T>) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={String(item[keyField])}
              onClick={() => onRowClick?.(item)}
              className={onRowClick ? styles.clickable : ''}
            >
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render
                    ? col.render(item)
                    : String(item[col.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className={styles.empty}>데이터가 없습니다</div>
      )}
    </div>
  );
}
