import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, ThemeProvider } from '@mui/material';
import UploadToml from './components/UploadToml';
import MainForm from "./components/configuration_form/MainForm";
import theme from "./theme";
import Header from "./components/Header";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Container style={{ marginTop: '2rem' }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<UploadToml />} />
                        <Route path="/form" element={<MainForm />} />
                    </Routes>
                </Router>
            </Container>
        </ThemeProvider>
    );
};

export default App;
