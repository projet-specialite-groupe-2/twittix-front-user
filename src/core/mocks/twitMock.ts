import { faker } from '@faker-js/faker'
import { Twit, type User } from '../api'
import { createUserMock } from './userMock'


const getRandomEmoji = () => {
  const emojis = ['😂', '🔥', '🎉', '😎', '💪', '🙌', '🚀', '❤️', '✨', '🥳', '🐱', '🐶', '🍕', '☕️', '🌈', '🎶', '📱'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const generateTwitContent = () => {
  const sentenceCount = faker.number.int({ min: 1, max: 3 });
  let content = '';

  for (let i = 0; i < sentenceCount; i++) {
    const sentence = faker.lorem.sentence(faker.number.int({ min: 5, max: 15 }));
    const emojiChance = Math.random();

    // Ajoute un emoji aléatoirement à la fin de la phrase
    content += sentence;
    if (emojiChance > 0.3) {
      content += ' ' + getRandomEmoji();
    }

    content += ' ';
  }

  return content.trim();
};


const currentUser: User = createUserMock()

let id = 1
const baseTwitMock = (): Twit => {
  return {
    id: 1,
    content: generateTwitContent(),
    author: createUserMock(),
    status: Twit.status.PUBLISHED,
    parent: null,
    createdAt: faker.date.past().toString(),
    isLiked: faker.datatype.boolean(),
    isReposted: faker.datatype.boolean(),
    likes: faker.helpers.multiple(() => faker.string.sample(), {
      count: { min: 0, max: 1000 },
    }),
    reposts: faker.helpers.multiple(() => faker.string.sample(), {
      count: { min: 0, max: 500 },
    }),
  }
}

const baseTwitMockWithUser = (): Twit => {
  return {
    id: 1,
    content: generateTwitContent(),
    author: currentUser,
    status: Twit.status.PUBLISHED,
    parent: null,
    createdAt: faker.date.past().toString(),
    likes: [],
    reposts: [],
  }
}


export const createTwitMock = (): Twit => {
	id += 1
	return {
    ...baseTwitMock(),
		id,
	}
}

export const createTwitMockWithUser = (): Twit => {
	id += 1
	return {
    ...baseTwitMockWithUser(),
		id,
	}
}

export const TwitsMock = faker.helpers.multiple<Twit>(createTwitMock, { count: 20 })
export const TwitsMockWithUser = faker.helpers.multiple<Twit>(createTwitMockWithUser, { count: 20 })
