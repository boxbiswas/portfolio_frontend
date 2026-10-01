import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedia, uploadMedia, deleteMedia } from '../../redux/slices/mediaSlice';
import { Upload, Trash2, Copy, FileIcon, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * MediaManager Component
 * 
 * Provides an interface to upload and manage files/images in the backend.
 * Renders uploaded files in a responsive grid. Provides clipboard copying for quick use.
 */
export default function MediaManager() {
    const dispatch = useDispatch();
    
    // Extract media items and loading state from the Redux store
    const { items: mediaFiles, loading } = useSelector((state) => state.media);
    
    // Ref points to the hidden file input element so we can trigger it programmatically
    const fileInputRef = useRef(null);

    // Initial fetch of media files
    useEffect(() => {
        dispatch(fetchMedia());
    }, [dispatch]);

    /**
     * Handles the file upload process when the hidden input changes.
     */
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // The API requires multipart/form-data for file uploads
        const formData = new FormData();
        formData.append('file', file);

        try {
            await dispatch(uploadMedia(formData)).unwrap();
            toast.success('File uploaded successfully');
            
            // Reset the input so the exact same file can be uploaded again if necessary
            if (fileInputRef.current) fileInputRef.current.value = ''; 
        } catch (error) {
            toast.error(error || 'Upload failed');
        }
    };

    /**
     * Permanent deletion of a media file.
     */
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this file? This might break links if used elsewhere.')) {
            try {
                await dispatch(deleteMedia(id)).unwrap();
                toast.success('File deleted');
            } catch (error) {
                toast.error(error || 'Failed to delete file');
            }
        }
    };

    /**
     * Helper function to copy the exact URL of the media file to the user's clipboard.
     * Helpful for embedding these images in Markdown content (e.g. Blogs).
     */
    const copyToClipboard = (url) => {
        // Construct full URL if the backend returns a relative path
        const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success('URL copied to clipboard');
    };

    return (
        <div>
            {/* Upload Header & Hidden Input section */}
            <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Upload New File</h2>
                    <p className="text-sm text-slate-500">Images, PDFs, or other supported assets.</p>
                </div>
                <div>
                    {/* The actual file input is hidden; triggered by the styled button below */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        className="hidden" 
                        accept="image/*,.pdf,.doc,.docx"
                    />
                    <button 
                        onClick={() => fileInputRef.current?.click()} 
                        className="bg-indigo-600 text-white rounded-xl px-5 py-2.5 font-semibold hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-sm"
                    >
                        <Upload className="w-4 h-4" />
                        Choose File
                    </button>
                </div>
            </div>

            {/* Media Gallery Grid */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] p-6">
                {/* Condition 1: Initial Loading State */}
                {loading && mediaFiles.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">Loading media...</div>
                ) : mediaFiles.length === 0 ? (
                /* Condition 2: Empty State */
                    <div className="text-center py-12">
                        <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No media found</h3>
                        <p className="text-slate-500 text-sm mt-1">Upload your first image or document above.</p>
                    </div>
                ) : (
                /* Condition 3: Responsive Gallery Grid */
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {mediaFiles.map((file) => (
                            <div key={file.id} className="group border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-all flex flex-col bg-slate-50">
                                {/* Image / Icon Wrapper with hover overlay */}
                                <div className="aspect-square bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                    {/* Preview logic: check mimetype for images */}
                                    {file.mimetype?.startsWith('image/') ? (
                                        <img src={file.url} alt={file.filename} className="w-full h-full object-cover" loading="lazy" />
                                    ) : (
                                        <FileIcon className="w-12 h-12 text-slate-400" />
                                    )}
                                    {/* Overlay actions revealed on hover */}
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button onClick={() => copyToClipboard(file.url)} className="p-2 bg-white rounded-full text-slate-700 hover:text-indigo-600 hover:scale-110 transition-all" title="Copy URL">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(file.id)} className="p-2 bg-white rounded-full text-slate-700 hover:text-red-600 hover:scale-110 transition-all" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                {/* File details footer */}
                                <div className="p-3 bg-white border-t border-slate-200">
                                    <p className="text-xs font-medium text-slate-700 truncate" title={file.filename}>{file.filename}</p>
                                    <p className="text-[10px] text-slate-500 uppercase mt-0.5">{file.mimetype?.split('/')[1] || 'FILE'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
