import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@material-ui/core';
import ComponentList from './components/ComponentList';
import VehicleList from './components/VehicleList';
import IssueList from './components/IssueList';
import RepairForm from './components/RepairForm';
import InvoiceList from './components/InvoiceList';
import RevenueGraph from './components/RevenueGraph';

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Vehicle Service System
            </Typography>
            <Button color="inherit" component={Link} to="/components">Components</Button>
            <Button color="inherit" component={Link} to="/vehicles">Vehicles</Button>
            <Button color="inherit" component={Link} to="/issues">Issues</Button>
            <Button color="inherit" component={Link} to="/repair">Repair</Button>
            <Button color="inherit" component={Link} to="/invoices">Invoices</Button>
            <Button color="inherit" component={Link} to="/revenue">Revenue</Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route path="/components" element={<ComponentList/>} />
            <Route path="/vehicles" element={<VehicleList/>} />
            <Route path="/issues" element={<IssueList/>} />
            <Route path="/repair" element={<RepairForm/>} />
            <Route path="/invoices" element={<InvoiceList/>} />
            <Route path="/revenue" element={<RevenueGraph/>} />
            <Route exact path="/" render={() => <Typography variant="h4">Welcome to Vehicle Service System</Typography>} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;