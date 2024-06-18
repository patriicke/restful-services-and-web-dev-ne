import React, { KeyboardEvent } from 'react';

interface TextBoxProps {
    className?: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    value: string;
    onSubmit: () => void;
}

export const MessageInputField = (props: TextBoxProps) => {
    const { value, setValue, className, onSubmit } = props;

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLTextAreaElement;
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.shiftKey && event.key === 'Enter') {
            event.preventDefault();
            event.currentTarget.value += '\n';
        } else if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit();
        }
    };

    return (
        <textarea
            className={`no-scrollbar right-0 max-h-full resize-none border-none p-2 text-sm text-white text-opacity-80 focus:outline-none focus:ring-0 ${className}`}
            value={value}
            placeholder="Enter a message"
            onInput={handleInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};
