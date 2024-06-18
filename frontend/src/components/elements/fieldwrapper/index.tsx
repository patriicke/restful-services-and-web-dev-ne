import { ReactNode } from 'react';
import clsx from 'clsx';
import { FieldError } from 'react-hook-form';

type FieldWrapperProps = {
    children: ReactNode;
    label?: string;
    icon?: ReactNode;
    className?: string;
    error?: FieldError | undefined;
    isLoading?: boolean;
};

export type FieldWrapperPassThroughProps = Omit<
    FieldWrapperProps,
    'className' | 'children'
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
    const {
        children,
        label,
        icon,
        error,
        className = '',
        isLoading = false,
    } = props;

    return (
        <div className="block w-full">
            <label>
                {label && (
                    <div className="mb-3 text-base font-semibold text-white">
                        {label}
                    </div>
                )}

                <div
                    className={clsx(
                        'flex items-center rounded-md border text-base font-medium text-white',
                        isLoading ? 'cursor-wait opacity-80' : '',
                        error?.message
                            ? 'border-red-600'
                            : 'border-primary-100',
                        className
                    )}
                >
                    {icon && <div className="px-3">{icon}</div>}

                    <div className="grow">{children}</div>
                </div>
            </label>

            {error?.message && (
                <div
                    role="alert"
                    aria-label={error.message}
                    className="mt-2 text-start text-xs font-semibold text-red-600"
                >
                    {error.message}
                </div>
            )}
        </div>
    );
};
