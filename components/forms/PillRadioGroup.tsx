import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

export function PillRadioGroup<T extends FieldValues>({
  legend,
  name,
  options,
  register,
  error,
}: {
  legend: string;
  name: Path<T>;
  options: { value: string; label: string }[];
  register: UseFormRegister<T>;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="font-display text-display-3 uppercase">{legend}</legend>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer rounded-full border border-smoke/40 px-4 py-3 text-center font-body text-sm uppercase transition-colors has-checked:border-amber has-checked:bg-amber/10 has-checked:text-amber"
          >
            <input type="radio" value={option.value} className="sr-only" {...register(name)} />
            {option.label}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-3 font-body text-sm text-clay">
          {error}
        </p>
      )}
    </fieldset>
  );
}
