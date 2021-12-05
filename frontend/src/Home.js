import React, {Component } from "react";
import MUIDataTable from "mui-datatables"
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Box from "@mui/material/Box"
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import ws from "./socketConfig"
import ModalPopup from './popup'

class HomePage extends Component {
    constructor(props) {
      super();
      //on open, send message to show everything
      ws.emit("json", {command: "SHOW",
                      args: "None"});

      this.state = {
        showPopup: false,
       subscriptions: [
         { id: 1,
           platform: 'test_subscription', 
            next_amount_due: 0,
            card_num: "",
            email: "",
            username: "",
            password: "" }
       ],
       info: "Click on platform for more data",
       selectedRow: "N/A"
      };
    }

    renderData() {
      return this.state.subscriptions.map((item, i) => {
        const { id, platform } = item;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{platform}</td>
          </tr>
        )
      })  
    }

    isShowPopup = (status) => {
      this.setState({ showPopup: status });  
    }
    
    remove() {
      ws.emit('json', {command: "REMOVE" })
    }
  
    render() {


      ws.on('message', function(message) {
        //whenever a message is received, clear all
        this.setState({
          subscriptions: []
        })

        let subs = message['subscriptions'];
        subs.forEach(function(sub, i) {
          this.setState({
            subscriptions: [...this.state.subscriptions, {id: sub[0], 
                                                          platform: sub[1], 
                                                          next_amount_due: sub[2],
                                                          billing_freq: sub[3],
                                                          card_num: sub[4],
                                                          email: sub[5], 
                                                          username: sub[6],
                                                          password: sub[7]}]
          })
        }.bind(this));
      }.bind(this));

      //receive data about platform data

      const onRowClick = (rowData, rowMeta) => {
        console.log(rowData, rowMeta)
        this.setState({
          selectedRow: rowData
        });
          ws.emit('json', {command: 'SHOW',
                           args: 'INFO',
                           data: "None"});
          ws.on('platform_data', function(data) {
            this.setState({
                info: data
            });
          }.bind(this));
      }

      //setup n stuff
      let theme = createTheme()
      theme = responsiveFontSizes(theme);

      const columns = [{
        name: 'id',
        options: {
        filterType: 'custom',
        customFilterListOptions: {
          render: v => {
            if (v[0] && v[1]) {
              return [`Min ID: ${v[0]}`, `Max ID: ${v[1]}`];
            } else if (v[0] && v[1]) {
              return `Min ID: ${v[0]}, Max ID: ${v[1]}`;
            } else if (v[0]) {
              return `Min ID: ${v[0]}`;
            } else if (v[1]) {
              return `Max ID: ${v[1]}`;
            }
            return [];
          },
          update: (filterList, pos, i) => {
            console.log('customFilterListOnDelete: ', filterList, pos, i);

            if (pos === 0) {
              filterList[i].splice(pos, 1, '');
            } else if (pos === 1) {
              filterList[i].splice(pos, 1);
            } else if (pos === -1) {
              filterList[i] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          names: ['id'],
          logic(id, f) {
            //fix
            if (f[0] && f[1]) {
              return id < f[0] || id > f[1];
            } else if (f[0]) {
              return id < f[0];
            } else if (f[1]) {
              return id > f[1];
            }
            return false;
          },
          display: (filterList, onChange, i, c) => (
            <div>
              <FormLabel>ID Number</FormLabel>
              <FormGroup row>
                <TextField
                  label='min'
                  value={filterList[i][0] || ''}
                  onChange={event => {
                    filterList[i][0] = event.target.value;
                    onChange(filterList[i], i, c);
                  }}
                  style={{ width: '45%', marginRight: '5%' }}
                />
                <TextField
                  label='max'
                  value={filterList[i][1] || ''}
                  onChange={event => {
                    filterList[i][1] = event.target.value;
                    onChange(filterList[i], i, c);
                  }}
                  style={{ width: '45%' }}
                />
              </FormGroup>
            </div>
          ),
        },
        print: false
        }
      },
      {
        name: 'platform',
        filter: true
      },
      {
        name: 'next_amount_due',
        filter: true,
        options: {
        filterType: 'custom',
        customFilterListOptions: {
          render: v => {
            if (v[0] && v[1]) {
              return [`Min ID: ${v[0]}`, `Max ID: ${v[1]}`];
            } else if (v[0] && v[1]) {
              return `Min ID: ${v[0]}, Max ID: ${v[1]}`;
            } else if (v[0]) {
              return `Min ID: ${v[0]}`;
            } else if (v[1]) {
              return `Max ID: ${v[1]}`;
            }
            return [];
          },
          update: (list, pos, i) => {

            if (pos === 0) {
              list[i].splice(pos, 1, '');
            } else if (pos === 1) {
              list[i].splice(pos, 1);
            } else if (pos === -1) {
              list[i] = [];
            }
            return list;
          },
        },
        filterOptions: {
          names: ['next_amount_due'],
          logic(id, f) {
            //fix
            if (f[0] && f[1]) {
              return id < f[0] || id > f[1];
            } else if (f[0]) {
              return id < f[0];
            } else if (f[1]) {
              return id > f[1];
            }
            return false;
          },
          display: (filterList, onChange, i, c) => (
            <div>
              <FormLabel>Next Amount Due</FormLabel>
              <FormGroup row>
                <TextField
                  label='min'
                  value={filterList[i][0] || ''}
                  onChange={event => {
                    filterList[i][0] = event.target.value;
                    onChange(filterList[i], i, c);
                  }}
                  style={{ width: '45%', marginRight: '5%' }}
                />
                <TextField
                  label='max'
                  value={filterList[i][1] || ''}
                  onChange={event => {
                    filterList[i][1] = event.target.value;
                    onChange(filterList[i], i, c);
                  }}
                  style={{ width: '45%' }}
                />
              </FormGroup>
            </div>
          ),
        }
        },
        print: false
      },
      {
        name: 'billing_freq'
      },
      {
        name: "card_num",
        filter: true,
        options: {
          filterType: "textField"
        }
      },
      {
        name: "email",
        filter: true,
        options: {
          filterType: "textField"
        }
      },
      {
        name: "username",
        filter: true,
        options: {
          filterType: "textField"
        }
      },
      {
        name: "password",
        filter: true,
        options: {
          filterType: "textField"
        }
      }
    ]

      const options = {
        selectableRows: 'single',
        selectableRowsHideCheckboxes: true,
        expandableRowsOnClick: true,
        selectableRowsOnClick: true,
        selectToolbarPlacement: 'none',
        onRowsDelete: function() { return false },
        onRowClick,
      }
      return (
        <><div>
          <ThemeProvider theme={theme}>
            <Stack spacing={36} direction="row">
              <Button variant="contained" onClick={() => {this.isShowPopup(true)}}>Insert</Button>
              <Button variant="contained" onClick={() => (this.remove())}>Delete</Button>
            </Stack>
            <MUIDataTable 
              title={"Subscriptions"}
              data={this.state.subscriptions}
              columns={columns}
              options={options} />
          </ThemeProvider>
          <ModalPopup  
            showModalPopup={this.state.showPopup}  
            onPopupClose={this.isShowPopup}  
        ></ModalPopup> 
        </div>
        
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          {this.state.info}
          </Box></>
      )
    }
  }
  
  export default HomePage;