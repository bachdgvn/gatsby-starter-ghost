import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'
import SiteOwner from "../components/common/SiteOwner"

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location, pageContext }) => {
    let posts = data.allGhostPost.edges

    let latestPost = null
    if (posts.length > 0) {
        latestPost = <PostCard key={posts[0].node.id} post={posts[0].node} />
    }

    let secLatestPost = null
    if (posts.length > 1) {
        secLatestPost = <PostCard key={posts[1].node.id} post={posts[1].node} />
    }

    posts = posts.filter((item, i) => i > 1)

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
                    <div className="latest-post">
                        {latestPost}
                    </div>

                    <div className="second-latest-post__site-owner">
                        <div className="second-latest-post">
                            {secLatestPost}
                        </div>
                        <div className="site-owner">
                            <SiteOwner/>
                        </div>
                    </div>

                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
