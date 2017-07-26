import React, {Component} from 'react';
import ClearFix from './containers/ClearFix';
import PageHeader from './containers/PageHeader'
import PageSideBar from './containers/PageSideBar'
import PageFooter from './containers/PageFooter'
import {renderRoutes} from 'react-router-config'

class App extends Component {
  render() {
    return (
      <div style={{
        backgroundColor: '#205B87'
      }}>
        <PageHeader/>
        <div className="page-container">
          <PageSideBar/> {console.log("Props:", this.props)}
          {renderRoutes(this.props.route.routes)}
          {/*<PageFooter/> */}
        </div>
      </div>
    )
  }
}

export default App;