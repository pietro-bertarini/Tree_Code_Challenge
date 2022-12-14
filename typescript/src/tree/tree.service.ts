import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ITreeResponseFormat } from './entities/tree.interfaces';
import { getTreeFormat, getTreeResponseFormat } from './utils/tree.utils';
import Tree from './entities/tree.entity';
import CreateTreeDto from './dto/tree.dto';
import TreeRepository from './tree.repository';

const logger = new Logger('TreeService');

@Injectable()
export default class TreeService {
  repository = new TreeRepository();

  getTreeById = async (id: number): Promise<Tree> => {
    const getTreeFromDb = await this.repository.getById(id);
    if (!getTreeFromDb) {
      throw new NotFoundException('Tree not found');
    }
    return getTreeFromDb;
  };

  getAllTree = async (): Promise<ITreeResponseFormat[]> => {
    const getTreeFromDb = await this.repository.getAll();
    const tree = getTreeFormat(getTreeFromDb);
    return getTreeResponseFormat(tree);
  };

  createTree = async (newTree: CreateTreeDto): Promise<string> => {
    if (newTree && newTree.parent) {
      // check if the parent exists
      await this.getTreeById(newTree.parent);
    }
    const tree = await this.repository.createTree(newTree);
    logger.log(`Created tree with id ${tree.id}`);
    return `Tree: {id:${tree.id},label:${tree.label}}`;
  };
}
