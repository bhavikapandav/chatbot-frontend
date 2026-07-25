import { useEffect, useState, useCallback } from "react"
import {
    doFecthConvesationList,
    doFetchMessages,
    doSendMessage,
    doCreateConversation,
    doUpdateConversationTitle,
    doUpdatePinStatus,
    doDeleteConversation
} from "@actions";

export const useDashboardHook = () => {
    const [conversationList, setConversationList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [isSendingMessage, setIsSendingMessage] = useState(false);

    const getConversationList = useCallback(async () => {
        try {
            const response = await doFecthConvesationList(false);
            console.log("doFecthConvesationList==============", response);

            if (response?.status === 200) {
                setConversationList(response?.data);
            }
        } catch (error) {
            console.log({ error });
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        const init = async () => {
            try {
                const response = await doFecthConvesationList(false);
                if (isMounted && response?.status === 200) {
                    setConversationList(response?.data);
                }
            } catch (error) {
                console.log({ error });
            }
        };
        init();
        return () => {
            isMounted = false;
        };
    }, [])



    const handleMessageList = async (conversationId) => {
        try {
            const response = await doFetchMessages(conversationId);
            console.log("doFecthConvesationList==============", response);

            if (response?.status === 200) {
                setMessageList(response?.data);
            }
        } catch (error) {
            console.log({ error });
        }
    }

    const sendMessage = async (messageText) => {
        if (!messageText.trim()) return;

        setIsSendingMessage(true);
        let currentChatId = activeChatId;

        try {
            // If no active chat, create a conversation first
            if (!currentChatId) {
                const createResponse = await doCreateConversation(messageText);
                if (createResponse?.success && createResponse.data?.ceratedConversation) {
                    currentChatId = createResponse.data.ceratedConversation._id;
                    setActiveChatId(currentChatId);
                    // Refresh conversation list
                    await getConversationList();
                } else {
                    throw new Error("Failed to create conversation");
                }
            }

            // Append user message optimistically
            const userMsg = {
                _id: `temp-user-${Date.now()}`,
                role: "user",
                content: messageText,
                createdAt: new Date().toISOString()
            };
            setMessageList(prev => ({
                ...prev,
                rows: [...(prev?.rows || []), userMsg]
            }));

            // Call send API
            const response = await doSendMessage(currentChatId, messageText);
            if (response?.success) {
                // Fetch the updated conversation list
                await getConversationList();
                // Reload messages for the conversation
                const msgResponse = await doFetchMessages(currentChatId);
                if (msgResponse?.status === 200) {
                    setMessageList(msgResponse?.data);
                }
            }
        } catch (error) {
            console.log({ error });
        } finally {
            setIsSendingMessage(false);
        }
    };

    const handleRenameConversation = async (conversationId, newTitle) => {
        try {
            const response = await doUpdateConversationTitle(conversationId, newTitle);
            if (response?.success) {
                // Refresh list
                await getConversationList();
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const handlePinConversation = async (conversationId, type) => {
        try {
            const response = await doUpdatePinStatus(conversationId, type);
            if (response?.success) {
                // Refresh list
                await getConversationList();
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const handleDeleteConversation = async (conversationId) => {
        try {
            const response = await doDeleteConversation(conversationId);
            if (response?.success) {
                // If the deleted chat was the active one, clear it
                if (activeChatId === conversationId) {
                    setActiveChatId(null);
                    setMessageList([]);
                }
                // Refresh list
                await getConversationList();
            }
        } catch (error) {
            console.log({ error });
        }
    };

    return {
        conversationList,
        messageList,
        setMessageList,
        handleMessageList,
        activeChatId,
        setActiveChatId,
        isSendingMessage,
        sendMessage,
        handleRenameConversation,
        handlePinConversation,
        handleDeleteConversation
    }
}