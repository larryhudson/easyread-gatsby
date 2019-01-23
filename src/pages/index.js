import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout>
        <div>
          <h1>Home page!</h1>
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
      filter: { frontmatter: { templateKey: { eq: "album" } }}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            artist
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
