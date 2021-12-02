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
      return this.state.subscriptions.map((item, index) => {
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
            subscriptions: [...this.state.subscriptions, {id: i, 
                                                          platform: sub, 
                                                          next_amount_due: Math.floor(100 * Math.random()), 
                                                          card_num: "",
                                                          email: "", 
                                                          username: "",
                                                          password: ""}]
          })
        }.bind(this));
      }.bind(this));

      //receive data about platform data

      const onRowSelectionChange = (cur, all, rows) => {
        const res = all.map(item => { return this.state.subscriptions.at(item.index) });
        const selected = res.map(item => {
          return item.password
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
          update: (filterList, filterPos, index) => {
            console.log('customFilterListOnDelete: ', filterList, filterPos, index);

            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, '');
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
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
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>ID Number</FormLabel>
              <FormGroup row>
                <TextField
                  label='min'
                  value={filterList[index][0] || ''}
                  onChange={event => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: '45%', marginRight: '5%' }}
                />
                <TextField
                  label='max'
                  value={filterList[index][1] || ''}
                  onChange={event => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
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
        filter: true,
        filterType: 'checkbox'
      },
      {
        name: 'email',
        filter: true,
        options: {
        filterType: 'textField'
        }
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
          update: (filterList, filterPos, index) => {
            console.log('customFilterListOnDelete: ', filterList, filterPos, index);

            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, '');
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }
            return filterList;
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
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Next Amount Due</FormLabel>
              <FormGroup row>
                <TextField
                  label='min'
                  value={filterList[index][0] || ''}
                  onChange={event => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: '45%', marginRight: '5%' }}
                />
                <TextField
                  label='max'
                  value={filterList[index][1] || ''}
                  onChange={event => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
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