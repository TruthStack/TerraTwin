"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
    role: "bot" | "user";
    content: string;
}

export default function DrGreenChat() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", content: "Hello! I'm Dr. Green. I've analyzed your crop scan. Do you have any specific questions about the treatment plan?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            const responses = [
                "Based on the soil moisture of 42.5%, I recommend reducing watering until the copper fungicide takes effect.",
                "Yes, Early Blight can spread rapidly in these conditions. Ensure you isolate the affected Sector Beta immediately.",
                "You can use neem oil as an organic alternative, though the results might be slower than the copper treatment."
            ];
            setMessages(prev => [...prev, {
                role: "bot",
                content: responses[Math.floor(Math.random() * responses.length)]
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[400px] glass-panel rounded-2xl border border-white/10 mt-6 overflow-hidden">
            <div className="bg-bio-green/10 p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bot size={18} className="text-bio-green" />
                    <span className="font-bold text-sm tracking-tight text-bio-green">DR. GREEN AGENT</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`
                max-w-[80%] p-3 rounded-2xl text-sm 
                ${msg.role === 'user'
                                    ? 'bg-bio-green text-black rounded-tr-none'
                                    : 'bg-white/5 border border-white/10 rounded-tl-none text-white/90'
                                }
              `}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isTyping && (
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Loader2 size={12} className="animate-spin" /> Dr. Green is thinking...
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask Dr. Green..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-bio-green/50 transition-colors"
                />
                <button
                    onClick={handleSend}
                    className="p-2 bg-bio-green text-black rounded-xl hover:bg-white transition-colors"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}
