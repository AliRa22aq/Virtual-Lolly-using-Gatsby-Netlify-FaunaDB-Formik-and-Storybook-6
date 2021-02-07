// const path = require(`path`)

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions

//   // Define a template for blog post
//   const data = path.resolve(`./src/templates/newLol.js`)

//   // Get all markdown blog posts sorted by date
//   const result = await graphql(
//     `
//       {
//         allContentfulPost {
//           nodes {
//             postNo
//             author
//             image {
//               fluid {
//                 src
//               }
//             }
//             title
//             subtitle
//             slug
//             content {
//               raw
//             }
//           }
//         }
//       }
//     `
//   )

//   if (result.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your blog posts`,
//       result.errors
//     )
//     return
//   }

//   const posts = result.data.allContentfulPost.nodes
//   console.log(posts)

//   // Create blog posts pages
//   // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
//   // `context` is available in the template as a prop and as a variable in GraphQL

//     posts.forEach((post, index) => {
//       // const previousPostId = index === 0 ? null : posts[index - 1].id
//       // const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

//       createPage({
//         path: post.slug,
//         component: blogPost,
//         context: {
//           data: post
//           // previousPostId,
//           // nextPostId,
//         },
//       })
//     })
// }



exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions;
 
  if (page.path.match(/^\/lollies/)) {
    console.log("Page Created")
     page.matchPath = "/lollies/*";
     createPage(page);
   }}