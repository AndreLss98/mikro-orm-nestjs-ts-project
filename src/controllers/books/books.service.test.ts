import { getRepositoryToken } from "@mikro-orm/nestjs";
import { EntityManager } from "@mikro-orm/postgresql";
import { Test, TestingModule } from "@nestjs/testing";
import { BookEntity } from "../../entities/book.entity";
import { BooksService } from "./books.service"
import { CreateBookDto } from "./dto/create-book.dto";

describe('UserService', () => {
  let service: BooksService;

  const mockBookRepository = {
    create: jest.fn().mockImplementation(dto => ({
      id: Math.random(),
      ...dto
    }))
  }

  const mockEntityManager = {
    fork: jest.fn().mockImplementation((value) => ({
      begin: jest.fn(),
      persist: jest.fn().mockImplementation((book) => book),
      commit: jest.fn(),
      rollback: jest.fn()
    }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: mockBookRepository
        },
        EntityManager
      ]
    })
    .overrideProvider(EntityManager)
    .useValue(mockEntityManager)
    .compile()

    service = module.get<BooksService>(BooksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a user', async () => {
    const dto: CreateBookDto = {
      title: 'Um livro qualquer',
      releaseDate: new Date()
    }
    
    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto
    })
  })
})