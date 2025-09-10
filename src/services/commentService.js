import { data } from "../assets/data/data.js";

export const commentService = {
    // Function to fetch comments
    getComment: async function () {
        try {
            const response = await fetch(data.api);
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            const comments = await response.json()
            const filteredComments = comments.comment.filter(comment => comment.message.trim() !== '');
            const result = {
              status: 200,
              message: "Success to capture data",
              comment: filteredComments
            };            
            return result;
        } catch (error) {
            return { error: error.message || 'An unknown error occurred' };
        }
    },

    // Function to add a new comment
    addComment: async function ({ id, name, phone, status, pax, message, date, color }) {
        const comment = {
            id,
            name,
            phone,
            status,
            pax,
            message,
            date,
            color
        };

        try {
            const response = await fetch(data.api, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment),
            });

            if (!response.ok) {
                throw new Error(`Failed to add comment: ${response.statusText}`);
            }

            // Only try to parse the response if the status is OK
            const responseData = await response.json();
            return responseData;

        } catch (error) {
            // console.error('Post error:', error);
            return { error: error.message || 'An unknown error occurred' };
        }
    },
};
