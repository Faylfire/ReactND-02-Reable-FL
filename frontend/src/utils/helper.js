

const testData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
   "6ni6ok3ym7mf1p33lnea": {
    id: '6ni6ok3ym7mf1p33lnea',
    timestamp: 1468479767190,
    title: 'Learn Redux in 11 minutes!',
    body: 'JK. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'general',
    voteScore: -4,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lneb": {
    id: '6ni6ok3ym7mf1p33lneb',
    timestamp: 1468479767190,
    title: 'Learn Redux in 12 minutes!',
    body: 'JK2. It takes more than 10 minutes to learn technology.',
    author: 'thingone1',
    category: 'udacity',
    voteScore: -3,
    deleted: false
  }

}

const testCata = {
  categories: [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      },
      {
        name: 'general',
        path: 'general'
      },
      {
        name: 'life',
        path: 'life'
      }
  ]
}


function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}


function genID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal. With the addition of the Date this should mean that unless
  // more than 10 thousand ids are generated every milisecond, there should be no collisions

  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};


function getImg (category, imgURL="http://localhost:3001/freesample.svg") {
    const iconList = {
      react: 'reactlogo.png',
      redux: 'reduxlogo.svg',
      udacity: 'default.png',
      general: 'life.jpg',
      life: 'freesample.svg',
      userAvatar:'user.svg'
    }

    return (`http://localhost:3001/${iconList[category]}`)
  }

function getDate (timestamp) {
  let date = new Date(timestamp)
  return date.toLocaleString()
}

//https://stackoverflow.com/questions/7467840/nl2br-equivalent-in-javascript
function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

//https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}


module.exports = {
  genID,
  testData,
  testCata,
  capitalize,
  getImg,
  getDate,
  nl2br,
  timeSince
}