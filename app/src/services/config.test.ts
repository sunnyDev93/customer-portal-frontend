import aptiveAPI from './config';

jest.mock('./config');

const mockedApi = aptiveAPI as jest.Mocked<typeof aptiveAPI>;

describe('config', () => {
  describe('fake test save', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedApi.post.mockResolvedValue({});
    });

    it('should save data if resolved', async () => {
      const req: any = {
        params: {
          id: 5006,
        },
        body: {
          billing_name: 'ABC',
        },
      };
      const res: any = {
        status: () => {
          return {
            json: jest.fn(),
          };
        },
      };
      const result = {
        status: 200,
        data: {
          message: 'Customer Saved',
        },
      };

      mockedApi.post.mockResolvedValue(result);

      await mockedApi.post(req, res);

      expect(mockedApi.post).toHaveBeenCalled();
      expect(mockedApi.post).toHaveBeenCalledTimes(1);
    });
  });
});
