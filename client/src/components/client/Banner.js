import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <>
            <section className='home-section-1'>
                <div className='container-lg'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='left-banner-1 py-3 px-1 position-relative'>
                                <img src='images/main-banner-1.jpg' className='img-fluid rounded-3' />
                                <div className='left-banner-1-text position-absolute'>
                                    <h4 className='fs-6'>SUPPERCHARGED FOR PROS.</h4>
                                    <h3>iPad S13+ Pro</h3>
                                    <p className='mb-3'>From $999.00 or $41.62/m.<br />for 24 mo. Footnote.</p>
                                    <Link className='button'>Buy Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-6 py-2'>
                            <div className='d-flex flex-wrap gap-0 justify-content-between align-items-center '>
                                <div className='right-banner py-2 px-1 position-relative'>
                                    <img src='images/catbanner-01.jpg' className='img-fluid rounded-3' />
                                    <div className='right-banner-1-text position-absolute'>
                                        <h4>Best sales.</h4>
                                        <h3>Laptop Max</h3>
                                        <p>From $999.00 or $41.62/m.<br />for 24 mo. Footnote.</p>
                                        {/* <Link className='button'>Buy Now</Link> */}
                                    </div>
                                </div>
                                <div className='right-banner px-1 position-relative'>
                                    <img src='images/catbanner-03.jpg' className='img-fluid rounded-3' />
                                    <div className='right-banner-1-text position-absolute'>
                                        <h4>New Arrival</h4>
                                        <h3>IPad Air</h3>
                                        <p>From $999.00 or $41.62/m.<br />for 24 mo. Footnote.</p>
                                        {/* <Link className='button'>Buy Now</Link> */}
                                    </div>
                                </div>
                                <div className='right-banner px-1 position-relative'>
                                    <img src='images/catbanner-02.jpg' className='img-fluid rounded-3' />
                                    <div className='right-banner-1-text position-absolute'>
                                        <h4>15% Off</h4>
                                        <h3>Smartwatch 7</h3>
                                        <p>Shop the latest brand<br />styles and colors.</p>
                                        {/* <Link className='button'>Buy Now</Link> */}
                                    </div>
                                </div>
                                <div className='right-banner px-1 position-relative'>
                                    <img src='images/catbanner-04.jpg' className='img-fluid rounded-3' />
                                    <div className='right-banner-1-text position-absolute'>
                                        <h4>Free Engraving</h4>
                                        <h3>AirPods Max</h3>
                                        <p>High quality playback &<br />ultra-low distortion.</p>
                                        {/* <Link className='button'>Buy Now</Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner