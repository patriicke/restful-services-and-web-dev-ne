import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
    FieldWrapperPassThroughProps,
    FieldWrapper,
} from '~/components/elements';

type OptionType = {
    value: string;
    label: string;
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
    placeholder?: string;
    options: OptionType[];
    className?: string;
    registration?: Partial<UseFormRegisterReturn>;
};

export const SelectField = (props: SelectFieldProps) => {
    const {
        label,
        icon,
        placeholder = '',
        options,
        error,
        registration,
        isLoading = false,
        className = '',
    } = props;

    return (
        <FieldWrapper
            label={label}
            icon={icon}
            error={error}
            isLoading={isLoading}
        >
            <select
                defaultValue=""
                disabled={isLoading}
                className={clsx(
                    'placeholder-gray-500 block w-full appearance-none rounded-md border-0 bg-slate-100 px-3 text-base font-medium capitalize text-dark focus:outline-none focus:ring-0',
                    icon ? 'px-0' : 'pl-3',
                    className
                )}
                {...registration}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}

                {options.map((option, key) => (
                    <option key={key} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </FieldWrapper>
    );
};
