import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Make sure to import Routes and Route
import { Layout, Menu } from 'antd';
import CreateCustomer from './components/CreateCustomer';
import InquireCustomer from './components/InquireCustomer';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/create">Create Customer</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/inquire">Inquire Customer</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path="/create" element={<CreateCustomer />} />
            <Route path="/inquire" element={<InquireCustomer />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
