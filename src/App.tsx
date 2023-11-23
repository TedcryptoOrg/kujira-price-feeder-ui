import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Box, Container, ThemeProvider} from '@mui/material';
import UploadToml from './components/UploadToml';
import MainForm from "./components/configuration_form/MainForm";
import theme from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Analytics } from '@vercel/analytics/react';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <Container style={{ marginTop: '2rem', flexGrow: 1 }}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<UploadToml />} />
                            <Route path="/form" element={<MainForm />} />
                        </Routes>
                    </Router>
                </Container>
                <Footer />
            </Box>
            <Analytics />
        </ThemeProvider>
    );
};

export default App;
