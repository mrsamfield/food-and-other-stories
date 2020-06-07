console.log("hi");

const list = document.querySelector('ul.list')
const instagramTiles = document.querySelectorAll('div.grid-item')
const feedButtonTag = document.querySelector('p.feed-button');
const feedHeaderTags = document.querySelectorAll('span.feed-switch')
const instagramFeed = true
let account = "https://www.instagram.com/_foodandotherstories"
let edges = []

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

// Mouse over instagram
const captionPreview = document.querySelector('p.caption-preview')

const lockPreview = function (e) {
  let x = e.clientX
  let y = e.clientY
  let caption = e.target.parentNode.parentNode.dataset.caption
  if (caption) {
    captionPreview.innerHTML = caption
    captionPreview.style.left = (x - (captionPreview.getBoundingClientRect().width / 2))  + 'px'
    captionPreview.style.top = y + 15 + window.pageYOffset + 'px'
  } else {
    captionPreview.innerHTML = ""
  } 
}



document.addEventListener("mousemove", function (e) {
  lockPreview(e)
})