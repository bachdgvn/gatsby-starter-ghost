import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import { Navigation } from '.'

// Styles
import "@fontsource/inter/300.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/800.css"
import "@fontsource/lora/500.css"
import "@fontsource/lora/600.css"
import '../../styles/app.less'
import Image from "./Image"
import config from "../../utils/siteConfig"

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node

    const imgs = []
    const social = config.siteOwner.social
    for (const property in social) {
        imgs.push({
            link: social[property],
            image: `${property}_icon.`,
        })
    }

    const [menuState, setMenuState] = useState(`close`)

    const toggleMenu = () => {
        setMenuState(menuState === `open` ? `close` : `open`)
    }

    return (
        <div>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head">
                        <div className="container">
                            <nav className="site-nav">
                                <div className="site-nav-left">
                                    <Link to="/">
                                        {site.logo ?
                                            <img className="site-logo" src={site.logo} alt={site.title} />
                                            : <Image fileName="ghost-icon.png"></Image>
                                        }
                                    </Link>
                                    <div className="site-nav-menu" onClick={toggleMenu}>
                                        <Image fileName={`menu-${menuState}.svg`}></Image>
                                    </div>
                                </div>
                                <div className={`site-nav-right ${menuState}`}>
                                    {/* The navigation items as setup in Ghost */}
                                    <Navigation data={site.navigation} navClass="site-nav-item" />
                                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                    <a className="site-nav-button"
                                        href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fdoriin.digitalpress.blog%2F"
                                        target="_blank">
                                        <Image fileName="feedly."></Image>
                                        <span>Feedly me</span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <div className="site-owner-avatar">
                                    <div className="site-owner-avatar__inner">
                                        <Image fileName="site_owner_avatar.png" style={{ width: 120, height: 120 }}></Image>
                                    </div>
                                </div>
                                <div className="site-owner-footer-content">
                                    <h3>
                                        <a href="/">@{ config.siteOwner.name }</a>
                                    </h3>
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <p className="typo">{config.siteOwner.quote}</p>

                                    <div className="site-owner-footer-social-links">
                                        <span className="typo">Dành một lời nhắn cho tôi qua</span>
                                        {imgs.map(img => (
                                            // eslint-disable-next-line react/jsx-key
                                            <a key={img.image} href={img.link} className="social-icon" target="_blank">
                                                <Image fileName={img.image}></Image>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation data={site.navigation} navClass="site-foot-nav-item" />
                                <a className="site-nav-button"
                                    href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fdoriin.digitalpress.blog%2F"
                                    target="_blank">
                                    <Image fileName="feedly.svg"></Image>
                                    <span>Feedly me</span>
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
