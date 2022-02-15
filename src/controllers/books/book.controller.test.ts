import { Test } from '@nestjs/testing'
import { BooksController } from './books.controller'
import { BooksService } from './books.service'
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksController', () => {
  let bookController: BooksController;

  const mockBookService = {
    create: jest.fn(dto => ({
      id: Math.random(),
      ...dto
    }))
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService]
    })
      .overrideProvider(BooksService)
      .useValue(mockBookService)
      .compile()

    bookController = moduleRef.get<BooksController>(BooksController)
  })

  describe('GetAll', () => {
    it('should be defined', async () => {
      expect(bookController).toBeDefined()
    })

    it('should create a book', async () => {
      const dto: CreateBookDto = {
        title: 'Um livro de teste',
        releaseDate: new Date()
      }

      expect(await bookController.create(dto)).toEqual({
        id: expect.any(Number),
        ...dto
      })

      expect(mockBookService.create).toHaveBeenCalledWith(dto)
    })
  })
})