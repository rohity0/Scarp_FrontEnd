import styles from "../Styles/home.module.css";
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from "react-router-dom";


export const Cards = ({ company, onCheckboxChange }) => {
    const handleChange = (e) => {
        onCheckboxChange(company._id, e.target.checked);
    };

    return (
        <>
            <div className={styles.tableRow}>
                <div className={styles.cell}><input type="checkbox" onChange={handleChange} /></div>
                <div className={styles.cell}><img className={styles.imageLogo} src={`${company.logo}`} alt="" /></div>
                <div className={styles.cell}>{company.name}</div>
                <div className={`${styles.cell} ${styles.logo}`}>
                    <Link to={company.facebookUrl}><FaFacebook /></Link>
                    <Link to={company.twitterUrl}> <FaTwitter /></Link>
                    <Link to={company.linkedinUrl} ><FaLinkedin /> </Link>
                </div>
                <div className={`${styles.cell} ${styles.descriptionCell}`}><p><Link to={company._id}>{company.description}</Link></p></div>
                <div className={`${styles.cell} ${styles.descriptionCell}`}> <p>{company.address}</p></div>
                <div className={styles.cell}>{company.phoneNumber}</div>
                <div className={styles.cell}>{company.email}</div>
            </div>
        </>
    )
}