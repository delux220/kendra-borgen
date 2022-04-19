/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const template = path.resolve(`src/components/main.js`);
  const today = new Date().toISOString().slice(0, 10);
  const result = await graphql(`
    query loadPagesQuery ($today: Date) {
      allStrapiShow(filter: {Dates: {elemMatch: {StartDate: {gte: $today}}}}) {
	    edges {
	      node {
	        id
	        Title
	        Location {
	          Address1
	          Address2
	          Name
	          Website
	        }
	        Dates {
	          StartDate
	          TicketsURL
	        }
	      }
	    }
	  }
    }
  `, {today: today });

  console.log(result);

    createPage({
      path: `/`,
      component: template,
      context: {
        events: result
      },
    })
}