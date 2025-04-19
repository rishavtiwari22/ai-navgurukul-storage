import React, { createContext, useContext, useState, useEffect } from 'react';
import { experiences as initialExperiences } from '../data/experienceData';
import { blogPosts as initialBlogPosts } from '../data/blogData';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  // Initialize state with data from localStorage or default data
  const [experiences, setExperiences] = useState(() => {
    const savedExperiences = localStorage.getItem('experiences');
    return savedExperiences ? JSON.parse(savedExperiences) : initialExperiences;
  });
  
  const [blogPosts, setBlogPosts] = useState(() => {
    const savedBlogPosts = localStorage.getItem('blogPosts');
    return savedBlogPosts ? JSON.parse(savedBlogPosts) : initialBlogPosts;
  });
  
  const [aboutContent, setAboutContent] = useState(() => {
    const savedAboutContent = localStorage.getItem('aboutContent');
    return savedAboutContent ? JSON.parse(savedAboutContent) : {
      headline: "Explore the Future of Technology",
      subtitle: "Welcome to Navgurukul Labs, where we explore the boundaries of technology and innovation. Dive into our projects and discover the future of tech with our cutting-edge research and development initiatives. Join us in shaping tomorrow's world.",
      mission: "At Navgurukul Labs, we're pushing the boundaries of what's possible. Our team of researchers and engineers work on cutting-edge projects that have the potential to transform the way we interact with technology.",
      story: "Founded in 2025, Navgurukul Labs emerged from a simple idea: what if we created a space where innovation could thrive without constraints? In future, we will be home to dozens of experimental projects that explore emerging technologies.",
      team: [
        { name: "Alex Johnson", role: "Research Director", photo: "" },
        { name: "Jamie Smith", role: "Lead Developer", photo: "" },
        { name: "Taylor Wong", role: "AI Specialist", photo: "" }
      ]
    };
  });
  
  const [contactInfo, setContactInfo] = useState(() => {
    const savedContactInfo = localStorage.getItem('contactInfo');
    return savedContactInfo ? JSON.parse(savedContactInfo) : {
      title: "Get in Touch With Us",
      subtitle: "Have questions about our projects or interested in collaboration? We'd love to hear from you. Fill out the form below and our team will get back to you as soon as possible.",
      address: "123 Innovation Avenue\nTech District, Delhi 110001",
      email: "contact@navgurukullabs.org\nsupport@navgurukullabs.org",
      phone: "+91 123 456 7890\nMon-Fri, 9:00 AM - 6:00 PM",
      location: { lat: 28.6139, lng: 77.2090 }
    };
  });
  
  // Add site settings
  const [siteSettings, setSiteSettings] = useState(() => {
    const savedSiteSettings = localStorage.getItem('siteSettings');
    return savedSiteSettings ? JSON.parse(savedSiteSettings) : {
      siteName: "Navgurukul Labs",
      siteTagline: "Explore the Future of Technology",
      logoUrl: "",
      faviconUrl: "",
      colors: {
        primaryColor: "#FF5E41",
        secondaryColor: "#4285F4",
        textColor: "#333333",
        backgroundColor: "#FFFFFF"
      },
      social: {
        twitterUrl: "",
        facebookUrl: "",
        linkedinUrl: "",
        instagramUrl: ""
      }
    };
  });
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('experiences', JSON.stringify(experiences));
  }, [experiences]);
  
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);
  
  useEffect(() => {
    localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
  }, [aboutContent]);
  
  useEffect(() => {
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
  }, [contactInfo]);
  
  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
  }, [siteSettings]);
  
  // CRUD Functions for Experiences
  const addExperience = (experience) => {
    setExperiences([...experiences, experience]);
  };
  
  const updateExperience = (id, updatedExperience) => {
    setExperiences(experiences.map((exp, index) => 
      index === id ? updatedExperience : exp
    ));
  };
  
  const deleteExperience = (id) => {
    setExperiences(experiences.filter((_, index) => index !== id));
  };
  
  // CRUD Functions for Blog Posts
  const addBlogPost = (post) => {
    const newId = blogPosts.length > 0 ? Math.max(...blogPosts.map(p => p.id)) + 1 : 1;
    setBlogPosts([...blogPosts, { ...post, id: newId }]);
  };
  
  const updateBlogPost = (id, updatedPost) => {
    setBlogPosts(blogPosts.map(post => 
      post.id === id ? { ...updatedPost, id } : post
    ));
  };
  
  const deleteBlogPost = (id) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };
  
  // Update About Content
  const updateAboutContent = (newContent) => {
    setAboutContent({ ...aboutContent, ...newContent });
  };
  
  // Update Team Member
  const updateTeamMember = (index, updatedMember) => {
    const updatedTeam = [...aboutContent.team];
    updatedTeam[index] = updatedMember;
    setAboutContent({ ...aboutContent, team: updatedTeam });
  };
  
  const addTeamMember = (member) => {
    setAboutContent({ 
      ...aboutContent, 
      team: [...aboutContent.team, member] 
    });
  };
  
  const deleteTeamMember = (index) => {
    setAboutContent({
      ...aboutContent,
      team: aboutContent.team.filter((_, i) => i !== index)
    });
  };
  
  // Update Contact Info
  const updateContactInfo = (newInfo) => {
    setContactInfo({ ...contactInfo, ...newInfo });
  };
  
  // Update Site Settings
  const updateSiteSettings = (newSettings) => {
    setSiteSettings({ ...siteSettings, ...newSettings });
  };
  
  // Reset to initial state (for development purposes)
  const resetToInitial = () => {
    setExperiences(initialExperiences);
    setBlogPosts(initialBlogPosts);
    setAboutContent({
      headline: "Explore the Future of Technology",
      subtitle: "Welcome to Navgurukul Labs, where we explore the boundaries of technology and innovation. Dive into our projects and discover the future of tech with our cutting-edge research and development initiatives. Join us in shaping tomorrow's world.",
      mission: "At Navgurukul Labs, we're pushing the boundaries of what's possible. Our team of researchers and engineers work on cutting-edge projects that have the potential to transform the way we interact with technology.",
      story: "Founded in 2025, Navgurukul Labs emerged from a simple idea: what if we created a space where innovation could thrive without constraints? In future, we will be home to dozens of experimental projects that explore emerging technologies.",
      team: [
        { name: "Alex Johnson", role: "Research Director", photo: "" },
        { name: "Jamie Smith", role: "Lead Developer", photo: "" },
        { name: "Taylor Wong", role: "AI Specialist", photo: "" }
      ]
    });
    setContactInfo({
      title: "Get in Touch With Us",
      subtitle: "Have questions about our projects or interested in collaboration? We'd love to hear from you. Fill out the form below and our team will get back to you as soon as possible.",
      address: "123 Innovation Avenue\nTech District, Delhi 110001",
      email: "contact@navgurukullabs.org\nsupport@navgurukullabs.org",
      phone: "+91 123 456 7890\nMon-Fri, 9:00 AM - 6:00 PM",
      location: { lat: 28.6139, lng: 77.2090 }
    });
    setSiteSettings({
      siteName: "Navgurukul Labs",
      siteTagline: "Explore the Future of Technology",
      logoUrl: "",
      faviconUrl: "",
      colors: {
        primaryColor: "#FF5E41",
        secondaryColor: "#4285F4",
        textColor: "#333333",
        backgroundColor: "#FFFFFF"
      },
      social: {
        twitterUrl: "",
        facebookUrl: "",
        linkedinUrl: "",
        instagramUrl: ""
      }
    });
  };
  
  const value = {
    experiences,
    blogPosts,
    aboutContent,
    contactInfo,
    siteSettings,
    addExperience,
    updateExperience,
    deleteExperience,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    updateAboutContent,
    updateTeamMember,
    addTeamMember,
    deleteTeamMember,
    updateContactInfo,
    updateSiteSettings,
    resetToInitial
  };
  
  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
