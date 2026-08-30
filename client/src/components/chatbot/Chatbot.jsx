import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Chatbot = ({ isOpen, onClose }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const messagesEndRef = useRef(null);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: `Hi ${user?.name || "there"}! 👋 I'm your FarmHive Assistant. How can I help you today?`,
            sender: "bot",
        },
    ]);

    const isDark = theme === "dark";

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Initial greeting update if user logs in while chat is open
    useEffect(() => {
        if (messages.length === 1 && user?.name) {
            setMessages([
                {
                    id: 1,
                    text: `Hi ${user.name}! 👋 I'm your FarmHive Assistant. How can I help you today?`,
                    sender: "bot",
                },
            ]);
        }
    }, [user]);

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), text: text, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const botResponse = generateResponse(text);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, text: botResponse, sender: "bot" },
            ]);
            setIsTyping(false);
        }, 1000);
    };

    const generateResponse = (query) => {
        const q = query.toLowerCase();

        if (q.includes("sell") || q.includes("product") || q.includes("upload")) {
            return "To sell on FarmHive: \n1. Go to your Profile > Seller Panel.\n2. Click 'Add New Product'.\n3. Fill in details & upload an image. \nIt's that easy!";
        }
        if (q.includes("buy") || q.includes("purchase") || q.includes("order")) {
            return "To buy products:\n1. Browse the 'Products' page.\n2. Click 'Add to Cart' on items you like.\n3. Go to 'Cart' and proceed to checkout.";
        }
        if (q.includes("account") || q.includes("register") || q.includes("login")) {
            return "You can create an account by clicking the 'Login' button in the navbar and determining 'Register'. If you're already registered, just log in to access all features!";
        }
        if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
            return "Hello! 😊 Ready to explore fresh farm produce?";
        }
        if (q.includes("thank")) {
            return "You're welcome! Happy to help. 🚜";
        }

        return "I'm not sure about that completely. Try asking about 'selling', 'buying', or 'account' help!";
    };

    if (!isOpen) return null;

    const bgColor = isDark ? "#212529" : "#ffffff";
    const textColor = isDark ? "#f8f9fa" : "#212529";
    const borderColor = isDark ? "#495057" : "#dee2e6";
    const headerFormat = isDark ? "bg-warning text-dark" : "bg-warning text-dark";

    return (
        <div
            className="position-fixed shadow-lg rounded-4 overflow-hidden d-flex flex-column"
            style={{
                bottom: "80px",
                right: "20px",
                width: "350px",
                height: "500px",
                zIndex: 9999,
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
                fontFamily: "'Inter', sans-serif"
            }}
        >
            {/* Header */}
            <div className={`p-3 d-flex justify-content-between align-items-center ${headerFormat}`}>
                <div className="d-flex align-items-center gap-2">
                    <span className="fs-5">🤖</span>
                    <h6 className="m-0 fw-bold">FarmHive Assistant</h6>
                </div>
                <button onClick={onClose} className="btn btn-sm btn-dark rounded-circle" style={{ width: "30px", height: "30px", padding: 0 }}>&times;</button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow-1 p-3 overflow-auto" style={{ backgroundColor: isDark ? "#000" : "#f8f9fa" }}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`d-flex mb-3 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
                    >
                        <div
                            className={`p-2 px-3 rounded-4 shadow-sm`}
                            style={{
                                maxWidth: "80%",
                                backgroundColor: msg.sender === "user" ? "#ffc107" : (isDark ? "#343a40" : "#fff"),
                                color: msg.sender === "user" ? "#000" : (isDark ? "#fff" : "#000"),
                                borderBottomRightRadius: msg.sender === "user" ? "4px" : "1rem",
                                borderBottomLeftRadius: msg.sender === "bot" ? "4px" : "1rem",
                                whiteSpace: "pre-line"
                            }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="d-flex justify-content-start mb-3">
                        <div className="p-2 px-3 rounded-4 bg-secondary text-white small opacity-75">
                            Typing...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips */}
            <div className="px-3 py-2 d-flex gap-2 overflow-auto" style={{ borderTop: `1px solid ${borderColor}` }}>
                {["How to Sell?", "How to Buy?", "Create Account"].map((chip) => (
                    <button
                        key={chip}
                        onClick={() => handleSend(chip)}
                        className="btn btn-outline-warning btn-sm rounded-pill text-nowrap"
                    >
                        {chip}
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-transparent" style={{ borderTop: `1px solid ${borderColor}` }}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="d-flex gap-2"
                >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{
                            backgroundColor: isDark ? "#343a40" : "#fff",
                            color: textColor,
                            borderColor: borderColor,
                            borderRadius: "20px"
                        }}
                    />
                    <button type="submit" className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                        <i className="bi bi-send-fill"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
