import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

const useRowStyles = makeStyles(theme => (
    {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        root: {
            flexGrow: 1,
            '& > *': {
                borderBottom: 'unset',
            },
        },
    }
));

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}))

function createData(name) {
    return {
        name,
        medicalRecord: [
            {name: '皮下水', quantity :'100ml' ,remark: '兩個鐘一次', times: ["12:40", "", "", ""]},
            {name: 'Lysine', quantity :'1/4' , times: ["", ""]},
            {name: 'Azodyl', quantity :'1粒', remark: '飯前食飯前食飯前食飯前食飯前食', times: ["12:40", "18:43", "", ""]},
        ],
    };
}

function Row(props) {
    const {row} = props;
    return (
        <React.Fragment>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Box>
                        <Typography variant="h6" gutterBottom component="div">
                            {row.name}
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableBody>
                                {row.medicalRecord.map((medicalRecordRow) => (
                                    <TableRow key={medicalRecordRow.name}>
                                        <TableCell width="160px" component="th" scope="row">
                                            {medicalRecordRow.name}<b>{medicalRecordRow.quantity}</b>
                                            <br/>
                                            {medicalRecordRow.remark}
                                        </TableCell>
                                        {medicalRecordRow.times.map((time) => (
                                            <Button variant="contained">
                                                {time? time: 'no'}
                                            </Button>
                                        ))}
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        medicalRecord: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                quantity: PropTypes.string.isRequired,
                times: PropTypes.arrayOf(PropTypes.string)
            }),
        ).isRequired,
    }).isRequired,
};

const rows = [
    createData('Cat1'),
    createData('Cat2'),
    createData('Mega'),
    createData('Data'),
    createData('Giga'),
    createData('Cat5'),
    createData('Data1'),
    createData('Cat7'),
    createData('Mega2'),
];

function CollapsibleTable() {
    return (
        <Container>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default function Main() {
    const classes = useRowStyles();
    const classes2 = useStyles();
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <form className={classes.container} noValidate>
                        <TextField
                            id="date"
                            label="Date"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </Toolbar>
            </AppBar>
            <div className={classes2.offset}/>
            <CollapsibleTable></CollapsibleTable>
        </React.Fragment>

    );
}