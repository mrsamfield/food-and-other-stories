console.log("hi");

const list = document.querySelector('ul.list')
const instagramTiles = document.querySelectorAll('div.grid-item')
const feedButtonTag = document.querySelector('p.feed-button');
const feedHeaderTags = document.querySelectorAll('span.feed-switch')
const instagramFeed = true
let account = "https://www.instagram.com/_foodandotherstories"
let edges = []

//header consts
const mainTitle = document.querySelector('h1.logo-main');
const title = mainTitle.outerHTML

const header = document.querySelector('header.header-main')

const nav = document.querySelector('nav.nav-main')
const navContent = nav.outerHTML

const headerHeight = header.getBoundingClientRect().bottom;
let status = 'unscrolled'

//Contentful api consts
const spaceId= 'z58lj2o43c3r'
const environmentId = 'master'
const accessToken = 'fBVTlOPEBJGx6I1QQqBtx0y99-N2AUB-2CVVfj-yKjE'

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=blogPost`




const headerCheck = function () {
  const h1Pos = mainTitle.getBoundingClientRect().bottom
  if(h1Pos < headerHeight) {
    if (status !== 'scrolled')
    header.innerHTML = title + navContent
    header.style.boxShadow = '0 5px 5px #20202010'
    status = 'scrolled'
    
  } else if (status !== 'unscrolled'){
    header.innerHTML = navContent
    header.style.boxShadow = 'none'
    status = 'unscrolled'
  }
}

const getEdges = function() {
  return fetch(account + "/?__a=1")
    .then(response => response.json())
    .then(result => {
      results = result.graphql.user.edge_owner_to_timeline_media.edges;
      results.forEach(edge => {
        edge = {
          url: edge.node.display_url,
          caption: edge.node.edge_media_to_caption.edges[0].node.text
        }
        edges.push(edge)
      });
      console.log('processed edges =  ', edges);
      return edges
    });
};


//adds post html to page
const addPosts = function (edges) {
  instagramTiles.forEach((tile, i) => {
    tile.innerHTML = `
    <a href="${account}" target=”_blank”>
      <img src="${edges[i].url}">
    </a>
    `
    tile.setAttribute('data-caption', edges[i].caption)
  })
}

if(instagramFeed === true) {
  getEdges().then(edges => addPosts(edges))
}

// contentful api - grab content
const grabData = function() {
  return fetch(url)
  .then(response => response.json())
  .then(data => {

    // turn our contentful data into something more useful
    console.log(data)
  })
}

// run grabData on load
grabData()

//on clicking 

const switchFunction = function () {
  feedHeaderTags.forEach(header => header.classList.toggle('selected'))
  if (feedHeaderTags[0].classList.contains('selected') === true) {
    account = "https://www.instagram.com/_foodandotherstories"
    edges = []
    getEdges().then(edges => addPosts(edges))
  } else if (feedHeaderTags[1].classList.contains('selected') === true) {
    account = "https://www.instagram.com/leeannsnyman"
    edges = []
    getEdges().then(edges => addPosts(edges))
  }
}

feedButtonTag.addEventListener("click", function () {
  switchFunction()
})

// header on scroll
window.addEventListener("scroll", function (e) {
   headerCheck()
})

//grid tester
const grid = document.querySelector('div.grid')

const gridFill = function () {
  console.log('fill started')
  const storyTemp = grid.innerHTML
  for (let i = 0; i < 20; i++) {
    console.log('fill i')
    grid.innerHTML += storyTemp
  }
}

//temporary helper
gridFill()



