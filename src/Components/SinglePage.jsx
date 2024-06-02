import { useEffect, useState } from 'react';
import styles from '../Styles/companyDetails.module.css';
import { fetchDataById } from '../APIs/api';
import { Link, useParams } from 'react-router-dom';
import { PiInfoLight } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LiaGlobeEuropeSolid } from "react-icons/lia";
import { FaFacebook, FaInstagram, FaCamera , FaTwitter, FaLinkedin } from 'react-icons/fa';

export const WebSitePage = () => {
    let param = useParams()
    const [company, setCompany] = useState({})

    useEffect(() => {
        fetchDataById(param.id)
            .then(res => setCompany(res.data.data))
    }, [param.id])
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <img src={company.logo} alt={`${company.name} logo`} className={styles.logo} />
                    <div>
                        <h1>{company.name}</h1>
                        <p> <PiInfoLight /> Description</p>
                        <div className={styles.headerInfo}>
                            <div>
                                <p className={styles.description}>{company.description}</p>
                            </div>
                            <hr />
                            <div className={styles.contactInfo}>
                                <div className={styles.contactItem}>
                                    <FaPhoneAlt className={styles.contactIcon} />
                                    <p>Phone</p>
                                </div><p>{company.phoneNumber}</p>
                                <div className={styles.contactItem}>
                                    <MdEmail className={styles.contactIcon} />
                                    <p>Email</p>
                                </div>
                                <p>{company.email}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.detailBody}>
                <div>
                    <h4>Company Details</h4>
                    <p>
                        <LiaGlobeEuropeSolid />  Website
                    </p>
                    <p>{company.url}</p>
                    <p> <PiInfoLight /> Description</p>
                    <p className={styles.description}>{company.description}</p>
                    <p> <MdEmail className={styles.contactIcon} /> Email</p>
                    <p>{company.email}</p>
                    <p>Facebook</p>
                    <Link> <FaFacebook /> {company.facebookUrl}</Link>
                    <p>Instagram</p>
                    <Link><FaInstagram /> {company.instagramUrl}</Link>
                    <p>Twitter</p>
                    <Link><FaTwitter /> {company.twitterUrl}</Link>
                    <p>LinkedIn</p>
                    <Link><FaLinkedin /> {company.linkedinUrl}</Link>
                    <p>Address</p>
                    <p>{company.address}</p>


                </div>
                <div>
                    <h4>
                        <FaCamera />  Screenshot of Webpage
                    </h4>

                    <img src={company.screenshotPath ? `http://localhost:9000/image/${company.screenshotPath}` : ''} alt="" />
                </div>
            </div>

        </>
    )
}
