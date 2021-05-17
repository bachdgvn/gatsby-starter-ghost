import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import convertReadingTimeToViVn from '../../utils/translator'

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = convertReadingTimeToViVn(post, `% phút đọc`)

    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.feature_image &&
                    <div className="post-card-image" style={{
                        backgroundImage: `url(${post.feature_image})` ,
                    }}></div>}
                {post.featured && <span>Featured</span>}
                <h2 className="post-card-title">{post.title}</h2>
            </header>
            <section className="post-card-excerpt">{post.excerpt}</section>
            <footer className="post-card-footer">
                <div className="in-card-author">
                    <div className="typo">
                        {post.tags && <Tags post={post} visibility="public" autolink={false} />}
                        <span>của</span>
                    </div>
                    <span className="in-card-author-avatar">
                        {post.primary_author.profile_image ?
                            <img className="avatar" src={post.primary_author.profile_image} alt={post.primary_author.name}/> :
                            <img className="avatar" src="/images/icons/avatar.png" alt={post.primary_author.name}/>
                        }
                    </span>
                    <span className="medium">{ post.primary_author.name }</span>
                </div>
                {/*<div className="post-card-footer-right">*/}
                {/*    <div>{readingTime}</div>*/}
                {/*</div>*/}
            </footer>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
