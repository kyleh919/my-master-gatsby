import path from 'path';

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
  console.log(data);

  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    console.log('Creating a pizza page for ', pizza.name);

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

export async function createPages(params) {
  // Create pages dynamically
  // 1. Pizzas
  await turnPizzasIntoPages(params);
  // 2. Toppings
  // 3. Slicemasters
}
