import axios from 'axios'
import React, { useState, useEffect } from 'react';
import PageHeader from "./PageHeader";
import BugReportIcon from '@material-ui/icons/BugReport';
import {Paper, makeStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import MaterialTable from 'material-table'
import { Router, Route } from "react-router-dom";
import MoreDetails from './MoreDetails';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(4),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    }
}))

const tableTheme = createMuiTheme({
    overrides: {
        MuiTableRow: {
            root: {
                '&:hover': {
                    backgroundColor: '#fffbf2',
                    cursor: 'pointer',
                },
            },
        },
        MuiTableBody: {
            root: {
                fontWeight: '300'
            },
        }
    },
});

export default function Table() {
    const classes = useStyles();
    console.log('reached');
    const [issues, setIssues] = useState([]);

    const apiURL = "https://api.github.com/repos/walmartlabs/thorax/issues";
    const getWalmartData = async () => {
        try {
            const data = await axios.get(apiURL);
            setIssues(data.data)
        }
        catch (e) {
            console.log(e);
        }
    }

    // dataField targets key value pair in json response
    const columns = [
        { title: "Issue #", field: "number" },
        { title: "Title", field: "title" },
        { title: "State", field: "state" }
    ]

    useEffect(() => {
        getWalmartData();
    }, []);

    console.log(issues);

    return (
        <>
            <PageHeader
                title="Walmart Labs Thorax Issues"
                subTitle="List of issues stemming from the thorax repo"
                icon={<BugReportIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <MuiThemeProvider theme={tableTheme}>
                    <MaterialTable title={"Thorax Issues"}
                                   columns={columns}
                                   data={issues}
                                   options={{
                                       headerStyle: {
                                           fontWeight: '600',
                                           color: '#333996',
                                           backgroundColor: "#3c44b126"
                                       },
                                       rowStyle: {

                                       },
                                       pageSize: 10,
                                       pageSizeOptions: [5, 10, 15],
                                       exportButton: true
                                   }}
                                   components={{
                                       Container: props => <Paper {...props} elevation={0}/>
                                   }}
                                   detailPanel={[
                                       {
                                           tooltip: 'Show More',
                                           render: rowData => {
                                               let idx = issues.indexOf(rowData);
                                               let item = issues[idx]

                                               return (
                                                   <div>
                                                       <img src={item.user['avatar_url']} style={{height: 75, width: 75}} />
                                                       <br/>
                                                       <b>User: </b>{item.user['login']}
                                                       <br/>
                                                       <b>Created: </b>{item['created_at']} | <b>Updated: </b>{item['updated_at']} | <b>Closed At: </b>{item['closed_at']}
                                                       <br/>
                                                       <b>Author Association: </b>{item['author_association']} | <b>Assignee: </b>{item['assignees']}
                                                       <br/>
                                                       <b>Body: </b>{item['body']}
                                                       <br/>
                                                       <a href={'/' + rowData.number}>More Details</a>
                                                       {/*<Router>*/}
                                                       {/*    <Route path='/:number' component={MoreDetails}>Show More</Route>*/}
                                                       {/*</Router>*/}
                                                   </div>
                                               )
                                           }
                                       }
                                   ]}
                                   onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    />
                </MuiThemeProvider>
            </Paper>
        </>
    )
}
