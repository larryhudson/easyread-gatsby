import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {
  Flex,
  Box,
  Card,
  Image,
  Heading,
  Text
} from 'rebass'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: pages } = data.allMarkdownRemark;

    return (
      <Layout>
        <div>
          <h1>Home page!</h1>
          <Box width={[0.6, 1]} mx={"auto"}>
            <Flex flexWrap="wrap" alignItems="center">
            {pages.map(({ node: page }) => (
                <Box width={[1, 1/2]} mx={["auto", "auto", 3]} key={page.id}>
                  <Link to={page.fields.slug}>
                    <Card
                      p={1}
                      borderRadius={2}
                      boxShadow='0 0 4px rgba(0, 0, 0, .125)'>
                      <PreviewCompatibleImage imageInfo={{image: page.frontmatter.image}} />
                      <Box p={3}>
                        <Text fontSize={3} color={"black"}>
                          {page.frontmatter.title}
                        </Text>
                      </Box>
                    </Card>
                  </Link>
                </Box>
              ))}
            </Flex>
          </Box>
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
