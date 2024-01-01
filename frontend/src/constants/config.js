// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded. Please wait"
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    requestFailure: {
        message: "An error occur while parsing request data"
    },
    responseFailure: {
        title: "Error!",
        message: "Failed to load data from server. Please try again"
    },
    networkError: {
        title: "Error!",
        message: "Please check internet connectivity and try again."
    }
}

// API SERVICE URL
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: "/", method: "POST/GET/PUT/DELETE" }
export const SERVICE_URLS = {
    userLogin: { url: '/login', method: 'POST' },
    userSignup: { url: '/signup', method: 'POST' },
    getAllPosts: { url: '/posts', method: 'GET', params: true },
    getRefreshToken: { url: '/token', method: 'POST' },
    createPost: { url: '/create', method: 'POST' },
    activateAccount: { url: '/activation', method: 'POST' },
    getPostById: { url: 'post', method: 'GET', query: true },
    deletePodcast: { url: 'delete', method: 'DELETE', query: true },
}