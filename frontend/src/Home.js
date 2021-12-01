import React, {Component } from "react";
import MUIDataTable from "mui-datatables"
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Box from "@mui/material/Box"
import Button from '@mui/material/Button';
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
         { id: 1, name: 'test_subscription' }
       ],
       columns: ['name'],
       info: "Click on a subscription for more data"
      };
    }

    renderData() {
      return this.state.subscriptions.map((item, index) => {
        const { id, name } = item;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
          </tr>
        )
      })
    }

    isShowPopup = (status) => {
      this.setState({ showPopup: status });  
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
            subscriptions: [...this.state.subscriptions, {id: i, name: sub}]
          })
        }.bind(this));
      }.bind(this));

      //receive data about platform data

      const onRowSelectionChange = (cur, all, rows) => {
        const res = all.map(item => { return this.state.subscriptions.at(item.index) });
        const selected = res.map(item => {
          return item.name
        });
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
      const options = {
        selectableRows: 'single',
        selectableRowsHideCheckboxes: true,
        expandableRowsOnClick: true,
        selectableRowsOnClick: true,
        onRowSelectionChange
      }
      return (
        <><div>
          <ThemeProvider theme={theme}>
            <Stack spacing={36} direction="row">
              <Button variant="contained" onClick={() => {this.isShowPopup(true)}}>Insert</Button>
              <Button variant="contained">Delete</Button>
            </Stack>
            <MUIDataTable 
              title={"Subscriptions"}
              data={this.state.subscriptions}
              columns={this.state.columns}
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