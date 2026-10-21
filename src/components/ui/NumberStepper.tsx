import { useState, useEffect } from 'react';
import { FieldBox } from './LogFieldBox';
import { X } from 'lucide-react';

const MIN = 0;

type NumberStepperProps = {
  value?: number;
  onChange: (value: number) => void;
  max: number;
  step?: number;
  decimalPlaces?: number;
  allowEmpty?: boolean;
  onClear?: () => void;
};

export const NumberStepper = ({
  value,
  onChange,
  max,
  step = 1,
  decimalPlaces,
  allowEmpty = false,
  onClear,
}: NumberStepperProps) => {
  const [text, setText] = useState(value?.toString() ?? '');

  useEffect(() => {
    setText((current) =>
      value !== undefined && parseFloat(current) === value
        ? current
        : (value?.toString() ?? '')
    );
  }, [value]);

  const clamp = (v: number) => Math.min(Math.max(v, MIN), max);

  const roundValue = (v: number, places = decimalPlaces) => {
    if (places === undefined) return v;
    const factor = 10 ** places;
    return Math.round((v + Number.EPSILON * Math.abs(v)) * factor) / factor;
  };

  const handleTextChange = (raw: string) => {
    setText(raw);

    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      onChange(decimalPlaces === undefined ? clamp(parsed) : parsed);
    }
  };

  const handleBlur = () => {
    if (text.trim() === '' && allowEmpty) {
      onClear?.();
      setText('');
      return;
    }
    const parsed = parseFloat(text);
    const finalValue = isNaN(parsed) ? MIN : roundValue(clamp(parsed));
    onChange(finalValue);
    setText(finalValue.toString());
  };

  return (
    <FieldBox className="relative flex items-center">
      <input
        type="text"
        inputMode="decimal"
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        onBlur={handleBlur}
        className="bg-transparent text-white text-sm rounded-lg pl-3 pr-6 py-2 w-full outline-none"
      />
      {allowEmpty && text !== '' && (
        <button
          aria-label="Clear date"
          className="mr-8 w-4 h-4 rounded-full bg-zinc-700/80 hover:bg-purple-600/30 flex items-center justify-center text-white shrink-0 transition-colors"
          onClick={onClear}
        >
          <X className="w-2.5 h-2.5" />
        </button>
      )}
      <div className="absolute right-1 top-1 bottom-1 flex flex-col w-5">
        <button
          type="button"
          aria-label="Increase"
          onClick={() =>
            onChange(
              clamp(roundValue((value ?? MIN) + step, decimalPlaces ?? 2))
            )
          }
          className="flex-1 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M6 15l6-6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Decrease"
          onClick={() =>
            onChange(
              clamp(roundValue((value ?? MIN) - step, decimalPlaces ?? 2))
            )
          }
          className="flex-1 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </FieldBox>
  );
};
