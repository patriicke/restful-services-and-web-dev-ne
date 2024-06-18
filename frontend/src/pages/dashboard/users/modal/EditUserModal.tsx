import { DialogPanel, DialogTitle } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { Modal } from '~/components/elements';
import { UserType } from '~/core/types';

type DeleteUserModalProps = {
    open: boolean;
    onClose: () => void;
    selectedUser: UserType | null;
};

const DeleteUserModal: FC<DeleteUserModalProps> = props => {
    const { open, onClose, selectedUser } = props;
    return (
        <Modal onClose={onClose} open={open}>
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <UserCircleIcon
                                className="h-6 w-6 text-green-600"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <DialogTitle
                                as="h3"
                                className="text-base font-semibold leading-6 text-gray-900"
                            >
                                Update account
                            </DialogTitle>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to activate{' '}
                                    <span className="font-semibold">
                                        {selectedUser?.firstName}
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
                        className="inline-flex w-full justify-center rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 sm:ml-3 sm:w-auto"
                        onClick={onClose}
                    >
                        Update
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

export default DeleteUserModal;
