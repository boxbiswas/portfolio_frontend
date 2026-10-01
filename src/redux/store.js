import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import aboutReducer from './slices/aboutSlice.js';
import skillsReducer from './slices/skillsSlice.js';
import projectsReducer from './slices/projectsSlice.js';
import experienceReducer from './slices/experienceSlice.js';
import servicesReducer from './slices/servicesSlice.js';
import blogReducer from './slices/blogSlice.js';
import testimonialReducer from './slices/testimonialSlice.js';
import socialReducer from './slices/socialSlice.js';
import settingsReducer from './slices/settingsSlice.js';
import mediaReducer from './slices/mediaSlice.js';
import messageReducer from './slices/messageSlice.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        about: aboutReducer,
        skills: skillsReducer,
        projects: projectsReducer,
        experience: experienceReducer,
        services: servicesReducer,
        blogs: blogReducer,
        testimonials: testimonialReducer,
        social: socialReducer,
        settings: settingsReducer,
        media: mediaReducer,
        messages: messageReducer,
    },
});

export default store;
