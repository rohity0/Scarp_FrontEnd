import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../Components/Home'
import { Navbar } from '../Components/Navbar'
import { WebSitePage } from '../Components/SinglePage'


export const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/:id' element={<>
                    <Navbar />
                    <WebSitePage />
                </>} />
            </Routes>
        </>
    )
}