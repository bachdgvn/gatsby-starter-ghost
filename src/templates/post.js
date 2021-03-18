import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import Image from "../components/common/Image"

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        { post.feature_image ?
                            <figure className="post-feature-image">
                                <img src={ post.feature_image } alt={ post.title } />
                            </figure> : null }
                        <section className="post-full-content">
                            <span className="tag-item">
                                { `# ` + post.primary_tag.name}
                            </span>
                            <h1 className="content-title">{post.title}</h1>

                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />

                            <div className="post-footer">
                                <span className="publish_at">
                                    {post.published_at_pretty}
                                </span>
                                <span className="sep">
                                    <Image fileName="dark-line.svg"></Image>
                                </span>
                                <a className="post-social-icon"
                                    title="Chia sẻ lên Facebook"
                                    target="_blank"
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${post.url}`}>
                                    <Image fileName="facebook.svg" style={{ height: 18, width: 18 }}></Image>
                                </a>
                                <a className="post-social-icon"
                                    title="Chia sẻ lên Twitter"
                                    target="_blank"
                                    href={`http://twitter.com/share?url=${post.url}`}>
                                    <Image fileName="twitter.svg" style={{ height: 18, width: 18 }}></Image>
                                </a>
                                <a className="post-social-icon"
                                    title="Lưu vào Pinterest"
                                    target="_blank"
                                    href={`http://pinterest.com/pin/create/link/?url=${post.url}`}>
                                    <Image fileName="pinterest.svg" style={{ height: 18, width: 18 }}></Image>
                                </a>
                                <a className="post-social-icon"
                                    title="Chia sẻ qua email"
                                    href={`mailto:?subject=Hãy xem bài viết này của Doriin&amp;body=Check out this site ${post.url}.`}>
                                    <Image fileName="gmail.svg" style={{ height: 18, width: 18 }}></Image>
                                </a>
                            </div>
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            primary_tag: PropTypes.object,
            published_at_pretty: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
