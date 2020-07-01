const list = document.querySelector('ul.list')
const instagramTiles = document.querySelectorAll('div.grid-item')
const feedButtonTag = document.querySelector('p.feed-button');
const feedHeaderTags = document.querySelectorAll('span.feed-switch')
const instagramFeed = false
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

const contentfulURL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=blogPost`
const converter = new showdown.Converter();
const blogContent = []


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
const grabContent = async function() {
  const response = await fetch(contentfulURL);
  const data = await response.json();
  console.log('data at fetch =  ', data);
  
  let posts = data.items;
  let assets = data.includes.Asset;
  
  posts.forEach(post => {
    post = {
      title: post.fields.title,
      keyImage: connectImage(post.fields.keyImage.sys.id, assets),
      sampleQuote: post.fields.sampleQuote,
      blogBody: converter.makeHtml(post.fields.blogBody),
      color: post.fields.colour
    };

    blogContent.push(post);
    
  });
  console.log('at end of grab content, blogContent is =  ', blogContent);
  return blogContent
}



const connectImage = function (ID, assets) {
  let url = ''
  
  const imageData = assets.find(asset => {
    return asset.sys.id == ID
  })
  
  if (imageData) {
    url = imageData.fields.file.url
  }

  return url
}




// run grabData on load
grabContent().then(blogContent => {
  console.log('then processing run')

  const blogContentTag = document.querySelector('div.blog-content')

   blogContentTag.innerHTML = `
   <article class="blog-view" data-color="${blogContent[0].color}">
     <img src="${blogContent[0].keyImage}">
     <h2>${blogContent[0].title}</h2>
     <h3>${blogContent[0].sampleQuote}</h3>
     <div class="blog-body">${blogContent[0].blogBody}</div>
   </article>
   `
})

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
const grids = document.querySelectorAll('div.grid')

const gridFill = function () {
  console.log('fill started')
  grids.forEach(grid => {
    const storyTemp = grid.innerHTML
    for (let i = 0; i < 20; i++) {
      console.log('fill i')
      grid.innerHTML += storyTemp
    }
  })
  
}

//temporary helper
gridFill()
