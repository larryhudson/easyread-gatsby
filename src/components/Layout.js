import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import Link from 'gatsby-link'
import "../styles/tachyons.scss"
import styled from 'styled-components'

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <Container>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />
          
          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
	        <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
	        <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />
	
	        <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
	        <meta name="theme-color" content="#fff" />

          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        <header>
        <HeaderLink to="/">
          <H1>Easy Read website</H1>
        </HeaderLink>
        <p>A prototype to make Easy Read web pages.</p>
        </header>
        <div>{children}</div>
      </Container>
    )}
  />
)

const Container = styled.div.attrs({
  className: "mw7-ns center bg-white pa3 ph5-ns sans-serif",
})``

const HeaderLink = styled(Link).attrs({
  className: "link underline-hover",
})``

const H1 = styled.h1.attrs({
  className: "f2 black"
})``

export default TemplateWrapper
