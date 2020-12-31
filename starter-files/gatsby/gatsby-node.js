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
  console.log(data);

  // 3. create a page for each of the toppings
  data.toppings.nodes.forEach((topping) => {
    console.log('Creating a topping page for ', topping.name);

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

export async function createPages(params) {
  // Create pages dynamically

  // wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
