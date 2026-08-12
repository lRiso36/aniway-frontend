import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type FormInputProps = {
  label: string;
  required?: boolean;
  error?: string | null;
  type?: string;
  placeholder?: string;
  limit?: number;
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
};

export const FormInput = ({
  label,
  required,
  error,
  type,
  placeholder,
  value,
  limit,
  onChange,
  onEnter,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="space-y-1">
      <label className="text-sm sm:text-base text-zinc-400">
        {label} {required && <span className="text-purple-500">*</span>}
      </label>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          placeholder={placeholder}
          className="
                    w-full bg-zinc-900 border 
                    border-white/10 rounded-xl 
                    px-3 sm:px-4 py-2 sm:py-3 
                    mt-1 text-white text-sm 
                    sm:text-base placeholder-zinc-600 
                    focus:outline-none 
                    focus:border-purple-500/60 
                    transition"
          value={value}
          maxLength={limit}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              onEnter?.();
            }
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
                        absolute right-3 
                        sm:right-5 
                        top-3.5 sm:top-4.5 
                        text-white/30 
                        hover:text-white/60 
                        transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
