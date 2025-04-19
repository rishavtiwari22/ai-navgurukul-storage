import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import '../styles/Contact.css';

const Contact = () => {
  const { contactInfo } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Load Google Maps API dynamically
    const loadGoogleMapsAPI = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Define global callback for Google Maps
      window.initMap = () => {
        setMapLoaded(true);
      };
      
      document.head.appendChild(script);
    };
    
    loadGoogleMapsAPI();
    
    return () => {
      // Clean up global callback when component unmounts
      window.initMap = null;
    };
  }, []);
  
  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      // Initialize map when API is loaded
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: contactInfo.location.lat, lng: contactInfo.location.lng },
        zoom: 15,
        styles: window.document.documentElement.classList.contains('dark') ? 
          [{"elementType":"geometry","stylers":[{"color":"#242f3e"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#746855"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#242f3e"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#263c3f"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#6b9a76"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#38414e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#212a37"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#9ca5b3"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#746855"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1f2835"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#f3d19c"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2f3948"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#17263c"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#515c6d"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#17263c"}]}]
          : null
      });
      
      // Add marker
      new window.google.maps.Marker({
        position: { lat: contactInfo.location.lat, lng: contactInfo.location.lng },
        map: map,
        title: 'Our Location'
      });
    }
  }, [mapLoaded, contactInfo.location]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit the form data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  if (submitted) {
    return (
      <div className="contact-container">
        <div className="success-message">
          <h3>Thank You For Contacting Us!</h3>
          <p>We've received your message and will get back to you as soon as possible.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>
          <span className="highlight">{contactInfo.title}</span>
        </h1>
        <p className="subtitle">{contactInfo.subtitle}</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <div className="icon">📍</div>
            <div className="details">
              <h3>Find us</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{contactInfo.address}</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon">✉️</div>
            <div className="details">
              <h3>Email us</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{contactInfo.email}</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon">📞</div>
            <div className="details">
              <h3>Call us</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{contactInfo.phone}</p>
            </div>
          </div>
          
          <div className="social-links">
            <h3>Connect with us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">X</a>
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">in</a>
              <a href="#" className="social-icon">Ig</a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
      
      <div className="map-container">
        <h2>Find Us on the Map</h2>
        <div className="google-map-wrapper">
          <div className="google-map">
            <div className="map-error-container">
              <div className="map-error-icon">!</div>
              <h3 className="map-error-heading">Sorry! Something went wrong.</h3>
              <p className="map-error-message">This page didn't load Google Maps correctly. See the JavaScript console for technical details.</p>
            </div>
          </div>
          
          
        </div>
      </div>
      <div className="map-instructions">
            <div className="directions-container">
              <div className="directions-text">
                <p>Visit our headquarters at the heart of Delhi's technology district.</p>
              </div>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${contactInfo.location.lat},${contactInfo.location.lng}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="directions-link"
              >
                Get Directions ➡️
              </a>
            </div>
          </div>
    </div>
  );
};

export default Contact;