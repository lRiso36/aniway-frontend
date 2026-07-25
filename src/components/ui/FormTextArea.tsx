type TextAreaProps = {
  label: string;
  placeholder?: string;
  value: string;
  limit?: number;
  onChange: (value: string) => void;
};

export const FormTextArea = ({
  label,
  placeholder,
  value,
  limit,
  onChange,
}: TextAreaProps) => {
  return (
    <div className="space-y-1">
      <label className="text-sm sm:text-base text-zinc-400">{label}</label>
      <textarea
        rows={3}
        maxLength={limit}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
                w-full bg-zinc-900 border 
                border-white/10 rounded-xl 
                px-3 sm:px-4 py-2 sm:py-3 
                mt-1 text-white text-sm 
                sm:text-base placeholder-zinc-600 
                focus:outline-none 
                focus:border-purple-500/60 
                transition resize-none"
      />
      {limit && (
        <p className="text-white/20 text-xs text-right">
          {value.length}/{limit}
        </p>
      )}
    </div>
  );
};
