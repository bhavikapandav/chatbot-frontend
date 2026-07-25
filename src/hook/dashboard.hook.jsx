import { useEffect, useState } from "react"
import { doFecthConvesationList, doFetchMessages } from "@actions";
export const useDashboardHook = () => {
    const [conversationList, setConversationList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);

    useEffect(() => {
        const fetchConvesationList = async () => {
            try {
                const response = await doFecthConvesationList(false);
                console.log("doFecthConvesationList==============", response);

                if (response?.status === 200) {
                    setConversationList(response?.data);
                }
            } catch (error) {
                console.log({ error });
            }
        };
        fetchConvesationList();
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

    return {
        conversationList,
        messageList,
        setMessageList,
        handleMessageList,
        activeChatId,
        setActiveChatId
    }


}