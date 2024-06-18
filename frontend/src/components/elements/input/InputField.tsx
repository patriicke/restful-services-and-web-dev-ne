import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
    FieldWrapperPassThroughProps,
    FieldWrapper,
} from '~/components/elements';

type InputFieldProps = FieldWrapperPassThroughProps & {
    type?: 'text' | 'number' | 'email' | 'password' | 'date';
    placeholder?: string;
    className?: string;
    registration?: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
    const {
        type = 'text',
        label,
        icon,
        placeholder = '',
        error,
        registration,
        isLoading,
        className = '',
    } = props;

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    return (
        <FieldWrapper
            label={label}
            icon={icon}
            error={error}
            isLoading={isLoading}
        >
            <span
                className={
                    'relative flex w-full flex-row items-center justify-center'
                }
            >
                <input
                    type={
                        type === 'password'
                            ? passwordVisible
                                ? 'text'
                                : 'password'
                            : type
                    }
                    autoComplete="off"
                    placeholder={placeholder}
                    disabled={isLoading}
                    className={clsx(
                        'md:text-md block w-full appearance-none rounded-md border-0 px-3 text-sm font-medium text-black placeholder-gray-500 focus:outline-none focus:ring-0',
                        icon ? 'px-0' : 'pl-3',
                        type === 'date' && 'uppercase',
                        className
                    )}
                    {...registration}
                />
                <div className="absolute right-3">
                    {type === 'password' &&
                        (passwordVisible ? (
                            <EyeIcon
                                className="icon-md cursor-pointer text-gray-600"
                                onClick={() => setPasswordVisible(false)}
                            />
                        ) : (
                            <EyeSlashIcon
                                className="icon-md cursor-pointer text-gray-600"
                                onClick={() => setPasswordVisible(true)}
                            />
                        ))}
                </div>
            </span>
        </FieldWrapper>
    );
};
