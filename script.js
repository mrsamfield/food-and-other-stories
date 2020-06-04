// https://api.instagram.com/oauth/authorize?client_id=694292177800811&redirect_uri=https://silly-kowalevski-1664a9.netlify.app/&scope=user_profile,user_media&response_type=code
// ?code=AQAuvpHfhX53Je8iJLH0KLeAqqpWh6x6_MTBGPpgXKx2SKEdWdg20vOhpbjAgfs5xKVeITc5GKz-ODCTkGxv2aQ9W61uxCgKYbnYS7abi8ZxMFw6vsZomcdmMpKPIxOmMQfS-w-lmIpupLc3Kp09IPEodjLZqP0aIfZkmUiaUAYJKW8PqVhq07oEPpgPkTt2s7XDxYo7U_MeHE_IJV4Y8nuw060c7QeHNajG3nKyQ3rLeQ

// curl -X POST \
//   https://api.instagram.com/oauth/access_token \
//   -F client_id=694292177800811 \
//   -F client_secret=4b6adb0730fb860beee76efed2e0d9d6 \
//   -F grant_type=authorization_code \
//   -F redirect_uri=https://silly-kowalevski-1664a9.netlify.app/ \
//   -F code=AQA_E8hMpfHo4TQE7YmhJHo0_Tk49RUFzYTtDFUM7fPby0VbavR6-_Ptpb_Z42hpn0YvTZYb1N7MG1K_YGY_B-jAFrkNV89910Q-Wh1JMBr7wh8OZp-adJKb0vVeWgJGPgDsANIyy3FAFqxYwZkl857J5yBgFWom_tHz1jqj65vu3cJHqVYo2H_D_xa1zzYxEmWPmRTBXd8dRJXSG8hbkCC9KWliom-8S9UbGq7IyhJ0SQ

//   "access_token": "IGQVJVaU44SWpGeE9EWWZA4VzlGaXFMWTFfa3Nwdk9IdVZAmNi1NUjdKNXNEM2Q1b000Qk9kY3FHUDlseTNId195WEoxZAS1sQ3pESTNibVlSME5mOFZAxYXpPS3QxcHlpRzVpTGZAuUUlQTlF1RFo4ekhGd0gwakxFbEdna3pR",
//   "user_id": 17841400017318631

//   "access_token": "IGQVJXSmxVME9JUWpDS2Q2YjZABQ1hnaDFsNUJlOFY4cEVKZAGYybTEwRm5kQm5FUVNsaE5Sc3N5ZA1VaX0lVTWh5S05vc0hTUngxWWZAORXdOTU5tVHRfZAjFpX0VGOHF4M2dsckgzUEln",
//     "token_type": "bearer",
//     "expires_in": 5184000

// 
const startpoint = 'https://graph.instagram.com/me/'
const fields = 'id,caption'
const accessToken = 'IGQVJXSmxVME9JUWpDS2Q2YjZABQ1hnaDFsNUJlOFY4cEVKZAGYybTEwRm5kQm5FUVNsaE5Sc3N5ZA1VaX0lVTWh5S05vc0hTUngxWWZAORXdOTU5tVHRfZAjFpX0VGOHF4M2dsckgzUEln'
const request1 = `${startpoint}media?fields=${fields}&access_token=${accessToken}`
const feed = {}

const getImages = function () {
    fetch(request1)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
        }
      })
      return feed
}

// const getUrls = function () {
//     feed.forEach(post => {
//         fetch(`https://graph.instagram.com/${post.id}?fields=id,media_type,media_url,username,timestamp&access_token=${accessToken}`)
//           .then(response => response.json())
//           .then(data => {
//               console.log(data)
//           })
//     })
// }


getImages()
// getUrls()