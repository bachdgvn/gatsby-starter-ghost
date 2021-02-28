import React from 'react'
import Image from "./Image"
import config from '../../utils/siteConfig'

const SiteOwner = () => {
    const imgs = []
    const social = config.siteOwner.social
    for (const property in social) {
        imgs.push({
            link: social[property],
            image: `${property}_icon.svg`,
        })
    }

    return (
        <div className="site-owner-card">
            <div className="img-card-header">
                <span className="fw-medium">ABOUT ME</span>
                <Image fileName="dark-line.svg"></Image>
            </div>
            <div className="site-owner-card-content">
                <div className="site-owner-avatar">
                    <div className="site-owner-avatar__inner">
                        <Image fileName="site_owner_avatar.png" style={{ width: 168, height: 168 }}></Image>
                    </div>
                </div>
                <h3>
                    <a href="/">@{ config.siteOwner.name }</a>
                </h3>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className="typo">{config.siteOwner.quote}</p>

                <div className="mt-md">
                    {imgs.map(img => (
                        // eslint-disable-next-line react/jsx-key
                        <a key={img.image} href={img.link} className="social-icon" target="_blank">
                            <Image fileName={img.image}></Image>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SiteOwner
