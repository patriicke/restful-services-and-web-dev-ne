/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { DialogPanel, DialogTitle } from '@headlessui/react';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { Form, InputField, Modal, Spinner } from '~/components/elements';
import { BookType, CreateBookRequestPayload } from '~/core/types/book';
import { z } from 'zod';
import { create_book } from '~/api/books';
import { toast } from 'react-toastify';
import { CustomError } from '~/core/libs';

type CreateBookModalProps = {
    open: boolean;
    onClose: () => void;
    addBook: (book: BookType) => void;
};

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    author: z.string().min(1, 'Author is required'),
    publisher: z.string().min(1, 'Publisher is required'),
    publicationYear: z.preprocess(
        a => parseInt(z.string().parse(a), 10),
        z
            .number()
            .positive()
            .min(1, 'Publication Year must be greater than 1')
            .max(
                new Date().getFullYear(),
                `Publication Year must be less than or equal to ${new Date().getFullYear()}`
            )
    ),
    subject: z.string().min(1, 'Subject is required'),
});

const CreateBookModal: FC<CreateBookModalProps> = props => {
    const { open, onClose, addBook } = props;
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (payload: CreateBookRequestPayload) => {
        try {
            setIsLoading(true);
            const data = await create_book(payload);
            addBook(data.payload.book);
            toast.success('Book created successfully');
            onClose();
        } catch (error) {
            if (error instanceof CustomError) toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal onClose={onClose} open={open}>
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <Form<CreateBookRequestPayload, typeof schema>
                    schema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ register, formState }) => (
                        <>
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <BookOpenIcon
                                            className="h-6 w-6 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Create Book
                                        </DialogTitle>

                                        <div className="mt-2 flex flex-col gap-2">
                                            <div className="flex items-center justify-center gap-2">
                                                <InputField
                                                    placeholder="Enter Book Name"
                                                    error={
                                                        formState.errors.name
                                                    }
                                                    registration={register(
                                                        'name'
                                                    )}
                                                    className="h-10 text-xs"
                                                    isLoading={isLoading}
                                                    type="text"
                                                />

                                                <InputField
                                                    placeholder="Enter Book Author"
                                                    error={
                                                        formState.errors.author
                                                    }
                                                    registration={register(
                                                        'author'
                                                    )}
                                                    className="h-10 text-xs"
                                                    isLoading={isLoading}
                                                    type="text"
                                                />
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <InputField
                                                    placeholder="Enter Book Publisher"
                                                    error={
                                                        formState.errors
                                                            .publisher
                                                    }
                                                    registration={register(
                                                        'publisher'
                                                    )}
                                                    className="h-10 text-xs"
                                                    isLoading={isLoading}
                                                    type="text"
                                                />

                                                <InputField
                                                    placeholder="Enter Book Publication Year"
                                                    error={
                                                        formState.errors
                                                            .publicationYear
                                                    }
                                                    registration={register(
                                                        'publicationYear'
                                                    )}
                                                    className="h-10 text-xs"
                                                    isLoading={isLoading}
                                                    type="number"
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    placeholder="Enter Subject"
                                                    error={
                                                        formState.errors.subject
                                                    }
                                                    registration={register(
                                                        'subject'
                                                    )}
                                                    className="h-10 text-xs"
                                                    isLoading={isLoading}
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 sm:ml-3 sm:w-auto"
                                >
                                    {isLoading ? (
                                        <Spinner size="sm" />
                                    ) : (
                                        'Create'
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={onClose}
                                    data-autofocus
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </DialogPanel>
        </Modal>
    );
};

export default CreateBookModal;
