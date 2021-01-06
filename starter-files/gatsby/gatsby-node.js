import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);

  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    // console.log('Creating a pizza page for ', pizza.name);

    actions.createPage({
      // URL of the page
      path: `pizza/${pizza.slug.current}`,
      // Component to display on the page
      component: pizzaTemplate,
      // Any data you want to pass down to the given component
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. get a template
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');

  // 2. query all toppings
  const { data } = await graphql(`
    query MyQuery {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  // console.log(data);

  // 3. create a page for each of the toppings
  data.toppings.nodes.forEach((topping) => {
    // console.log('Creating a topping page for ', topping.name);

    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        // regex for toppings that can be used in the component to query
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  console.log('🍻 fetching beers!');

  // 1. fetch a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // console.log(beers);

  // 2. loop over each
  beers.forEach((beer) => {
    // 3. create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };

    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        nodes {
          name
          id
          slug {
            current
          }
        }
        totalCount
      }
    }
  `);

  // console.log(data);

  // TODO 2. turn each slicemaster into their own page
  const slicemastersTemplate = path.resolve('./src/pages/slicemasters.js');

  // 3. figure out how many pages there are based on how many slicemasters
  //    there are and how many per page
  const totalSlicemasters = data.slicemasters.totalCount;
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const totalPages = Math.ceil(totalSlicemasters / pageSize);

  // console.log("totalPages = ", totalPages);

  // 4. loop from 1 to n (number of pages you have) and create the pages
  for (let i = 1; i <= totalPages; i++) {
    actions.createPage({
      path: `slicemasters/${i}`,
      component: slicemastersTemplate,
      context: {
        // tells us how many people we should skip over for the current page
        skip: (i - 1) * pageSize,
        currentPage: i,
        pageSize,
      },
    });
  }
  // 5. go back into slicemasters to modify query to utilize the params passed in,
  //    allowing us to only pull four at a time in sequential order
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our Gatsby API!
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically

  // wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
