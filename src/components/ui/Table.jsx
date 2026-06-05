import React from 'react';

export const Table = ({ children, className = '' }) => (
  <div className={`w-full overflow-auto ${className}`}>
    <table className="w-full text-sm text-left">{children}</table>
  </div>
);

export const TableHeader = ({ children, className = '' }) => (
  <thead className={`text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/10 border-b border-border/50 ${className}`}>
    {children}
  </thead>
);

export const TableBody = ({ children, className = '' }) => (
  <tbody className={`divide-y divide-border/50 ${className}`}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className = '' }) => (
  <tr className={`hover:bg-muted/30 transition-colors group ${className}`}>
    {children}
  </tr>
);

export const TableHead = ({ children, className = '' }) => (
  <th className={`px-6 py-4 ${className}`}>{children}</th>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-4 ${className}`}>{children}</td>
);
