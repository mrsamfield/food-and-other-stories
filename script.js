console.log("hi");

const list = document.querySelector('ul.list')
const account = "https://www.instagram.com/_foodandotherstories"
const instagramFeed = true

const getEdges = function() {
  fetch(account + "/?__a=1")
    .then(response => response.json())
    .then(result => {
      let edges = result.graphql.user.edge_owner_to_timeline_media.edges;
      edges.forEach(edge => {
        console.log(edge);
        edge = {
          url: edge.node.display_url,
          caption: edge.node.edge_media_to_caption.edges[0].node.text
        }
        
      });
      console.log(edges);
      return edges
    });
};


//adds post html to page
const addPosts = function (edges) {
  instagramTiles.forEach((tile, i) => {
    tile.innerHTML = + `
    <a href="${account}">
      <img src="${edges[i].url}">
      <p>${edges[0].caption}</p>
    </a>
    `
  })
}

if(instagramFeed === true) {
  getEdges().then(edges => addPosts(edges))
}