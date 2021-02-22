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
            <div className="site-avatar">
                <div>
                    <Image fileName="site_owner_avatar.png" style={{ width: 168, height: 168 }}></Image>
                </div>
            </div>
            <h4>
                <a href="">@{ config.siteOwner.name }</a>
            </h4>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>"{config.siteOwner.quote}"</p>

            <div>
                {imgs.map(img => (
                    // eslint-disable-next-line react/jsx-key
                    <a href={img.link}>
                        <Image fileName={img.image}></Image>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default SiteOwner
