import { axiosApi } from "../../axiosApi";


export const doFecthConvesationList = async (
    isPaginate = false,
    currentPage = 1,
    pageSize = 50,
    search = ""
) => {
    try {
        const response = await axiosApi({
            method: "GET",
            url: `/v1/user/conversation/list?currentPage=${currentPage}&pageSize=${pageSize}&isPaginate=${isPaginate}&search=${search}`
        })
        return response?.data
    } catch (error) {
        console.log({ error });
        return error.response;
    }
}
export const doFetchUserDetails = async (userDetails) => {
    try {
        const response = await axiosApi({
            method: "GET",
            url: `/v1/user/conversation/list?currentPage=${currentPage}&pageSize=${pageSize}&isPaginate=${isPaginate}&search=${search}`
        })
        return response?.data
    } catch (error) {
        console.log({ error });
        return error.response;
    }
}
export const doFetchMessages = async (conversationId) => {
    try {
        const response = await axiosApi({
            method: "GET",
            url: `/v1/user/conversation/${conversationId}/messages`
        })
        return response?.data
    } catch (error) {
        console.log({ error });
        return error.response;
    }
}

export const doSendMessage = async (conversationId, messageText) => {
    try {
        const response = await axiosApi({
            method: "POST",
            url: `/v1/user/conversation-message/${conversationId}/send`,
            data: { message: messageText }
        })
        return response?.data
    } catch (error) {
        console.log({ error });
        return error.response;
    }
}

export const doCreateConversation = async (firstMessageText) => {
    try {
        const response = await axiosApi({
            method: "POST",
            url: `/v1/user/conversation`,
            data: { first_message: firstMessageText }
        })
        return response?.data
    } catch (error) {
        console.log({ error });
        return error.response;
    }
}

export const doUpdatePinStatus = async (conversationId, type) => {
    try {
        const response = await axiosApi({
            method: "PUT",
            url: `/v1/user/conversation/${conversationId}/pin-status/${type}`
        })
        return response?.data
    } catch (error) {
        console.log({ error });
        return error.response;
    }
}

export const doDeleteConversation = async (conversationId) => {
    try {
        const response = await axiosApi({
            method: "DELETE",
            url: `/v1/user/conversation/${conversationId}`
        })
        return response?.data
    } catch (error) {
        console.log({ error });
        return error.response;
    }
}

export const doUpdateConversationTitle = async (conversationId, title) => {
    try {
        const response = await axiosApi({
            method: "PUT",
            url: `/v1/user/conversation/${conversationId}`,
            data: { title }
        })
        return response?.data
    } catch (error) {
        console.log({ error });
        return error.response;
    }
}


