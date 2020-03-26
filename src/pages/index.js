import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

// Styled link to navigate to each blog by its fields.slug
const BlogLink = styled(Link)`
  text-decoration: none;

`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue
`

// switch the export to a default anonymous function
// GraphQL will automatically reckon it and link it
// to the query below.
// Props received will be the result of the query.
// Notice how the received data object matches the
// structure of the query to access by dot notation
export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h1> RNMC Log </h1>
      <h4> Total posts : { data.allMarkdownRemark.totalCount } </h4>
      {
        data.allMarkdownRemark.edges.map( ({ node }) => (

          <div key={ node.id }>
            <BlogLink to={ node.fields.slug }>
              <BlogTitle>{ node.frontmatter.title } - { node.frontmatter.date }</BlogTitle>
            </BlogLink>
            <p> { node.excerpt }</p>
          </div>
        ))
      }
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

// exporting anything with graphql`` will pass the result
// as props to the component exported in this file (the
// one above). It will receive the result as props.
export const query = graphql`
  query MyQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            description
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`