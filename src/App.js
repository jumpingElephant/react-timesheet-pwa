import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Container from 'react-bootstrap/Container';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import {initializeObjectStoresInIndexedDb} from './utils/indexedDB';
import './App.css';
import ProjectList from "./pages/Projects";

const App = () => {
    console.log('App started');

    useEffect(() => {
        // Initialize tasks in IndexedDB once when the component mounts
        initializeObjectStoresInIndexedDb();
    }, []);

    return (
        <ThemeProvider breakpoints={['xxl', 'xl', 'lg', 'md', 'sm', 'xs']} minBreakpoint="xs">
            <Router>
                <Container fluid className="align-items-center justify-content-center mw-100">
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/projects" element={<ProjectList/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
};

export default App;