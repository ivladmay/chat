import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const modals = {
  add: AddChannel,
  remove: RemoveChannel,
  rename: RenameChannel,
};

export default (type) => modals[type];
