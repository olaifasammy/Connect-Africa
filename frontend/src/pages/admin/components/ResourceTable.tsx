import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Inbox,
  LoaderCircle,
} from 'lucide-react';
import type { ReactNode } from 'react';

export interface ResourceColumn<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface ResourceTableProps<T extends { id: string }> {
  columns: ResourceColumn<T>[];
  rows: T[];
  loading?: boolean;
  emptyMessage?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  getRowHref?: (row: T) => string;
  getRowKey?: (row: T) => string;
  onRowClick?: (row: T) => void;
  rowActions?: (row: T) => ReactNode;
  className?: string;
}

export function ResourceTable<T extends { id: string }>({
  columns,
  rows,
  loading = false,
  emptyMessage = 'No resources found',
  emptyTitle,
  emptyDescription = 'There are no records to display.',
  page = 1,
  pageSize = 25,
  total = rows.length,
  onPageChange,
  sortKey,
  sortDirection,
  onSort,
  getRowHref,
  getRowKey,
  onRowClick,
  rowActions,
  className = '',
}: ResourceTableProps<T>) {
  const resolvedEmptyMessage = emptyTitle ?? emptyMessage;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrevious = page > 1;
  const canNext = page < totalPages;

  const visibleStart =
    total === 0 ? 0 : (page - 1) * pageSize + 1;

  const visibleEnd =
    total === 0
      ? 0
      : Math.min(page * pageSize, total);

  return (
    <div
      className={[
        'ca-surface overflow-hidden rounded-2xl',
        className,
      ].join(' ')}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.015]">
              {columns.map((column) => {
                const active = sortKey === column.key;

                return (
                  <th
                    key={column.key}
                    scope="col"
                    className={[
                      'px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-cloud/30',
                      column.className ?? '',
                    ].join(' ')}
                  >
                    {column.sortable && onSort ? (
                      <button
                        type="button"
                        onClick={() => onSort(column.key)}
                        className="inline-flex items-center gap-1.5 transition hover:text-cloud/60"
                      >
                        {column.label}

                        {active ? (
                          <ChevronDown
                            size={12}
                            className={
                              sortDirection === 'desc'
                                ? 'rotate-180 transition-transform'
                                : 'transition-transform'
                            }
                          />
                        ) : (
                          <ChevronsUpDown size={12} />
                        )}
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}

              {rowActions && (
                <th
                  scope="col"
                  className="w-12 px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.13em] text-cloud/30"
                >
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.045]">
            {loading ? (
              <tr>
                <td
                  colSpan={
                    columns.length + (rowActions ? 1 : 0)
                  }
                >
                  <div className="flex min-h-48 items-center justify-center">
                    <div className="flex items-center gap-2 text-xs text-cloud/40">
                      <LoaderCircle
                        size={16}
                        className="animate-spin text-sage"
                      />
                      Loading resources…
                    </div>
                  </div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length + (rowActions ? 1 : 0)
                  }
                >
                  <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
                      <Inbox
                        size={18}
                        className="text-cloud/30"
                        strokeWidth={1.6}
                      />
                    </div>

                    <p className="mt-4 text-sm font-medium text-cloud/60">
                      {resolvedEmptyMessage}
                    </p>

                    <p className="mt-1 max-w-sm text-xs leading-5 text-cloud/30">
                      {emptyDescription}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const rowKey = getRowKey ? getRowKey(row) : row.id;
                return (
                <tr
                  key={rowKey}
                  onClick={() => onRowClick?.(row)}
                  className={[
                    'group transition hover:bg-white/[0.018]',
                    onRowClick ? 'cursor-pointer' : '',
                  ].join(' ')}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={[
                        'px-4 py-3.5 text-sm text-cloud/60',
                        column.className ?? '',
                      ].join(' ')}
                    >
                      {column.render
                        ? column.render(row)
                        : String(
                            row[
                              column.key as keyof T
                            ] ?? '—',
                          )}
                    </td>
                  ))}

                  {rowActions && (
                    <td className="px-4 py-3.5 text-right">
                      {rowActions(row)}
                    </td>
                  )}

                  {getRowHref && (
                    <td className="hidden">
                      {getRowHref(row)}
                    </td>
                  )}
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {total > 0 && (
        <div className="flex flex-col gap-3 border-t border-white/[0.05] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-cloud/30">
            Showing{' '}
            <span className="text-cloud/50">
              {visibleStart}–{visibleEnd}
            </span>{' '}
            of{' '}
            <span className="text-cloud/50">
              {total}
            </span>
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous page"
              disabled={!canPrevious}
              onClick={() =>
                onPageChange?.(Math.max(1, page - 1))
              }
              className="rounded-lg border border-white/[0.06] p-1.5 text-cloud/40 transition hover:bg-white/[0.04] hover:text-cloud disabled:cursor-not-allowed disabled:opacity-25"
            >
              <ChevronLeft size={14} />
            </button>

            <span className="px-2 text-[11px] text-cloud/35">
              {page} / {totalPages}
            </span>

            <button
              type="button"
              aria-label="Next page"
              disabled={!canNext}
              onClick={() =>
                onPageChange?.(
                  Math.min(totalPages, page + 1),
                )
              }
              className="rounded-lg border border-white/[0.06] p-1.5 text-cloud/40 transition hover:bg-white/[0.04] hover:text-cloud disabled:cursor-not-allowed disabled:opacity-25"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceTable;
