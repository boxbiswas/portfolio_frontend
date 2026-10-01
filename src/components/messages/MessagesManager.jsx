import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, updateMessage, deleteMessage } from '../../redux/slices/messageSlice';
import { Trash2, Mail, MailOpen, CornerUpLeft, Archive, AlertOctagon, X } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * MessagesManager Component
 * 
 * Provides an email-client style interface (split list/detail view) to manage incoming 
 * contact form submissions. Integrated with Redux and react-hot-toast.
 */
export default function MessagesManager() {
    const dispatch = useDispatch();
    
    // Redux mapping
    const { items: messages, loading } = useSelector((state) => state.messages);
    
    // Tracks which message object is currently being viewed in the detail pane
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Initial load
    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    /**
     * Changes the status of a message (e.g., READ, REPLIED, SPAM).
     */
    const handleStatusChange = async (id, newStatus) => {
        try {
            await dispatch(updateMessage({ id, data: { status: newStatus } })).unwrap();
            toast.success(`Marked as ${newStatus}`);
            
            // If the user has this message open in the detail view, update that local instance too
            if (selectedMessage && selectedMessage.id === id) {
                setSelectedMessage({ ...selectedMessage, status: newStatus });
            }
        } catch (error) {
            toast.error(error || 'Failed to update status');
        }
    };

    /**
     * Permanently deletes a message.
     */
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message permanently?')) {
            try {
                await dispatch(deleteMessage(id)).unwrap();
                toast.success('Message deleted');
                
                // Clear the detail pane if the deleted message was open
                if (selectedMessage?.id === id) setSelectedMessage(null);
            } catch (error) {
                toast.error(error || 'Failed to delete message');
            }
        }
    };

    /**
     * Opens a message in the right-hand detail pane.
     * Automatically marks NEW/UNREAD messages as READ.
     */
    const openMessage = (msg) => {
        setSelectedMessage(msg);
        
        // Auto-read logic
        if (msg.status === 'NEW' || msg.status === 'UNREAD') {
            handleStatusChange(msg.id, 'READ');
        }
    };

    /**
     * Helper to return the correct Lucide icon based on string status.
     */
    const getStatusIcon = (status) => {
        const s = status?.toUpperCase() || 'NEW';
        switch (s) {
            case 'NEW': return <Mail className="w-4 h-4 text-indigo-500" />;
            case 'UNREAD': return <Mail className="w-4 h-4 text-indigo-500" />;
            case 'READ': return <MailOpen className="w-4 h-4 text-slate-400" />;
            case 'REPLIED': return <CornerUpLeft className="w-4 h-4 text-green-500" />;
            case 'ARCHIVED': return <Archive className="w-4 h-4 text-slate-400" />;
            case 'SPAM': return <AlertOctagon className="w-4 h-4 text-red-500" />;
            default: return <Mail className="w-4 h-4 text-slate-400" />;
        }
    };

    /**
     * Helper to return a stylized pill/badge element based on message status.
     */
    const getStatusBadge = (status) => {
        const s = status?.toUpperCase() || 'NEW';
        let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
        
        if (['NEW', 'UNREAD'].includes(s)) colorClass = 'bg-indigo-50 text-indigo-700 border-indigo-200';
        else if (s === 'REPLIED') colorClass = 'bg-green-50 text-green-700 border-green-200';
        else if (s === 'SPAM') colorClass = 'bg-red-50 text-red-700 border-red-200';
        else if (s === 'ARCHIVED') colorClass = 'bg-slate-50 text-slate-500 border-slate-200';

        return <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${colorClass}`}>{s}</span>;
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
            
            {/* Left Column: List View */}
            <div className={`bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] overflow-hidden flex flex-col ${selectedMessage ? 'hidden lg:flex lg:w-1/3' : 'w-full'}`}>
                {/* List Header */}
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                    <h3 className="font-semibold text-slate-800">Inbox</h3>
                    <span className="text-xs font-medium bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{messages.length}</span>
                </div>
                
                {/* Scrollable list of messages */}
                <div className="overflow-y-auto flex-1">
                    {loading && messages.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm">No messages found.</div>
                    ) : (
                        <ul className="divide-y divide-slate-100">
                            {messages.map((msg) => (
                                <li 
                                    key={msg.id} 
                                    onClick={() => openMessage(msg)}
                                    // Complex dynamic classes to highlight unread vs read vs currently selected
                                    className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors border-l-2 ${selectedMessage?.id === msg.id ? 'bg-indigo-50/50 border-indigo-500' : (['NEW', 'UNREAD'].includes(msg.status?.toUpperCase()) ? 'border-indigo-400 bg-white' : 'border-transparent bg-white')}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2 truncate">
                                            {getStatusIcon(msg.status)}
                                            {/* Bold font for unread messages */}
                                            <span className={`text-sm truncate ${['NEW', 'UNREAD'].includes(msg.status?.toUpperCase()) ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{msg.name}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                                            {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate mb-2">{msg.subject || 'No Subject'}</p>
                                    <div className="flex justify-between items-center">
                                        {getStatusBadge(msg.status)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Right Column: Detail View */}
            <div className={`bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] flex-col flex-1 overflow-hidden ${selectedMessage ? 'flex' : 'hidden lg:flex'}`}>
                {selectedMessage ? (
                    <>
                        {/* Detail Header (Subject + Actions) */}
                        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                {/* Mobile back button */}
                                <button className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-slate-800" onClick={() => setSelectedMessage(null)}>
                                    <X className="w-5 h-5" />
                                </button>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 break-words">{selectedMessage.subject || 'No Subject'}</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        {getStatusBadge(selectedMessage.status)}
                                        <span className="text-sm text-slate-500">{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Top right actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                {/* Status change dropdown */}
                                <select 
                                    className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
                                    value={selectedMessage.status?.toUpperCase() || 'READ'}
                                    onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value)}
                                >
                                    <option value="READ">Mark as Read</option>
                                    <option value="REPLIED">Mark as Replied</option>
                                    <option value="ARCHIVED">Archive</option>
                                    <option value="SPAM">Report Spam</option>
                                </select>
                                <button onClick={() => handleDelete(selectedMessage.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Delete Forever">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Message Content Body */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {/* Sender Info Card */}
                            <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">{selectedMessage.name}</p>
                                    <p className="text-sm text-slate-500">
                                        <a href={`mailto:${selectedMessage.email}`} className="hover:text-indigo-600 hover:underline">{selectedMessage.email}</a>
                                    </p>
                                </div>
                                {/* Native mailto Reply button. Also marks as replied locally on click. */}
                                <a 
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your Message'}`} 
                                    className="px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2"
                                    onClick={() => handleStatusChange(selectedMessage.id, 'REPLIED')}
                                >
                                    <CornerUpLeft className="w-4 h-4" /> Reply
                                </a>
                            </div>

                            {/* The core message string */}
                            <div className="prose prose-slate prose-sm max-w-none">
                                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                                    {selectedMessage.message}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Blank state when no message is selected */
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                        <Mail className="w-16 h-16 text-slate-200 mb-4" />
                        <h3 className="text-lg font-medium text-slate-600">No message selected</h3>
                        <p className="text-sm mt-1 text-center">Select a message from the list to read its contents.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
