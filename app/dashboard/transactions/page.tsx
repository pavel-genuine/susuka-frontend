'use client';
/* eslint-disable react/display-name */
import React, {
    useState,
    useMemo,
    HTMLAttributes,
    HTMLProps,
    useEffect,
} from 'react';
import Card from '@/components/ui/Card';
import { Icon } from '@iconify/react';
import { Menu } from '@headlessui/react';
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
    Column,
} from 'react-table';
import GlobalFilter from '@/components/partials/table/GlobalFilter';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    Slide,
    TextField,
} from '@mui/material';

import Flatpickr from 'react-flatpickr';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { TransitionProps } from '@mui/material/transitions';
import Dropdown from '@/components/ui/Dropdown';
import { advancedTable, tableData } from '@/constant/table-data';
import { CSVLink } from 'react-csv';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchAllUsersProfile } from '@/redux/features/user/allUsersProfileSlice';
import { IUser } from '@/interfaces';
import { AppDispatch } from '@/store/index';

import Textinput from '@/components/ui/Textinput';
import Select from '@/components/ui/Select';
import DownloadIcon from '@mui/icons-material/Download';
// import { getAllTransactions } from '@/api/api';

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: any) {
    const ref = React.useRef(null!);

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <Checkbox
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    );
}

const actions = [
    {
        name: 'view transaction',
        icon: 'heroicons-outline:eye',
    },

    {
        name: 'delete transaction',
        icon: 'heroicons-outline:trash',
    },
];

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const COLUMNS: Column<IUser>[] = [
    {
        Header: 'Id',
        accessor: 'id',
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },

    {
        Header: 'Name',
        accessor: 'name',
        Cell: (row) => {
            return (
                <div className="inline-flex items-center">
                    <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                        <img
                            src={
                                row?.cell?.value?.profilePicture
                                    ? row?.cell?.value?.profilePicture
                                    : 'https://i.ibb.co/vj0Ctmj/user.png'
                            }
                            alt=""
                            className="object-cover w-full h-full rounded-full"
                        />
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 capitalize w-[100px]">
                        {row?.cell?.value}
                    </p>
                </div>
            );
        },
    },
    {
        Header: 'Email',
        accessor: 'email',
        Cell: (row) => {
            return (
                <p className="normal-case text-center">
                    {row?.cell?.value ? row?.cell?.value : '--'}
                </p>
            );
        },
    },

    {
        Header: (
            <span className="inline-flex items-center lg:mx-[-70px] md:mr-[30px] lg:mr-0 space-x-10 ">
                <span className="text-slate-600 dark:text-slate-300 capitalize w-[100px] text-center">
                    Plan Name
                </span>
                <span className=" text-slate-600 dark:text-slate-300 capitalize w-[100px] text-center">
                    Amount
                </span>
                <span className="text-slate-600 dark:text-slate-300 capitalize w-[100px] text-center">
                    Payment Status
                </span>
                <span className="text-slate-600 dark:text-slate-300 capitalize w-[100px] text-center">
                    Payment Gateway
                </span>
                <span className="text-slate-600 dark:text-slate-300 capitalize w-[100px] text-center">
                    Payment Date
                </span>
            </span>
        ),
        accessor: 'transactions',
        Cell: (row) => {
            return (
                <span>
                    {
                        <span className="inline-flex items-center text-center space-x-10 md:mr-[30px] lg:mr-0  lg:mx-[-70px]">
                            <span className="text-sm text-center text-slate-600  dark:text-slate-300 capitalize w-[100px]">
                                {row?.cell?.value?.length > 0
                                    ? row?.cell?.value[
                                          row?.cell?.value?.length - 1
                                      ]?.subscription?.plan?.name
                                        ? row?.cell?.value[
                                              row?.cell?.value?.length - 1
                                          ]?.subscription?.plan?.name
                                        : '--'
                                    : '--'}
                            </span>

                            <span className="text-sm text-center text-slate-600 dark:text-slate-300 capitalize w-[100px]">
                                {row?.cell?.value?.length > 0
                                    ? row?.cell?.value[
                                          row?.cell?.value?.length - 1
                                      ]?.amount
                                        ? row?.cell?.value[
                                              row?.cell?.value?.length - 1
                                          ]?.amount
                                        : '--'
                                    : '--'}
                            </span>

                            <span className="text-sm  text-center text-slate-600  dark:text-slate-300 capitalize w-[100px]">
                                {row?.cell?.value?.length > 0 ? (
                                    <span
                                        className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1
        rounded-[999px] bg-opacity-25 
        ${
            row?.cell?.value[row?.cell?.value?.length - 1]?.subscription
                ?.status === 'paid'
                ? 'bg-success-500 text-success-500'
                : ''
        } 
        ${
            row?.cell?.value[row?.cell?.value?.length - 1]?.subscription
                ?.status === 'pending'
                ? 'bg-warning-500 text-warning-500'
                : ''
        }
        ${
            row?.cell?.value[row?.cell?.value?.length - 1]?.subscription
                ?.status === 'due'
                ? 'bg-danger-500 text-danger-500'
                : ''
        }
        `}
                                    >
                                        {row?.cell?.value[
                                            row?.cell?.value?.length - 1
                                        ]?.subscription?.status
                                            ? row?.cell?.value[
                                                  row?.cell?.value?.length - 1
                                              ]?.subscription?.status
                                            : '--'}
                                    </span>
                                ) : (
                                    '--'
                                )}
                            </span>

                            <span className="text-sm text-center text-slate-600 dark:text-slate-300 capitalize w-[100px]">
                                {row?.cell?.value?.length > 0
                                    ? row?.cell?.value[
                                          row?.cell?.value?.length - 1
                                      ]?.subscription?.paidBy
                                        ? row?.cell?.value[
                                              row?.cell?.value?.length - 1
                                          ]?.subscription?.paidBy
                                        : '--'
                                    : '--'}
                            </span>

                            <span className="text-sm text-center text-slate-600 dark:text-slate-300 capitalize w-[100px]">
                                {row?.cell?.value?.length > 0
                                    ? row?.cell?.value[
                                          row?.cell?.value?.length - 1
                                      ]?.createdAt
                                        ? new Date(
                                              row?.cell?.value[
                                                  row?.cell?.value?.length - 1
                                              ]?.createdAt
                                          )?.toDateString()
                                        : '--'
                                    : '--'}
                            </span>
                        </span>
                    }{' '}
                </span>
            );
        },
    },

    {
        Header: 'Country',
        accessor: 'country',
        Cell: (row) => {
            return <span>{row?.cell?.value ? row?.cell?.value : '--'}</span>;
        },
    },

    {
        Header: 'Action',
        accessor: 'action',
        Cell: (row) => {
            return (
                <div>
                    <Dropdown
                        classMenuItems="right-0 w-[140px] top-[110%] "
                        label={
                            <span className="text-xl text-center block w-full">
                                <Icon icon="heroicons-outline:dots-vertical" />
                            </span>
                        }
                    >
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {actions.map((item, i) => (
                                <Menu.Item key={i}>
                                    <div
                                        className={`
                
                  ${
                      item.name === 'delete transaction'
                          ? 'bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white'
                          : 'hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                                    >
                                        <span className="text-base">
                                            <Icon icon={item?.icon} />
                                        </span>
                                        <span>{item?.name}</span>
                                    </div>
                                </Menu.Item>
                            ))}
                        </div>
                    </Dropdown>
                </div>
            );
        },
    },
];

const Transactions = () => {
    const [datePicker, setDatePicker] = useState(new Date());
    const [actionApply, setActionApply] = React.useState(1);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setActionApply(event.target.value);
    };

    // console.log(creditAmount,expiredDate);

    const users = useAppSelector((state) => state?.allUserProfile?.users);

    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllUsersProfile());

        // const fetchTransaction = async () => {
        //   const res =  await getAllTransactions;

        //   console.log(res,'trans');
          
        // };

        // fetchTransaction()
    }, []);

    console.log(users, 'users');

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => users, []);

    const tableInstance = useTable(
        {
            columns,
            data: users,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,

        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...getToggleAllRowsSelectedProps()}
                            />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                            />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        setSelectedDate,
        prepareRow,
        state: { selectedRowIds },
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize, selectedDate } = state;

    const csvData = [
        [
            'Id',
            'Name',
            'Email',
            'Subscription Id',
            'Subscription On Date',
            'Subscription Status',
            'Plan Name',
            'Words Credit',
            'Frequency',
            'Next Payment Date',
            'Paid By',
        ],
        ...users.map(
            ({ id, name, email, subscriptionId, createdAt, subscription }) => [
                id,
                name,
                email,
                subscriptionId,
                createdAt,
                subscription[0]?.status,
                subscription[0]?.plan?.name,
                subscription[0]?.plan?.wordCredit,
                subscription[0]?.frequency,
                subscription[0]?.nextPaymentDate,
                subscription[0]?.paidBy,
            ]
        ),
    ];

    // console.log(Object.keys(selectedRowIds),'ids');

    return (
        <>
            <div className="md:flex justify-between items-center  mb-6">
                <div className="w-10"></div>
                {Object.keys(selectedRowIds).length ? (
                    <div className="md:flex justify-between items-center space-x-10 ">
                        <Button
                            className={'normal-case'}
                            size="medium"
                            style={{ backgroundColor: 'red' }}
                            startIcon={<DeleteIcon></DeleteIcon>}
                            variant="contained"
                        >
                            {' '}
                            Delete
                        </Button>
                        <Button
                            className={'normal-case'}
                            size="medium"
                            style={{ backgroundColor: 'green' }}
                            startIcon={<AddIcon></AddIcon>}
                            variant="contained"
                        >
                            {' '}
                            Add User
                        </Button>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <Card noborder>
                <div className="md:flex justify-between items-center mb-6">
                    <div className="md:flex  items-center md:space-x-10">
                        <h4 className="card-title">Transaction List</h4>

                        <Select
                            icon="heroicons:chevron-down"
                            className="w-[200px]"
                            defaultValue={1}
                            options={[
                                { value: 1, label: 'Delete Transaction' },
                                { value: 2, label: 'Warning' },
                            ]}
                            onChange={handleChange}
                        ></Select>

                        <Button
                            className={'normal-case'}
                            size="medium"
                            style={{ backgroundColor: 'black' }}
                            // startIcon={<EmailIcon></EmailIcon>}
                            variant="contained"
                        >
                            Apply
                        </Button>

                        <CSVLink filename="subscriberslist.csv" data={csvData}>
                            <Button
                                className={'normal-case'}
                                size="medium"
                                style={{ backgroundColor: 'navy' }}
                                startIcon={<DownloadIcon></DownloadIcon>}
                                variant="contained"
                            >
                                CSV
                            </Button>
                        </CSVLink>
                    </div>

                    <div className="md:flex justify-between items-center space-x-5">
                        <GlobalFilter
                            selectedDate={datePicker}
                            filter={globalFilter}
                            setFilter={setGlobalFilter}
                        />

                        <div>
                            <Flatpickr
                                value={datePicker}
                                id="disabled-picker"
                                className="form-control px-3 py-2"
                                onChange={(date) => {
                                    setDatePicker(date);
                                }}
                                options={{
                                    dateFormat: 'd-m-Y',
                                    disable: [
                                        {
                                            from: new Date(),
                                            // eslint-disable-next-line no-mixed-operators
                                            to: new Date(
                                                new Date().getTime() +
                                                    120 * 60 * 60 * 1000
                                            ),
                                        },
                                    ],
                                }}
                            />
                        </div>

                        <Button
                            className="normal-case"
                            variant="outlined"
                            size="medium"
                            startIcon={<FilterAltIcon></FilterAltIcon>}
                        >
                            {' '}
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps}
                            >
                                <thead className=" border-t border-slate-100 dark:border-slate-800">
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <th
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                    >
                                                        {column.render(
                                                            'Header'
                                                        )}
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? ' 🔽'
                                                                : ' 🔼'
                                                            : ''}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                                    {...getTableBodyProps}
                                >
                                    {page.map((row) => {
                                        prepareRow(row);
                                        const { key, ...restRowProps } =
                                            row.getRowProps();

                                        return (
                                            <tr key={key} {...restRowProps}>
                                                {row.cells.map((cell) => {
                                                    const {
                                                        key,
                                                        ...restCellProps
                                                    } = cell.getCellProps();
                                                    return (
                                                        <td
                                                            key={key}
                                                            {...restCellProps}
                                                            className="table-td text-center"
                                                        >
                                                            {cell.render(
                                                                'Cell'
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <span className=" flex space-x-2  rtl:space-x-reverse items-center">
                            <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                                Go
                            </span>
                            <span>
                                <input
                                    type="number"
                                    className=" form-control py-2"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const pageNumber = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
                                        gotoPage(pageNumber);
                                    }}
                                    style={{ width: '50px' }}
                                />
                            </span>
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Page{' '}
                            <span>
                                {pageIndex + 1} of {pageOptions.length}
                            </span>
                        </span>
                    </div>
                    <ul className="flex items-center  space-x-3  rtl:space-x-reverse flex-wrap">
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${
                                    !canPreviousPage
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <Icon icon="heroicons-outline:chevron-left" />
                            </button>
                        </li>
                        {pageOptions.map((page, pageIdx) => (
                            <li key={pageIdx}>
                                <button
                                    aria-current="page"
                                    className={` ${
                                        pageIdx === pageIndex
                                            ? 'bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium '
                                            : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  '
                                    }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                    onClick={() => gotoPage(pageIdx)}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${
                                    !canNextPage
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <Icon icon="heroicons-outline:chevron-right" />
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="mt-5">
                    <p>
                        Selected Rows:{' '}
                        {Object.keys(selectedRowIds).map(
                            (row) => row && <span>{Number(row) + 1}, </span>
                        )}
                    </p>
                    <p>
                        Selected Rows Quantity :{' '}
                        {Object.keys(selectedRowIds).length}
                    </p>
                </div>
            </Card>
        </>
    );
};

export default Transactions;
