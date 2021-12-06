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
import Popup from './popup'

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
      ws.emit('json', {command: "REMOVE",
                       platform: this.state.selectedRow[0]})
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
      const onRowSelectionChange = (cur, all, rows) => {
        const res = all.map(item => { return this.state.subscriptions.at(item.i) });
        const selected = res.map(item => {
          return item.platform
        });
        this.setState({
          selectedRow: selected
        })
          ws.emit('json', {command: 'SHOW',
                           args: 'INFO',
                           data: selected});
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
            if (v[0] && v[1] && this.state.ageFilterChecked) {
              return [`Min ID: ${v[0]}`, `Max ID: ${v[1]}`];
            } else if (v[0] && v[1] && !this.state.ageFilterChecked) {
              return `Min ID: ${v[0]}, Max ID: ${v[1]}`;
            } else if (v[0]) {
              return `Min ID: ${v[0]}`;
            } else if (v[1]) {
              return `Max ID: ${v[1]}`;
            }
            return [];
          },
          update: (lis, filter, i) => {
            console.log('customFilterListOnDelete: ', lis, filter, i);

            if (filter === 0) {
              lis[i].splice(filter, 1, '');
            } else if (filter === 1) {
              lis[i].splice(filter, 1);
            } else if (filter === -1) {
              lis[i] = [];
            }

            return lis;
          },
        },
        filterOptions: {
          names: ['id'],
          logic(id, filters) {
            //fix
            if (filters[0] && filters[1]) {
              return id < filters[0] || id > filters[1];
            } else if (filters[0]) {
              return id < filters[0];
            } else if (filters[1]) {
              return id > filters[1];
            }
            return false;
          },
          display: (lis, onChange, i, c) => (
            <div>
              <FormLabel>ID Number</FormLabel>
              <FormGroup row>
                <TextField
                  label='min'
                  value={lis[i][0] || ''}
                  onChange={event => {
                    lis[i][0] = event.target.value;
                    onChange(lis[i], i, c);
                  }}
                  style={{ width: '45%', marginRight: '5%' }}
                />
                <TextField
                  label='max'
                  value={lis[i][1] || ''}
                  onChange={event => {
                    lis[i][1] = event.target.value;
                    onChange(lis[i], i, c);
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
          update: (lis, filter, i) => {
            if (filter === 0) {
              lis[i].splice(filter, 1, '');
            } else if (filter === 1) {
              lis[i].splice(filter, 1);
            } else if (filter === -1) {
              lis[i] = [];
            }
            return lis;
          },
        },
        filterOptions: {
          names: ['next_amount_due'],
          logic(id, filters) {
            //fix
            if (filters[0] && filters[1]) {
              return id < filters[0] || id > filters[1];
            } else if (filters[0]) {
              return id < filters[0];
            } else if (filters[1]) {
              return id > filters[1];
            }
            return false;
          },
          display: (lis, onChange, i, c) => (
            <div>
              <FormLabel>Next Amount Due</FormLabel>
              <FormGroup row>
                <TextField
                  label='min'
                  value={lis[i][0] || ''}
                  onChange={event => {
                    lis[i][0] = event.target.value;
                    onChange(lis[i], i, c);
                  }}
                  style={{ width: '45%', marginRight: '5%' }}
                />
                <TextField
                  label='max'
                  value={lis[i][1] || ''}
                  onChange={event => {
                    lis[i][1] = event.target.value;
                    onChange(lis[i], i, c);
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
        onRowSelectionChange,
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
          <Popup  
            showModalPopup={this.state.showPopup}  
            onPopupClose={this.isShowPopup}  
        ></Popup> 
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