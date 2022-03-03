import axios from 'axios';

const KEY = 'AIzaSyD_3bNG8gRcqIFs9hUgxDHlpKivwe9xAS0';
// public key = no need to hide it (.env file)

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        // fields: 'items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics',
        part:'snippet',
        maxResults: 5,
        key: KEY,
    }
})

// export default axios.create({
//     baseURL: 'https://api.unsplash.com',
//     headers: {
//         Authorization:
//             "Client-ID _rKDnAdQlKexqAsytbYe6pr0MbSm5IHs5sMfX2_eABs",
//     },
// })

// componentDidMount(){
//     this.onVideoTermSubmit('stories');
//   }

//   onVideoTermSubmit = async (term) => {
//     const response = await youtube.get('/search',{
//       params: { q: term }
//     })
//     this.setState({
//       videos: response.data.items,
//       selectedVideo: response.data.items[0]
//     })
//   }