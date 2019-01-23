import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'
import SingleAlbum from '../components/SingleAlbum'
import Button from '../components/Button'
import styled from 'styled-components'
import "../styles/blockItemDottedBorder.css"

export const AlbumTemplate = ({
  content,
  contentComponent,
  blurb,
  tags,
  title,
  artist,
  helmet,
  listenLinks,
  favouriteSongs,
  image
}) => {
  const AlbumContent = contentComponent || Content
  return (
    <section className="section">
      {helmet || ''}

          {/* album cover */}
          <Section>

            <SingleAlbum title={title} artist={artist} image={image} />

          </Section>

          {/* listen links */}
          <Section>

          	<InlineH4>Listen:</InlineH4>

            <InlineList>
          	{listenLinks.map(link => (

              <InlineListItem key={link.link + `link`}>
                  <Button link={link.link} component="a">{link.title}</Button>
              </InlineListItem>

              ))}
            </InlineList>

          </Section>

            {/* post content */}
            <Section>

                <CopySection>

                  <p>{blurb}</p>

                  <AlbumContent content={content} />

                </CopySection>

            </Section>

            {/* favourite songs */}
            {favouriteSongs && favouriteSongs.length ? (
        			<Section>

        				<h4>Favourite songs</h4>

        				<SongList>
        				{favouriteSongs.map(song => (

                  <SongListItem key={song.title + `favsong`}>
                    {song.title}

                    <span className="ml2">
                        {song.link.map(songlink => (
                          <Button key={songlink.link + `link`} link={songlink.link} component="a">{songlink.title}</Button>
                        ))}
                    </span>

                  </SongListItem>

        	      ))}
        				</SongList>

        			</Section>
              ) : null}

            {/* tags */}
            {tags && tags.length ? (

              <section className="pb2 pt4">

                <InlineH4>Tags</InlineH4>

                <InlineList>

                  {tags.map(tag => (

                    <InlineListItem key={tag + `tag`}>
                      <Button link={`/tags/${kebabCase(tag)}/`} component="Link">{tag}</Button>
                    </InlineListItem>

                  ))}

                </InlineList>
              </section>
            ) : null}
      </section>
  )
}

const Section = styled.section.attrs({
  className: "pv2",
})``

const CopySection = styled.div.attrs({
  className: "lh-copy measure",
})``

const SongList = styled.ul.attrs({
  className: "list ph0 mh0 measure",
})``

const SongListItem = styled.li.attrs({
  className: "lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30",
})``

const InlineList = styled.ul.attrs({
  className: "di list",
})``

const InlineListItem = styled.li.attrs({
  className: "dib mr2",
})``

const InlineH4 = styled.h4.attrs({
  className: "di",
})``

AlbumTemplate.propTypes = {
  content: PropTypes.object.isRequired,
  blurb: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const Album = ({ data }) => {
  const { markdownRemark: album } = data

  return (
    <Layout>
      <AlbumTemplate
        content={album.html}
        blurb={album.frontmatter.blurb}
        contentComponent={HTMLContent}
        helmet={
          <Helmet
            titleTemplate="%s | Album"
          >
            <title>{`${album.frontmatter.title}`}</title>
            <meta name="description" content={`${album.frontmatter.blurb}`} />
          </Helmet>
        }
        tags={album.frontmatter.tags}
        title={album.frontmatter.title}
        artist={album.frontmatter.artist}
        image={album.frontmatter.image}
        listenLinks={album.frontmatter.listenLinks}
        favouriteSongs={album.frontmatter.favouriteSongs}
      />
    </Layout>
  )
}

Album.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Album

export const pageQuery = graphql`
  query AlbumByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        artist
        blurb
        tags
        listenLinks {
        	link
        	title
        }
        favouriteSongs {
        	link {
        		link
        		title
        	}
        	title
        }
        image {
	      id
	      childImageSharp {
	        fluid(maxWidth: 1000) {
	          ...GatsbyImageSharpFluid
	        }
	      }
	    }
      }
    }
  }
`
