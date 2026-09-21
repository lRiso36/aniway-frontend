import type { ReactNode } from 'react';

type FieldLabelProps = {
  children: ReactNode;
};

export const FieldLabel = ({ children }: FieldLabelProps) => {
  return (
    <label className="text-white/40 text-xs uppercase tracking-wide block mb-1.5">
      {children}
    </label>
  );
};
