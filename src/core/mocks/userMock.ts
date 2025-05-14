import { faker } from '@faker-js/faker'
import { type User } from '../api'

let id = 1
const baseUserMock = (): User => {
  return {
    id: 1,
    createdAt: faker.date.past().toString(),
    updatedAt: faker.date.past().toString(),
    deletedAt: null,
    email: faker.internet.email(),
    password: faker.internet.password(),
    roles: [],
    username: faker.internet.username(),
    biography: faker.lorem.sentence(),
    birthdate: faker.date.past({ years: 20 }).toString(),
    profileImgPath: faker.image.avatar(),
    private: faker.datatype.boolean(),
    active: faker.datatype.boolean(),
    banned: faker.datatype.boolean(),
    twits: [],
    conversations: [],
    messages: [],
    followers: [],
    followings: [],
    likes: [],
    reposts: [],
    userIdentifier: faker.internet.username(),
  }
}

export const createUserMock = (): User => {
  id += 1
  return {
    ...baseUserMock(),
    id,
  }
}

export const UsersMock = faker.helpers.multiple<User>(createUserMock)
