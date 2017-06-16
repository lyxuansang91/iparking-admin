import React, {Component} from 'react';
import ClearFix from './containers/ClearFix';
import PageHeader from './containers/PageHeader';
import PageContainer from './containers/PageContainer';

class App extends Component {
  render() {
    return (
      <div>
        <PageHeader/>
        <ClearFix/>
        <PageContainer/>
      </div>
    )
  }
}

export default App;