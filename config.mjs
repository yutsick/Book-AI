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

  // Contact Us
  contactUsUrl: './data/contactUs/contactUs.json'

  // About Us
  aboutUsUrl: '/data/about-us/aboutUs.json',
  storyUrl: '/data/about-us/story.json',
  whatWeDoUrl: '/data/about-us/whatWeDo.json',
  chooseUrl: '/data/about-us/choose.json',
  visionUrl: '/data/about-us/vision.json',
  joinUsUrl: '/data/about-us/joinUs.json',
  //Confirmation
  orderCompleteUrl: '/data/confirmation/orderComplete.json',
  whatHappensUrl: '/data/confirmation/whatHappens.json',
  orderStatusInfoUrl: '/data/confirmation/orderStatusInfo.json',
  needHelpUrl: '/data/confirmation/needHelp.json',
  //Legal
  termsUrl: '/data/terms/terms.json',
  privacyUrl: '/data/privacy/privacy.json',

};

export default config;