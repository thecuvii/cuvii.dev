import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('Package', {
    description: 'Create a new package',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Package name:',
      },
    ],

    actions: [],
  });
}
