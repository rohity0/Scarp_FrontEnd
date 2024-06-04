import { Navbar } from "./Navbar"
import styles from "../Styles/home.module.css";
import { ImParagraphLeft } from "react-icons/im";
import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";
import { deleteData, fetchData } from "../APIs/api";
import { Cards } from "./Card"
import Pagination from "./paginations";

export const HomePage = () => {
    const [data, setData] = useState([{}])
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData(currentPage).then((res) => {
            setData(res.data.data);
            setCurrentPage(res.data.meta.page);
            setTotalItems(res.data.meta.total);
        }).catch(err => {
            console.error(err)
        })
    }, [currentPage])

    const handleCheckboxChange = (id, isChecked) => {
        setSelectedIds(prevIds => {
            if (isChecked) {
                return [...prevIds, id];
            } else {
                return prevIds.filter(prevId => prevId !== id);
            }
        });
    };

    const handleDelete = async () => {
        await deleteData({
            deleteId: selectedIds
        })
        setSelectedIds([])
        fetchData(1).then((res) => {
            setData(res.data.data);
        })
    }

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'companies.xlsx');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <>
            < Navbar setData={setData} currentPage={currentPage} />
            <div className={styles.tableBody}>
                <div className={styles.tableHeader}>
                    <p> {selectedIds.length} selected</p>
                    <div className={styles.selectedIds}>
                        <button onClick={handleDelete}>Delete</button>
                        <div className={styles.exportCSV}>
                            <ImParagraphLeft className={styles.exportCSVIcon} />
                            <button onClick={exportToExcel} className={styles.exportCSVButton}>Export as CSV</button>
                        </div>

                    </div>
                </div>
                <div className={styles.tableContainer}>
                    <div className={styles.tableHead}>
                        <div className={styles.cell}><input type="checkbox" /></div>
                        <div className={styles.cell}></div>
                        <div className={styles.cell}>COMPANY</div>
                        <div className={styles.cell}>SOCIAL PROFILES</div>
                        <div className={styles.cell}>DESCRIPTION</div>
                        <div className={styles.cell}>ADDRESS</div>
                        <div className={styles.cell}>PHONE NO</div>
                        <div className={styles.cell}>EMAIL</div>
                    </div>
                    {data?.map(company => (
                        <Cards key={company._id}
                            company={company}
                            onCheckboxChange={handleCheckboxChange} />

                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange} />
            </div>

        </>
    )
}