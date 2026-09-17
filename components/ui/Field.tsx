import { useId, forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldWrapperProps = {
  label: string;
  error?: string;
  hint?: string;
  id?: string;
  children: (props: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => ReactNode;
};

/** Label + helper/error text scaffolding shared by every input type below. */
function FieldWrapper({ label, error, hint, id: providedId, children }: FieldWrapperProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-body text-label uppercase text-smoke">
        {label}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": Boolean(error) })}
      {hint && !error && (
        <p id={hintId} className="font-body text-sm text-smoke">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="font-body text-sm text-clay">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses =
  "w-full border-b border-smoke bg-transparent py-2 font-body text-body text-bone outline-none transition-colors placeholder:text-smoke focus:border-amber aria-invalid:border-clay";

type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  error?: string;
  hint?: string;
  id?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, hint, id, ...rest },
  ref,
) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} id={id}>
      {(fieldProps) => <input ref={ref} className={inputClasses} {...fieldProps} {...rest} />}
    </FieldWrapper>
  );
});

type TextAreaFieldProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  label: string;
  error?: string;
  hint?: string;
  id?: string;
};

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(function TextAreaField(
  { label, error, hint, id, ...rest },
  ref,
) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} id={id}>
      {(fieldProps) => (
        <textarea ref={ref} rows={4} className={inputClasses} {...fieldProps} {...rest} />
      )}
    </FieldWrapper>
  );
});

type SelectFieldProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
  label: string;
  error?: string;
  hint?: string;
  id?: string;
  options: { value: string; label: string }[];
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, error, hint, id, options, ...rest },
  ref,
) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} id={id}>
      {(fieldProps) => (
        <select ref={ref} className={cn(inputClasses, "appearance-none")} {...fieldProps} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-ink text-bone">
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FieldWrapper>
  );
});
