import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // computer name
  name: 'pizza',
  // visible name
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000).max(50000),
      // TODO: Add custom input component
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      toppingType0: 'toppings.0.vegetarian',
      toppingType1: 'toppings.1.vegetarian',
      toppingType2: 'toppings.2.vegetarian',
      toppingType3: 'toppings.3.vegetarian',
    },
    prepare: ({
      title,
      media,
      topping0,
      topping1,
      topping2,
      topping3,
      ...toppingTypes
    }) => {
      const toppings = { topping0, topping1, topping2, topping3 };

      // 1. - filter the undefined toppings out
      const definedToppings = Object.values(toppings).filter(
        (topping) => topping !== undefined
      );

      // 1.5 - determine if all toppings are vegetarian
      const vegetarian = !Object.values(toppingTypes).includes(
        false || undefined
      );

      // 2. - return the preview object for the pizza
      return {
        title: `${title} ${vegetarian ? `🌱` : ``}`,
        media,
        subtitle: definedToppings.join(', '),
      };
    },
  },
};
