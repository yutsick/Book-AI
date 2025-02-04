const config = {
  menuUrl: './data/menu.json',
  bookCoversUrl: './data/bookCovers.json',
  highLightUrl: './data/highLight.json',
  howItWorksUrl: './data/howItWorks.json',
  videosUrl: './data/videos.json',
  faqUrl: './data/faq.json',
  feedUrl: './data/feed.json',
  heroUrl: './data/hero.json',
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.example.com', 
  dataBaseUrl: process.env.IMAGE_BASE_URL || './data', 
  siteUrl: process.env.SITE_URL || 'http://localhost:3000', 
  // Create Book
  heroQuizUrl: './data/createBook/heroQuiz.json',
  buttonTextUrl: './data/createBook/buttonText.json',
  genresUrl: './data/createBook/genres.json',
  createBookStep1: './data/createBook/stepOne.json',
  // About Us
  aboutUsUrl: '/data/about-us/aboutUs.json',
  storyUrl: '/data/about-us/story.json'
};

export default config;