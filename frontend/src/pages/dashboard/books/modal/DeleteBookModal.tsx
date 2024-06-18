/* eslint-disable no-unused-vars */
import { DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { delete_book } from '~/api/books';
import { Modal, Spinner } from '~/components/elements';
import { CustomError } from '~/core/libs';
import { BookType } from '~/core/types/book';

type DeleteBookModalProps = {
    open: boolean;
    onClose: () => void;
    selectedBook: BookType | null;
    removeBook: (book: BookType) => void;
};

const DeleteBookModal: FC<DeleteBookModalProps> = props => {
    const { open, onClose, selectedBook, removeBook } = props;
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteBook = async () => {
        try {
            setIsLoading(true);
            if (!selectedBook?.id) {
                toast.error('Book ID not found');
                return;
            }
            await delete_book(selectedBook?.id);
            removeBook(selectedBook);
            onClose();
        } catch (error: any) {
            if (error instanceof CustomError) toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Modal onClose={onClose} open={open}>
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon
                                className="h-6 w-6 text-red-600"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <DialogTitle
                                as="h3"
                                className="text-base font-semibold leading-6 text-gray-900"
                            >
                                Delete book
                            </DialogTitle>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete{' '}
                                    <span className="font-semibold">
                                        {selectedBook?.name}
                                    </span>
                                    ?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleDeleteBook}
                    >
                        {isLoading ? <Spinner size="sm" /> : 'Delete'}
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
            </DialogPanel>
        </Modal>
    );
};

export default DeleteBookModal;
