/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { Button, DataTable, TableColumn } from '~/components/elements';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaginationType, defaultPaginationData } from '~/core/types/pagination';
import { useExportContext } from '~/core/provider/export/ExportContextProvider';
import { CustomError } from '~/core/libs';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BookType } from '~/core/types/book';
import { get_books } from '~/api/books';
import { exportBooks } from '~/core/helper/csv/books';
import { checkRoles } from '~/core/utils/check-role';
import { useSelector } from 'react-redux';
import { RootState } from '~/core/types/redux';
import CreateBookModal from './modal/CreateBookModal';
import DeleteBookModal from './modal/DeleteBookModal';
import EditBookModal from './modal/EditBookModal';
import { Helmet } from 'react-helmet-async';

export const BooksPage = () => {
    const location = useLocation();
    const { userData } = useSelector((state: RootState) => state.user);

    const query = location.search;

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const [books, setBooks] = useState<PaginationType<BookType>>(
        defaultPaginationData
    );

    const [keyword, setKeyword] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

    const { setExportData } = useExportContext();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newKeyword = e.target.value;
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        const timeoutId = window.setTimeout(() => {
            setKeyword(newKeyword);
        }, 300);
        setDebounceTimeout(timeoutId);
    };

    const columns: TableColumn<BookType>[] = [
        {
            title: 'Name',
            cell: row => row.name,
        },
        {
            title: 'Author',
            cell: row => row.author,
        },
        {
            title: 'Publisher',
            cell: row => row.publisher,
        },
        {
            title: 'Publication Year',
            cell: row => row.publicationYear,
        },
        {
            title: 'Subject',
            cell: row => row.subject,
        },
        ...(checkRoles(['admin'], userData)
            ? ([
                  {
                      title: 'Actions',
                      cell: row => (
                          <div
                              className="flex gap-3"
                              onClick={() => setSelectedBook(row)}
                          >
                              <TrashIcon
                                  className="w-5 cursor-pointer"
                                  onClick={() => {
                                      setIsDeleteModalOpen(true);
                                  }}
                              />
                              <PencilIcon
                                  className="w-5 cursor-pointer"
                                  onClick={() => {
                                      setIsEditModalOpen(true);
                                  }}
                              />
                          </div>
                      ),
                  },
              ] as TableColumn<BookType>[])
            : []),
    ];

    const handleGetUsers = async () => {
        try {
            setIsLoading(true);
            const data = await get_books(query);
            setBooks(data.payload);
            setExportData(exportBooks(data.payload.items || []));
        } catch (error) {
            if (error instanceof CustomError) toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateQueryParams = () => {
        const searchParams = new URLSearchParams(location.search);
        if (!searchParams.has('page')) searchParams.set('page', '1');
        if (!searchParams.has('limit')) searchParams.set('limit', '10');
        if (keyword) searchParams.set('search', keyword.toString());
        else searchParams.delete('search');
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}?${newSearch}`);
    };

    useEffect(() => {
        updateQueryParams();
    }, [keyword]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('page') && searchParams.has('limit'))
            handleGetUsers();
    }, [query]);

    const addBook = (book: BookType) => {
        setBooks({
            ...books,
            itemCount: books.totalPages + 1,
            totalItems: books.totalItems + 1,
            items: [book, ...books.items],
        });
    };

    const removeBook = (book: BookType) => {
        setBooks({
            ...books,
            items: books.items.filter(item => item.id !== book.id),
        });
    };

    const udpateBook = (book: BookType) => {
        const updatedBooks = books.items.map(item =>
            item.id === book.id ? book : item
        );
        setBooks({
            ...books,
            items: updatedBooks,
        });
    };

    return (
        <>
            <Helmet>
                <title>Dashboard - Books</title>
            </Helmet>
            <div className="h-full w-full">
                <div className="float-right flex flex-wrap justify-between gap-4 whitespace-nowrap py-4">
                    <div className="flex flex-wrap items-center gap-3">
                        {checkRoles(['admin'], userData) && (
                            <Button
                                className="w-[8rem] text-xs"
                                onClick={() => setIsCreateModalOpen(true)}
                            >
                                Create Book
                            </Button>
                        )}
                        <input
                            type="text"
                            className="w-[10rem] rounded border px-3 py-2 text-xs lg:w-[20rem]"
                            placeholder="Search..."
                            defaultValue={keyword}
                            id="search"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={books.items}
                    isLoading={isLoading}
                    currentPage={books.currentPage}
                    totalItems={books.totalItems}
                    totalPages={books.totalPages}
                />
                <CreateBookModal
                    open={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    addBook={addBook}
                />
                <EditBookModal
                    open={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    selectedBook={selectedBook}
                    udpateBook={udpateBook}
                />
                <DeleteBookModal
                    open={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    selectedBook={selectedBook}
                    removeBook={removeBook}
                />
            </div>
        </>
    );
};
