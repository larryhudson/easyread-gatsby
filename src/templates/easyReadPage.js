import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import styled from 'styled-components'
import {space, fontSize, width, color} from 'styled-system'
import Button from '../components/Button'

export const AlbumTemplate = ({
  title,
  image,
  blurb,
  helmet,
  sections
}) => {

  let sectionContents = sections.map((section, index) => ({body:
    section.heading,
    image: section.image,
    index: index + 1}));
  console.log(sectionContents);
  sections.unshift( {heading: 'Contents', rows: sectionContents} );

  return (
    <section className="section">
      {helmet || ''}

          {/* album cover */}
          <Header>
            <TitleCol>
            <PageTitle>{title}</PageTitle>
            </TitleCol>
            <ImageCol>
            <PreviewCompatibleImage className="db ba b--black-10 fr" imageInfo={{image: image}}/>
            </ImageCol>
            <Blurb>{blurb}</Blurb>

          </Header>

          <SectionViewer sections={sections} />

      </section>
  )
}

class SectionViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {current: 0};
    this.showSection = this.showSection.bind(this);
    this.viewerRef = React.createRef();
  }

  scrollToRef() {
    window.scrollTo(0, this.viewerRef.current.offsetTop)
  }

  showSection(newSection) {
      this.setState(state => ({
        current: newSection
      }))
      this.scrollToRef();
  }

  render() {
    const current = this.state.current;
    const sections = this.props.sections;
    const section = sections[current];
    const first = 0;
    const prev = current - 1;
    const next = current + 1;
    const last = sections.length - 1;
    return (
      <div ref={this.viewerRef}>
        <Section>
          <Heading>{section.heading}</Heading>

          {section.rows.map(row => (
            <Row key={row.body}>
              <ImageWrapper>
                <PreviewCompatibleImage className="db ba b--black-10" imageInfo={{image: row.image}}/>
              </ImageWrapper>

              <Text>
                {section.heading === 'Contents' ? (
                <Paragraph>
                  <Link 
                  color='white' bg='darkgray'
                  p={2} className="underline"
                  onClick={() => this.showSection(row.index)}>
                  {row.body}
                  </Link>
                </Paragraph>
                ) : (
                <Paragraph>{row.body}</Paragraph>
                ) }
              </Text>
            </Row>
          ))}
          </Section>
          <NavBar>
        {current > first && 
          <Button onClick={() => this.showSection(prev)}>
          <span>&larr; {sections[prev].heading}</span>
          </Button>
        }
        {current < last &&
          <Button onClick={() => this.showSection(next)}>
          <span> &rarr; {sections[next].heading}</span>
          </Button>
        }
        </NavBar>
      </div>
    );
  }
}

const NavBar = styled.div.attrs({
  className: 'db pa3 cf'
})``

const NextButton = styled.a.attrs({
  className: 'fr pa3 mw5 mb3 bg-dark-gray white link dim pointer'
})``

const Box = styled.div(space, fontSize, width, color)

const Link = styled.a(space, fontSize, color)

const PreviousButton = styled.a.attrs({
  className: 'fl pa3 mw5 mb3 bg-dark-gray white link dim pointer'
})``

const Header = styled.div.attrs({
  className: "pa3"
})``

const TitleCol = styled.div.attrs({
  className: "fl w-100 w-75-ns"
})``

const ImageCol = styled.div.attrs({
  className: "fl w-100 w-25-ns"
})``

const Blurb = styled.div.attrs({
  className: "cf"
})``

const PageTitle = styled.h2.attrs({
  className: "f3 mb2"
})``

const SectionLink = styled.a.attrs({
  className: "link underline hover-bg-dark-gray hover-white pa2 pointer lh-copy"
})``

const Section = styled.section.attrs({
  className: "pv2",
})``

const Heading = styled.h3.attrs({
  className: "f3 mb3"
})``

const Row = styled.div.attrs({
  className: "dt-ns w-100 mb4"
})``

const ImageWrapper = styled.div.attrs({
  className: "dtc-ns pa1 mr3 v-mid w-80 mw5 center w-25-ns"
})``

const Text = styled.div.attrs({
  className: "dtc-ns f4 pa2 pl5-ns ml3-ns v-mid-ns center w-75-ns"
})``

const Paragraph = styled.p.attrs({
  className: "lh-copy measure-ns",
})``

AlbumTemplate.propTypes = {
  sections: PropTypes.array.isRequired,
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
        blurb
        sections {
          heading
          image {
              childImageSharp {
                fluid(maxWidth:500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          rows {
            body
            image {
              childImageSharp {
                fluid(maxWidth:500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
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
