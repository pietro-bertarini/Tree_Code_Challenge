import { Test, TestingModule } from '@nestjs/testing';
import ApiController from '../../src/api/api.controller';
import ApiService from '../../src/api/api.service';
import expectedResponseTree from './nodeData.mock';

describe('AppController', () => {
  let apiController: ApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService],
    }).compile();

    apiController = app.get<ApiController>(ApiController);
  });

  describe('Tree route', () => {
    it('should return GET /tree/"', () => {
      expect(apiController.getTree()).toStrictEqual(expectedResponseTree);
    });
    it('should return POST /tree/"', () => {
      expect(apiController.postTree()).toBe('Hello POST /tree/');
    });
  });
});
