import { ReactNode, forwardRef } from 'react';
import clsx from 'clsx';
import { Spinner } from '~/components/elements';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: 'bg-primary-500' | 'bg-secondary-500';
    size?: 'btn-sm' | 'btn-md' | 'btn-lg';
    isLoading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const {
            children,
            type = 'button',
            variant = 'bg-primary-500',
            size = 'btn-md',
            className,
            isLoading = false,
            ...rest
        } = props;

        return (
            <button
                ref={ref}
                type={type}
                disabled={isLoading}
                className={clsx(
                    'btn',
                    'w-full rounded-md border border-primary-500 bg-primary-500 px-5 text-base text-white transition hover:bg-opacity-90',
                    size,
                    variant,
                    className
                )}
                {...rest}
            >
                {type === 'submit' ? (
                    isLoading ? (
                        <Spinner size="sm" variant="light" />
                    ) : (
                        children
                    )
                ) : (
                    children
                )}
            </button>
        );
    }
);
