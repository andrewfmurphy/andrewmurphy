const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const AWS = require("aws-sdk")

AWS.config.update({ region: "us-east-1" })
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" })

const params = {
  TableName: "CREDITCARDS",
  ProjectionExpression:
    "CARD_NAME, FEES, SIGNUPBONUS, ANNUAL_FEE, REWARDS, APR, PROMOTIONS, BENEFITS",
}

function onScan(err, data) {
  if (err) {
    console.error(
      "Unable to scan the table. Error JSON:",
      JSON.stringify(err, null, 2)
    )
  } else {
    // print all the movies
    console.log("Scan succeeded.")
    data.Items.forEach(function(card) {
      console.log(card)
    })

    // continue scanning if we have more movies, because
    // scan can retrieve a maximum of 1MB of data
    if (typeof data.LastEvaluatedKey != "undefined") {
      console.log("Scanning for more...")
      params.ExclusiveStartKey = data.LastEvaluatedKey
      docClient.scan(params, onScan)
    }
  }
}

docClient.scan(params, onScan)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const longformlinks = path.resolve("src/templates/project-post.js")

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { regex: "/blog/" } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
