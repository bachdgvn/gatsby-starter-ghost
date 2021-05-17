import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import convertReadingTimeToViVn from "../../utils/translator"

const ImgPostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = convertReadingTimeToViVn(post, `Dành % phút để đọc`)

    return (
        <Link to={url} className="img-post-card">
            <div className="img-post-card__bg" style={{
                backgroundImage: `url(${post.feature_image})`,
                backgroundSize: `cover`,
                backgroundPosition: `bottom`,
            }}>
                <div className="post-card-header">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <span className="typo">"{ readingTime }"</span>
                </div>
                <div className="post-card-footer">
                    <h2 className="post-card-title">{post.title}</h2>
                    <section className="post-card-excerpt">{post.excerpt}</section>
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
                </div>
            </div>
        </Link>
    )
}

ImgPostCard.propTypes = {
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

export default ImgPostCard
