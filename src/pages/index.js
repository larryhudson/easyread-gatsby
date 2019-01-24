import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: pages } = data.allMarkdownRemark;

    return (
      <Layout>
        <div>
          <h1>Home page!</h1> 
          {pages.map(({ node: page }) => (
            <p><Link to={page.fields.slug}>{page.frontmatter.title}</Link></p>
            ))}
        </div>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "easyReadPage" } }}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            blurb
            image {
              id
              childImageSharp {
                fluid( maxWidth: 200 ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
