import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {

  const post = data.markdownRemark

  return (
    <Layout>
      <div>
        <h1> { post.frontmatter.title } </h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </div>
    </Layout>
  )
}

// match the field in markdownRemark, whose slug is 
// equivalent to the slug variable passed
export const query = graphql`

  query($slug: String!) {

    markdownRemark(fields: { slug: { eq: $slug } }) {

      html
      frontmatter {
        title
      }
    }
  }
`