import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Stack, IconButton, LinearProgress, Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
} from '@mui/material';
import { filter } from 'lodash';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserMoreMenu } from '../sections/@dashboard/user';
import Label from '../components/Label';

const TABLE_HEAD = [
    { id: 'FirstName', label: 'First Name', alignRight: false },
    { id: 'MiddleName', label: 'Middle Name', alignRight: false },
    { id: 'LastName', label: 'Last Name', alignRight: false },
    { id: 'PhoneNumber', label: 'Phone Number', alignRight: false },
    { id: 'Email', label: 'Email', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
];


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}



export default function HotelUserList({ userList, showAction, onActionButtonClicked, isLoading }) {

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('FirstName');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    return (<Stack>
        <Card>
            {isLoading ? <LinearProgress /> : <></>}
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <UserListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={userList.length}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const { _id, firstName, middleName, lastName, phoneNumber, email, isDisabled } = row;
                                return (
                                    <TableRow
                                        hover
                                        key={_id}
                                        tabIndex={-1}
                                    >
                                        <TableCell>
                                            {firstName}
                                        </TableCell>
                                        <TableCell align="left">{middleName}</TableCell>
                                        <TableCell align="left">{lastName}</TableCell>
                                        <TableCell align="left">{phoneNumber}</TableCell>
                                        <TableCell align="left">{email}</TableCell>
                                        <TableCell align="left">
                                            <Label variant="ghost" color={(isDisabled === true && 'error') || 'success'}>
                                                {isDisabled === true ? 'Banded' : 'Active'}
                                            </Label>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => {
                                                onActionButtonClicked(_id, isDisabled);
                                            }}>
                                                {showAction === true ? isDisabled === true ? <CheckCircleIcon sx={{ color: 'green' }} fontSize='medium' /> : <DoNotDisturbOnIcon sx={{ color: 'red' }} /> : <></>}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>

                        {isUserNotFound && (
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                        <SearchNotFound searchQuery={filterName} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </Scrollbar>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    </Stack>)
}