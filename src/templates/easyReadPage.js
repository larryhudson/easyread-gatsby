import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'
import styled from 'styled-components'

export const AlbumTemplate = ({
  title,
  contentComponent,
  image,
  blurb,
  helmet,
  sections
}) => {
  const EasyRead = contentComponent || Content
  return (
    <section className="section">
      {helmet || ''}

          {/* album cover */}
          <Header>

            <PageTitle>{title}</PageTitle>

            <PreviewCompatibleImage className="db ba b--black-10" imageInfo={{image: image}}/>

            <Paragraph>{blurb}</Paragraph>

          </Header>

          {sections.map(section => (
            <Section>
            <Heading>{section.heading}</Heading>

            {section.rows.map(row => (
              <Row>
                <ImageWrapper>
                  <PreviewCompatibleImage className="db ba b--black-10" imageInfo={{image: row.image}}/>
                </ImageWrapper>

                <Text>
                  <Paragraph>{row.body}</Paragraph>
                </Text>
              </Row>
              ))}

            </Section>  
          ))}

      </section>
  )
}

const Header = styled.div.attrs({
  className: "pa3"
})``

const PageTitle = styled.h2.attrs({
  className: "f2 mb2"
})``

const Section = styled.section.attrs({
  className: "pv2",
})``

const Heading = styled.h3.attrs({
  className: "f3 mb2"
})``

const Row = styled.div.attrs({
  className: "dt"
})``

const ImageWrapper = styled.div.attrs({
  className: "dtc v-center w-100 w-20-ns"
})``

const Text = styled.div.attrs({
  className: "dtc v-center w-100 w-80-ns"
})``

const Paragraph = styled.p.attrs({
  className: "lh-copy measure",
})``

AlbumTemplate.propTypes = {
  sections: PropTypes.array.isRequired,
  blurb: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const EasyReadPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <Layout>
      <AlbumTemplate
        blurb={page.frontmatter.blurb}
        contentComponent={HTMLContent}
        sections={page.frontmatter.sections}
        image={page.frontmatter.image}
        helmet={
          <Helmet
            titleTemplate="%s | Album"
          >
            <title>{`${page.frontmatter.title}`}</title>
            <meta name="description" content={`${page.frontmatter.blurb}`} />
          </Helmet>
        }
        tags={page.frontmatter.tags}
        title={page.frontmatter.title}
      />
    </Layout>
  )
}

EasyReadPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default EasyReadPage

export const pageQuery = graphql`
  query PageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        sections {
          heading
          rows {
            image {
                id
                childImageSharp {
                  fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                  }
               }
             }
            body
          }
        }
        blurb
        tags
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
