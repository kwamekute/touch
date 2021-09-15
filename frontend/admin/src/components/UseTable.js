import { useState } from 'react';
import {
  makeStyles,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  Table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default
    },
    '& tbody td': {
      fontWeight: '300'
    },
    '& tbody tr:hover': {
      backgroundColor: theme.palette.background.default
    }
  }
}));

export default function UseTable(records, headCells, filterfn) {
  const classes = useStyles();
  const pages = [25, 35, 40];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Table sorting logic
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order == 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > b[orderBy]) {
      return 1;
    }

    return 0;
  }

  const recordsAfterSorting = () => {
    return stableSort(
      filterfn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };
  //Table Sorting logic END

  const TblContainer = (props) => (
    <TableContainer style={{ width: 1355 }}>
      <Table className={classes.Table}>{props.children}</Table>
    </TableContainer>
  );

  const TblHead = (props) => {
    const handleSortRequest = (headCellId) => {
      const isAsc = orderBy === headCellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(headCellId);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => {
                    handleSortRequest(headCell.id);
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const TblPagination = () => (
    <TablePagination
      rowsPerPageOptions={pages}
      component="div"
      count={records.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    ></TablePagination>
  );

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterSorting
  };
}
