import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  newer: null,
  older: null,
  /** @type {import('./models/Post.js').Post} */
  posts: [],
  /** @type {import('/models/Profile.js').Profile|null} */
  activeProfile: null,
  /** @type {import('/models/Post.js').Post|null} */
  activePost: null,
  /** @type {import('/models/Ad.js').Ad} */
  ads: [],
  pages: [],
  query: null,
})
