import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import Markdown from 'react-markdown';

// Initialize Gemini API safely
let ai: GoogleGenAI | null = null;

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'model', 
      text: 'Hi! I am Mr. Frank, the Integrity Closings CLT assistant. How can I help you with your notary needs today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Keep track of the chat instance
  const chatRef = useRef<any>(null);

  // Use the new headshot URL.
  const headshotUrl = "/new%20pic%20of%20me%20smaller.jpg";

  useEffect(() => {
    async function initChat() {
      try {
        // Fetch API key from server
        const configRes = await fetch('/api/config');
        const config = await configRes.json();
        
        if (config.geminiKey) {
          ai = new GoogleGenAI({ apiKey: config.geminiKey });
          
          chatRef.current = ai.chats.create({
            model: "gemini-3-flash-preview",
            config: {
              systemInstruction: `Your job is to help website visitors quickly schedule a mobile notary appointment for Integrity Closings CLT.

IMPORTANT RESPONSE RULES:
• Keep responses short and easy to read
• Never write long paragraphs
• Use short sentences and bullet points
• Maximum 4-6 lines per response
• Maximum 10 words per line
• Always be friendly and professional
• Always guide the user toward scheduling an appointment

SERVICES OFFERED:
• Mobile Notary Services
• Loan Signing Agent Services
• Power of Attorney Notarization
• Estate Planning Documents
• Hospital & Nursing Home Notary
• Same-Day Notary Appointments
• General Notary Work

SERVICE AREA:
Charlotte NC and surrounding areas including: Matthews, Mint Hill, Pineville, Concord, Huntersville, Indian Trail, Monroe.

TRAVEL LOCATIONS:
We travel to: Homes, Hospitals, Nursing homes, Offices, Assisted living facilities.

BOOKING PROCESS:
When someone asks about notarization, guide them through these questions one at a time:
1. What document needs notarization?
2. How many signers are there?
3. Where will the notarization take place?
4. When do you need the appointment?
After collecting this information, suggest booking an appointment.

When encouraging users to book an appointment, ALWAYS use this exact markdown link format: [Book Online](/booking)
You can also provide the phone number: (980) 372-4103.

Example response style:
Hi! 👋 I can help with that.
We notarize:
• Power of Attorney
• Trust & Estate Documents
• Loan Signings
• General Notary Documents
We travel to homes, hospitals, and offices.
What document needs notarization today?

PRICING RULE:
Do not give exact pricing unless specifically asked.
If asked about price, say:
"Our fees depend on travel, the IRS mileage is currently $0.725 per mile and number of signatures which is $10 per notarized signture. We can provide a quote once we know the document type and location."

EMERGENCY / URGENT REQUESTS:
If someone needs a notary urgently, respond:
"We offer same-day and urgent mobile notarizations when available."
Then ask for location and time.

MOST IMPORTANT RULE:
Never generate large blocks of text. Responses must be short, easy to scan, and conversational.`,
            }
          });
          setIsConfigured(true);
        }
      } catch (error) {
        console.error("Failed to initialize chatbot:", error);
      }
    }
    
    initChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMsg }]);
    setIsLoading(true);

    if (!isConfigured || !chatRef.current) {
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        text: 'Sorry, the chatbot is currently offline. Please call us at (980) 372-4103.' 
      }]);
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending message to Gemini...');
      const responseStream = await chatRef.current.sendMessageStream({ message: userMsg });
      const messageId = Date.now().toString();
      
      // Add an empty message first to hold the streaming text
      setMessages(prev => [...prev, { id: messageId, role: 'model', text: '' }]);
      
      // Turn off the loading spinner as soon as the stream connects
      setIsLoading(false);

      let fullText = '';
      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, text: fullText } : msg
          ));
        }
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        text: `Sorry, I encountered an error: ${error.message || 'Unknown error'}. Please try again later or call us.` 
      }]);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl transition-transform transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Chat"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-200 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-blue-950 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={headshotUrl} alt="Mr. Frank" className="w-10 h-10 rounded-full object-cover border-2 border-blue-600" referrerPolicy="no-referrer" />
            <h3 className="font-bold text-lg">Mr. Frank</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${msg.role === 'user' ? 'bg-slate-800' : 'bg-blue-600'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <img src={headshotUrl} alt="Mr. Frank" className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
              </div>
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-white rounded-tr-sm' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.role === 'user' ? (
                  msg.text
                ) : (
                  <div className="prose prose-sm prose-slate max-w-none">
                    <Markdown
                      components={{
                        a: ({ node, ...props }) => {
                          if (props.href === '/booking') {
                            return (
                              <a 
                                {...props} 
                                className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg no-underline transition-colors"
                              >
                                {props.children}
                              </a>
                            );
                          }
                          return <a {...props} className="text-blue-600 hover:underline" />;
                        }
                      }}
                    >
                      {msg.text}
                    </Markdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
                <img src={headshotUrl} alt="Mr. Frank" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                <span className="text-sm text-slate-500">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form 
          onSubmit={handleSend}
          className="p-4 bg-white border-t border-slate-200 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full px-4 py-2 text-sm outline-none transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </>
  );
}