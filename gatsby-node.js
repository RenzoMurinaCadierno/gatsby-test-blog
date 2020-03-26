const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)

// whenever a node (file) is being created
// actions are also received from gatsby
// getNode gets the node representation of the files
//   > the ones of the query inside "edges"
exports.onCreateNode = ({ node, getNode, actions }) => {

  // pluck off the action that creates the field of a node
  // This means we can query it with graphql playground
  const { createNodeField } = actions

  if(node.internal.type === `MarkdownRemark`) {

    // node : the name of the file it intercepts
    // basePath : when we want to add a base path. We do not
    //            neet it here, since it's a relative name
    const slug = createFilePath({ node, getNode /*, basePath */ })

    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages =({ graphql, actions }) => {

  // createPage allows us to create the page dynamically
  // when building the gatsby app
  const { createPage } = actions

  // Later versions of ES6 allow us to use template syntax 
  // (like graphql``), but since we cannot assure those are
  // being applied here, we safely pass them into gatsby's
  // dedicated function ( graphql(``) ). It is a promise!
  // It returns us the data object reassembling the query
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then( result => {

    result.data.allMarkdownRemark.edges.forEach( ({ node }) => {

      // create the static page on build time.
      // path : the slug of the markdown page
      // component : the template to render it in
      // context : additional data to pass to template component
      createPage({
        path: node.fields.slug,   // pass the slug
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug
        }
      })
    })
  })
}