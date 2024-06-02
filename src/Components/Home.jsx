import { Navbar } from "./Navbar"
import styles from "../Styles/home.module.css";
import { ImParagraphLeft } from "react-icons/im";
import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";
import { deleteData, fetchData } from "../APIs/api";
import { Cards } from "./Card"
export const HomePage = () => {
    const [data, setData] = useState([{}])
    const [selectedIds, setSelectedIds] = useState([]);


    useEffect(() => {
        fetchData().then((res) => {
            setData(res.data.data);
        }).catch(err => {
            console.error(err)
        })
    }, [])

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
        fetchData().then((res) => {
            setData(res.data.data);
        })
    }

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'companies.xlsx');
    };

    return (
        <>
            < Navbar setData={setData} />
            <div className={styles.tableBody}>
                <div className={styles.tableHeader}>
                    <p> {selectedIds.length} selected</p>
                    <div>
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

            </div>
        </>
    )
}