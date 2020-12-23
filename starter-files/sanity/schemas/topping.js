import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // computer name
  name: 'topping',
  // visible name
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'Name of the topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Check for vegetarian topping',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: (fields) => {
      const { name, vegetarian } = fields;
      return {
        title: `${name} ${vegetarian ? '🌱' : ''}`,
      };
    },
  },
};
