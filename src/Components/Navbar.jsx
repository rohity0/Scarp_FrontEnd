import { IoIosSearch } from "react-icons/io";
import styles from "../Styles/inputbox.module.css";
import { useState } from "react";
import { fetchData, scrapData } from "../APIs/api";


export const Navbar = ({ setData, currentPage }) => {
    const [scrap, setScrap] = useState("")

    const urlData = async () => {
        let data = scrap;
        setScrap("")
        scrapData({
            urls: [data]
        }).then(() => fetchData(currentPage).then((res) => setData(res.data.data)))
    }


    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.inputBox}>
                    <IoIosSearch className={styles.searchIcon} />
                    <input onChange={(e) =>
                        setScrap(e.target.value)
                    } value={scrap} className={styles.domainInput} type="text" placeholder='Enter domain name' />
                </div>
                <div>
                    <button onClick={urlData} className={styles.searchButton}>
                        Fetch & Save Details
                    </button>
                </div>
            </div>

        </>
    )
}