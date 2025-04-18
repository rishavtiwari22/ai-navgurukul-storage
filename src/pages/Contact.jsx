import React, { useState, useEffect, useRef } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const mapRef = useRef(null);
  
  useEffect(() => {
    // Load Google Maps script if it's not already loaded
    if (!window.google) {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      googleMapScript.onload = initMap;
      document.body.appendChild(googleMapScript);
    } else {
      initMap();
    }

    return () => {
      // Clean up any event listeners or resources if needed
    };
  }, []);

  const initMap = () => {
    if (window.google && mapRef.current) {
      // Example coordinates - replace with your actual location
      const location = { lat: 28.6139, lng: 77.2090 }; // Delhi coordinates
      
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{ "weight": "2.00" }]
          },
          {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#9c9c9c" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{ "visibility": "on" }]
          },
          {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{ "visibility": "on" }]
          }
        ]
      });
      
      // Add a marker
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: 'Navgurukul Labs',
        animation: window.google.maps.Animation.DROP
      });
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get in <span className="highlight">Touch</span> With Us</h1>
        <p className="subtitle">
          Have questions about our projects or interested in collaboration? 
          We'd love to hear from you. Fill out the form below and our team will 
          get back to you as soon as possible.
        </p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <div className="icon">📍</div>
            <div className="details">
              <h3>Visit Us</h3>
              <p>123 Innovation Avenue<br />Tech District, Delhi 110001</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon">📧</div>
            <div className="details">
              <h3>Email Us</h3>
              <p>contact@navgurukullabs.org<br />support@navgurukullabs.org</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon">📞</div>
            <div className="details">
              <h3>Call Us</h3>
              <p>+91 123 456 7890<br />Mon-Fri, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          
          <div className="social-links">
            <h3>Connect with Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">𝕏</a>
              <a href="#" className="social-icon">ƒ</a>
              <a href="#" className="social-icon">Ⓛ</a>
              <a href="#" className="social-icon">Ⓘ</a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          {submitted ? (
            <div className="success-message">
              <h3>Thank you for contacting us!</h3>
              <p>We've received your message and will respond shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required 
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
      
      <div className="map-container">
        <h2>Find Us</h2>
        <div 
          ref={mapRef} 
          id="map" 
          className="google-map"
          aria-label="Our location on Google Maps">
        </div>
        <div className="map-instructions">
          <p>Visit our headquarters at the heart of Delhi's technology district.</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="directions-link">
            Get Directions →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;