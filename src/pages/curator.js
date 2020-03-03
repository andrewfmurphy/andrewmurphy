import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "../css/main.css"
import ArticlePreview from "../components/articlepreview"

class CuratorIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const articles = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={"Curator"}>
        <SEO title="Curator" />
        {articles.map(({ node }) => {
          const title = node.frontmatter.title
          return (
            <ArticlePreview {...node.frontmatter}/>
          )
        })}
      </Layout>
    )
  }
}

export default CuratorIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {fileAbsolutePath: {regex: "/longform/"  }}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            subtitle
            link
            author
            publication
            category
            subcategory
            readingtime
          }
        }
      }
    }
  }
`
