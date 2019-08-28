import { IUpsertAppInput } from '../../src/dto/apps';

export const upsertAppInputFaker = {
  create,
};

function create(): IUpsertAppInput {
  return {
    name: 'test',
  };
}
