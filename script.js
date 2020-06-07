console.log("hi");

const list = document.querySelector('ul.list')
const account = "https://www.instagram.com/_foodandotherstories"
const instagramTiles = document.querySelectorAll('div.grid-item')
const instagramFeed = true
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
      <p>${edges[0].caption}</p>
    </a>
    `
  })
}

if(instagramFeed === true) {
  getEdges().then(edges => addPosts(edges))
}