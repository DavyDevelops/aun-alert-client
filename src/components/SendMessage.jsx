import React, { useState, useEffect } from 'react';
import '../assets/css/form.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { RiSendPlane2Fill } from "react-icons/ri";
import { CircleLoader } from 'react-spinners'; // Added import for CircleLoader

const SendMessage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false); // State to handle sending status
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)

        // Fetch previously sent messages
        // axios.get('http://localhost:3000/aunalertsystem/messages', {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        // })
                    axios.get('https://aun-alert-api.vercel.app/aunalertsystem/messages', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setLoading(false)
            if (res.data.success){
                setMessages(res.data.messages);
            }
        })
        .catch((err) => {
            setLoading(false)
            console.log(err);
        }); 
        
    }, []);

    const handleMessageSend = (e) => {
        e.preventDefault();
        setSending(true); // Disable the send button and show loader
        // axios.post('http://localhost:3000/aunalertsystem/send-alert', { message: newMessage }, {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        // })
                axios.post('https://aun-alert-api.vercel.app/aunalertsystem/send-alert', { message: newMessage }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            if (res.data.success) {
                toast.success("Message Sent Successfully", {
                    position: "top-right",
                    autoClose: 5000
                });
                // Fetch updated messages after sending new message
                // axios.get('http://localhost:3000/aunalertsystem/messages', {
                //     headers: {
                //         Authorization: `Bearer ${localStorage.getItem('token')}`
                //     }
                // })
                axios.get('https://aun-alert-api.vercel.app/aunalertsystem/messages', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((res) => {
                    if (res.data.success){
                        setMessages(res.data.messages);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
                // Clear input after sending
                setNewMessage('');
            } else {
                toast.error("Failed to send message", {
                    position: "top-right",
                    autoClose: 5000
                });
            }
        })
        .catch((err) => {
            toast.error(`Failed to send message: ${err.response?.data?.error || err.message}`, {
                position: "top-right",
                autoClose: 5000
            });
        })
        .finally(() => {
            setSending(false); // Re-enable the send button after request completion
        });
    };

    return (
        <div className='chat-container'>
            <div className='message-box'>
            {messages.sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()).map((message, index) => (
    <div key={index} className='message'>
        <p>{message.message}</p>
        <span>{new Date(message.sentAt).toLocaleString()}</span>
    </div>
))}


            </div>
            <form className='message-form' onSubmit={handleMessageSend}>
                <input 
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={sending} // Disable input when sending
                />
                <button type="submit" disabled={sending}> {/* Disable button when sending */}
                    Send {sending ? <CircleLoader size={20} /> : <RiSendPlane2Fill/>}
                </button>
            </form>
        </div>
    );
};

export default SendMessage;
