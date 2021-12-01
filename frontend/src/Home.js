import React, {Component} from "react";
import MUIDataTable from "mui-datatables"
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
class HomePage extends Component {
    constructor() {
      super();
      this.state = {
       subscriptions: [
         { id: 1, name: 'test_subscription' }
       ],
       columns: ['id', 'name']
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
  
    render() {
      let theme = createTheme()
      theme = responsiveFontSizes(theme);
      return (
        <div>
          <ThemeProvider theme={theme}>
          <MUIDataTable
            title={"Subscriptions"}
            data={this.state.subscriptions}
            columns={this.state.columns}
          />
          </ThemeProvider>
        </div>
      )
    }
  }
  
  export default HomePage;